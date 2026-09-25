/* =========================================================
   MediSlot — app.js
   Site-wide behavior (mobile menu, toasts) + homepage logic
   (specialty grid render, hero search, example chips).
   Depends on data.js loading first (window.MediSlotData).
   ========================================================= */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    initToastContainer();
    renderSpecialtyGrid();
    initHeroSearch();
    initExampleChips();
  });

  /* ================= Mobile menu ================= */
  function initMobileMenu() {
    const toggle = document.getElementById("menuToggle");
    const menu = document.getElementById("primaryMenu");
    if (!toggle || !menu) return;

    function closeMenu() {
      menu.classList.remove("is-open");
      toggle.classList.remove("is-active");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }

    function openMenu() {
      menu.classList.add("is-open");
      toggle.classList.add("is-active");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
    }

    toggle.addEventListener("click", function () {
      const isOpen = menu.classList.contains("is-open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close the menu when a nav link is tapped
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    // Close if window is resized back to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  /* ================= Toast notifications =================
     Reusable across every page. Call window.showToast(message, type)
     where type is "success" | "error" | "info" (default "info"). */
  function initToastContainer() {
    if (document.getElementById("toastContainer")) return;
    const container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    container.setAttribute("aria-live", "polite");
    container.setAttribute("aria-atomic", "true");
    document.body.appendChild(container);
  }

  window.showToast = function (message, type) {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast toast-" + (type || "info");
    toast.textContent = message;
    container.appendChild(toast);

    // trigger enter animation on next frame
    requestAnimationFrame(function () {
      toast.classList.add("toast-visible");
    });

    setTimeout(function () {
      toast.classList.remove("toast-visible");
      setTimeout(function () {
        toast.remove();
      }, 250);
    }, 3200);
  };

  /* ================= Specialty grid (homepage) ================= */
  function renderSpecialtyGrid() {
    const grid = document.getElementById("specialtyGrid");
    if (!grid || !window.MediSlotData) return;

    const specialties = window.MediSlotData.SPECIALTIES;
    grid.innerHTML = specialties.map(function (s) {
      const params = new URLSearchParams({ specialty: s.name });
      return (
        '<a href="search.html?' + params.toString() + '" class="specialty-card">' +
          '<span class="specialty-icon" aria-hidden="true">' + s.icon + '</span>' +
          '<span class="specialty-name">' + s.name + '</span>' +
        '</a>'
      );
    }).join("");
  }

  /* ================= Hero search ================= */
  function initHeroSearch() {
    const form = document.getElementById("heroSearchForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const city = document.getElementById("heroCity").value.trim();
      const query = document.getElementById("heroQuery").value.trim();

      if (!city && !query) {
        if (window.showToast) {
          window.showToast("Enter a city or what you're looking for.", "error");
        }
        return;
      }

      const params = new URLSearchParams();
      if (city) params.set("city", city);
      if (query) params.set("query", query);

      window.location.href = "search.html?" + params.toString();
    });
  }

  /* ================= Example chips ================= */
  function initExampleChips() {
    const chips = document.querySelectorAll(".chip[data-example]");
    const queryInput = document.getElementById("heroQuery");
    if (!chips.length || !queryInput) return;

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        queryInput.value = chip.getAttribute("data-example");
        queryInput.focus();
      });
    });
  }
})();