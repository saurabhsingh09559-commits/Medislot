/* =========================================================
   MediSlot — search.js
   Search results page logic: filter, sort, render doctor cards.
   Depends on data.js (window.MediSlotData) and the DOM in
   search.html.
   ========================================================= */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    if (!window.MediSlotData) return;

    const state = {
      city: "",
      query: "",
      specialties: [],
      maxFee: 1500,
      consultationTypes: [],
      availableToday: false,
      verifiedOnly: false,
      sort: "relevance"
    };

    const els = {
      resultsTitle: document.getElementById("resultsTitle"),
      resultsSubtitle: document.getElementById("resultsSubtitle"),
      doctorList: document.getElementById("doctorList"),
      loadingState: document.getElementById("loadingState"),
      emptyState: document.getElementById("emptyState"),
      emptyStateReset: document.getElementById("emptyStateReset"),
      filtersForm: document.getElementById("filtersForm"),
      filterCity: document.getElementById("filterCity"),
      specialtyChecklist: document.getElementById("specialtyChecklist"),
      filterFee: document.getElementById("filterFee"),
      feeValue: document.getElementById("feeValue"),
      filterAvailableToday: document.getElementById("filterAvailableToday"),
      filterVerifiedOnly: document.getElementById("filterVerifiedOnly"),
      filtersReset: document.getElementById("filtersReset"),
      sortSelect: document.getElementById("sortSelect"),
      filtersSidebar: document.getElementById("filtersSidebar"),
      filtersOverlay: document.getElementById("filtersOverlay"),
      mobileFilterBtn: document.getElementById("mobileFilterBtn"),
      filtersClose: document.getElementById("filtersClose")
    };

    initFromURL();
    populateSpecialtyChecklist();
    bindFilterEvents();
    bindMobileFilterPanel();
    runSearch();

    /* ---------- Read initial state from URL ---------- */
    function initFromURL() {
      const params = new URLSearchParams(window.location.search);
      state.city = params.get("city") || "";
      state.query = params.get("query") || "";
      const specialtyParam = params.get("specialty");
      if (specialtyParam) state.specialties = [specialtyParam];

      if (els.filterCity && state.city) {
        // Only set the dropdown if it's one of the known cities
        const match = Array.from(els.filterCity.options).find(function (o) {
          return o.value.toLowerCase() === state.city.toLowerCase();
        });
        if (match) els.filterCity.value = match.value;
      }
    }

    /* ---------- Build the specialty checklist from data.js ---------- */
    function populateSpecialtyChecklist() {
      if (!els.specialtyChecklist) return;
      const specialties = window.MediSlotData.SPECIALTIES;

      els.specialtyChecklist.innerHTML = specialties.map(function (s) {
        const checked = state.specialties.indexOf(s.name) !== -1 ? "checked" : "";
        return (
          '<label class="checkbox-row">' +
            '<input type="checkbox" name="specialty" value="' + s.name + '" ' + checked + '> ' + s.name +
          '</label>'
        );
      }).join("");
    }

    /* ---------- Wire up filter/sort inputs ---------- */
    function bindFilterEvents() {
      if (els.filtersForm) {
        els.filtersForm.addEventListener("change", function () {
          readFiltersFromForm();
          runSearch();
        });

        els.filterFee.addEventListener("input", function () {
          els.feeValue.textContent = "₹" + els.filterFee.value;
        });
      }

      if (els.sortSelect) {
        els.sortSelect.addEventListener("change", function () {
          state.sort = els.sortSelect.value;
          runSearch();
        });
      }

      if (els.filtersReset) {
        els.filtersReset.addEventListener("click", resetFilters);
      }
      if (els.emptyStateReset) {
        els.emptyStateReset.addEventListener("click", resetFilters);
      }
    }

    function readFiltersFromForm() {
      state.city = els.filterCity.value;
      state.specialties = Array.from(
        els.filtersForm.querySelectorAll('input[name="specialty"]:checked')
      ).map(function (el) { return el.value; });
      state.maxFee = Number(els.filterFee.value);
      state.consultationTypes = Array.from(
        els.filtersForm.querySelectorAll('input[name="consultationType"]:checked')
      ).map(function (el) { return el.value; });
      state.availableToday = els.filterAvailableToday.checked;
      state.verifiedOnly = els.filterVerifiedOnly.checked;
    }

    function resetFilters() {
      state.city = "";
      state.specialties = [];
      state.maxFee = 1500;
      state.consultationTypes = [];
      state.availableToday = false;
      state.verifiedOnly = false;
      state.query = "";

      els.filtersForm.reset();
      els.filterFee.value = 1500;
      els.feeValue.textContent = "₹1500";
      populateSpecialtyChecklist();
      runSearch();
    }

    /* ---------- Mobile filter off-canvas panel ---------- */
    function bindMobileFilterPanel() {
      if (!els.mobileFilterBtn || !els.filtersSidebar) return;

      function open() {
        els.filtersSidebar.classList.add("is-open");
        els.filtersOverlay.classList.add("is-open");
        els.mobileFilterBtn.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
      }
      function close() {
        els.filtersSidebar.classList.remove("is-open");
        els.filtersOverlay.classList.remove("is-open");
        els.mobileFilterBtn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }

      els.mobileFilterBtn.addEventListener("click", open);
      if (els.filtersClose) els.filtersClose.addEventListener("click", close);
      if (els.filtersOverlay) els.filtersOverlay.addEventListener("click", close);
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") close();
      });
    }

    /* ---------- Filtering + sorting + rendering ---------- */
    function runSearch() {
      showLoading();

      // Simulate a brief network delay so the loading state is visible —
      // this is a prototype touch, not a real API call.
      setTimeout(function () {
        const results = filterDoctors();
        const sorted = sortDoctors(results);
        renderResults(sorted);
        updateHeading(sorted.length);
      }, 350);
    }

    function filterDoctors() {
      const data = window.MediSlotData;
      const queryLower = state.query.trim().toLowerCase();
      const concernSpecialty = data.CONCERN_TO_SPECIALTY[queryLower];

      return data.DOCTORS.filter(function (doc) {
        if (state.city && doc.city.toLowerCase() !== state.city.toLowerCase()) return false;

        if (queryLower) {
          const matchesText =
            doc.name.toLowerCase().indexOf(queryLower) !== -1 ||
            doc.specialty.toLowerCase().indexOf(queryLower) !== -1 ||
            doc.qualification.toLowerCase().indexOf(queryLower) !== -1;
          const matchesConcern = concernSpecialty && doc.specialty === concernSpecialty;
          if (!matchesText && !matchesConcern) return false;
        }

        if (state.specialties.length && state.specialties.indexOf(doc.specialty) === -1) return false;

        if (doc.consultationFee > state.maxFee) return false;

        if (state.consultationTypes.length) {
          const hasType = doc.consultationType.some(function (t) {
            return state.consultationTypes.indexOf(t) !== -1;
          });
          if (!hasType) return false;
        }

        if (state.availableToday && (!doc.slots.today || doc.slots.today.length === 0)) return false;

        if (state.verifiedOnly && !doc.verified) return false;

        return true;
      });
    }

    function sortDoctors(list) {
      const sorted = list.slice();
      switch (state.sort) {
        case "fee-low":
          sorted.sort(function (a, b) { return a.consultationFee - b.consultationFee; });
          break;
        case "fee-high":
          sorted.sort(function (a, b) { return b.consultationFee - a.consultationFee; });
          break;
        case "experience":
          sorted.sort(function (a, b) { return b.experience - a.experience; });
          break;
        case "rating":
          sorted.sort(function (a, b) { return b.rating - a.rating; });
          break;
        default:
          // relevance — keep natural order
          break;
      }
      return sorted;
    }

    function nextAvailableSlot(doc) {
      if (doc.slots.today && doc.slots.today.length) {
        return "Today, " + doc.slots.today[0];
      }
      if (doc.slots.tomorrow && doc.slots.tomorrow.length) {
        return "Tomorrow, " + doc.slots.tomorrow[0];
      }
      return null;
    }

    function initials(name) {
      return name.replace("Dr. ", "").split(" ").map(function (p) { return p[0]; }).join("").slice(0, 2);
    }

    function renderResults(list) {
      hideLoading();

      if (!list.length) {
        els.doctorList.hidden = true;
        els.emptyState.hidden = false;
        return;
      }

      els.emptyState.hidden = true;
      els.doctorList.hidden = false;

      els.doctorList.innerHTML = list.map(function (doc) {
        const slot = nextAvailableSlot(doc);
        const verifiedBadge = doc.verified
          ? '<span class="badge-verified">✓ Verified</span>'
          : '<span class="badge-unverified">Verification pending</span>';

        return (
          '<article class="doctor-card">' +
            '<div class="doctor-card-main">' +
              '<span class="doctor-avatar">' + initials(doc.name) + '</span>' +
              '<div class="doctor-info">' +
                '<div class="doctor-info-top">' +
                  '<h3 class="doctor-name">' + doc.name + '</h3>' +
                  verifiedBadge +
                '</div>' +
                '<p class="doctor-specialty">' + doc.specialty + ' · ' + doc.qualification + '</p>' +
                '<p class="doctor-meta">' + doc.experience + ' yrs experience · ⭐ ' + doc.rating + ' (' + doc.reviewCount + ' reviews)</p>' +
                '<p class="doctor-clinic">' + doc.clinicName + ', ' + doc.area + ', ' + doc.city + '</p>' +
              '</div>' +
            '</div>' +
            '<div class="doctor-card-side">' +
              '<p class="doctor-fee">₹' + doc.consultationFee + ' <span>consultation fee</span></p>' +
              '<p class="doctor-slot' + (slot ? '' : ' doctor-slot-none') + '">' + (slot || 'No slots available') + '</p>' +
              '<div class="doctor-card-actions">' +
                '<a href="doctor.html?id=' + doc.id + '" class="btn btn-ghost">View Profile</a>' +
                '<a href="booking.html?id=' + doc.id + '" class="btn btn-primary' + (slot ? '' : ' btn-disabled') + '"' + (slot ? '' : ' aria-disabled="true"') + '>Book Appointment</a>' +
              '</div>' +
            '</div>' +
          '</article>'
        );
      }).join("");
    }

    function updateHeading(count) {
      if (!els.resultsTitle) return;
      if (state.city) {
        els.resultsTitle.textContent = "Doctors in " + state.city;
      } else if (state.specialties.length === 1) {
        els.resultsTitle.textContent = state.specialties[0] + " Doctors";
      } else {
        els.resultsTitle.textContent = "Doctors";
      }
      els.resultsSubtitle.textContent = count + (count === 1 ? " doctor found" : " doctors found");
    }

    function showLoading() {
      els.loadingState.hidden = false;
      els.doctorList.hidden = true;
      els.emptyState.hidden = true;
    }
    function hideLoading() {
      els.loadingState.hidden = true;
    }
  });
})();