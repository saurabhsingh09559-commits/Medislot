/* =========================================================
   MediSlot — data.js
   Demo data only. All doctors, clinics, fees, ratings and
   availability below are FAKE PROTOTYPE DATA for demonstration —
   not real medical providers. Exposed on window.MediSlotData so
   every other script (no modules/bundler in this prototype) can
   read it without a build step.
   ========================================================= */

(function () {
  "use strict";

  /* ---------- Specialties ---------- */
  const SPECIALTIES = [
    { id: "dermatology", name: "Dermatology", icon: "🩺", description: "Skin, hair and nail concerns" },
    { id: "dentistry", name: "Dentistry", icon: "🦷", description: "Teeth, gums and oral health" },
    { id: "cardiology", name: "Cardiology", icon: "❤️", description: "Heart and blood vessels" },
    { id: "orthopedics", name: "Orthopedics", icon: "🦴", description: "Bones, joints and muscles" },
    { id: "pediatrics", name: "Pediatrics", icon: "🧸", description: "Child health" },
    { id: "gynecology", name: "Gynecology", icon: "🌸", description: "Women's reproductive health" },
    { id: "general-physician", name: "General Physician", icon: "⚕️", description: "General health concerns" },
    { id: "ent", name: "ENT", icon: "👂", description: "Ear, nose and throat" },
    { id: "neurology", name: "Neurology", icon: "🧠", description: "Brain and nervous system" },
    { id: "psychiatry", name: "Psychiatry", icon: "🧘", description: "Mental health and wellbeing" }
  ];

  /* ---------- Health concern → specialty guide ----------
     IMPORTANT: this only guides the patient toward a relevant
     specialty. It never diagnoses. Keep this in mind if this
     map is extended later. */
  const CONCERN_TO_SPECIALTY = {
    "skin problem": "Dermatology",
    "acne": "Dermatology",
    "rash": "Dermatology",
    "hair fall": "Dermatology",
    "tooth pain": "Dentistry",
    "toothache": "Dentistry",
    "gum problem": "Dentistry",
    "chest pain": "Cardiology",
    "heart palpitations": "Cardiology",
    "high blood pressure": "Cardiology",
    "joint pain": "Orthopedics",
    "back pain": "Orthopedics",
    "knee pain": "Orthopedics",
    "fracture": "Orthopedics",
    "child fever": "Pediatrics",
    "baby not eating": "Pediatrics",
    "period problem": "Gynecology",
    "pregnancy": "Gynecology",
    "irregular periods": "Gynecology",
    "fever": "General Physician",
    "cold": "General Physician",
    "cough": "General Physician",
    "body ache": "General Physician",
    "ear pain": "ENT",
    "hearing problem": "ENT",
    "sore throat": "ENT",
    "headache": "Neurology",
    "migraine": "Neurology",
    "dizziness": "Neurology",
    "stress": "Psychiatry",
    "anxiety": "Psychiatry",
    "sleep problem": "Psychiatry"
  };

  /* ---------- Doctors (demo data) ---------- */
  const DOCTORS = [
    {
      id: 1,
      name: "Dr. Ananya Sharma",
      specialty: "Dermatology",
      qualification: "MBBS, MD (Dermatology)",
      experience: 9,
      city: "Noida",
      area: "Sector 18",
      clinicName: "Skinlight Clinic",
      address: "Shop 12, Sector 18 Market, Noida",
      consultationFee: 700,
      consultationType: ["In-clinic", "Online"],
      verified: true,
      rating: 4.6,
      reviewCount: 128,
      about: "Focuses on acne, pigmentation and hair-fall management with a conservative, evidence-based approach.",
      workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      workingHours: "10:00 AM – 6:00 PM",
      slots: {
        "today": ["4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM"],
        "tomorrow": ["10:30 AM", "11:00 AM", "3:00 PM", "3:30 PM"]
      }
    },
    {
      id: 2,
      name: "Dr. Rohit Malhotra",
      specialty: "Dentistry",
      qualification: "BDS, MDS (Orthodontics)",
      experience: 12,
      city: "Noida",
      area: "Sector 62",
      clinicName: "Smile Studio Dental Care",
      address: "A-45, Sector 62, Noida",
      consultationFee: 500,
      consultationType: ["In-clinic"],
      verified: true,
      rating: 4.8,
      reviewCount: 210,
      about: "Specializes in braces, root canal treatment and general dental care for all ages.",
      workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      workingHours: "9:00 AM – 5:00 PM",
      slots: {
        "today": ["11:00 AM", "11:30 AM", "2:00 PM"],
        "tomorrow": ["9:30 AM", "10:00 AM", "4:00 PM", "4:30 PM"]
      }
    },
    {
      id: 3,
      name: "Dr. Vikram Bakshi",
      specialty: "Cardiology",
      qualification: "MBBS, MD, DM (Cardiology)",
      experience: 16,
      city: "Delhi",
      area: "Rajouri Garden",
      clinicName: "HeartCare Multispecialty Clinic",
      address: "12-B, Rajouri Garden, New Delhi",
      consultationFee: 1200,
      consultationType: ["In-clinic", "Online"],
      verified: true,
      rating: 4.7,
      reviewCount: 340,
      about: "Manages hypertension, arrhythmia and preventive cardiac care for adults.",
      workingDays: ["Mon", "Wed", "Fri", "Sat"],
      workingHours: "11:00 AM – 4:00 PM",
      slots: {
        "today": ["12:00 PM", "12:30 PM"],
        "tomorrow": ["11:30 AM", "1:00 PM", "1:30 PM"]
      }
    },
    {
      id: 4,
      name: "Dr. Priya Nair",
      specialty: "Pediatrics",
      qualification: "MBBS, MD (Pediatrics)",
      experience: 8,
      city: "Greater Noida",
      area: "Alpha 1",
      clinicName: "Little Steps Child Clinic",
      address: "Shop 5, Alpha 1 Commercial Belt, Greater Noida",
      consultationFee: 600,
      consultationType: ["In-clinic", "Online"],
      verified: true,
      rating: 4.9,
      reviewCount: 176,
      about: "Focuses on child growth, vaccination schedules and common childhood illnesses.",
      workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      workingHours: "10:00 AM – 7:00 PM",
      slots: {
        "today": ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"],
        "tomorrow": ["10:00 AM", "10:30 AM", "5:00 PM"]
      }
    },
    {
      id: 5,
      name: "Dr. Kavita Rao",
      specialty: "Gynecology",
      qualification: "MBBS, MS (Obstetrics & Gynecology)",
      experience: 14,
      city: "Noida",
      area: "Sector 50",
      clinicName: "Women's Wellness Centre",
      address: "B-8, Sector 50, Noida",
      consultationFee: 900,
      consultationType: ["In-clinic"],
      verified: true,
      rating: 4.5,
      reviewCount: 152,
      about: "Provides consultations for menstrual health, pregnancy care and general gynecological concerns.",
      workingDays: ["Tue", "Thu", "Sat"],
      workingHours: "11:00 AM – 3:00 PM",
      slots: {
        "today": [],
        "tomorrow": ["11:00 AM", "11:30 AM", "12:00 PM"]
      }
    },
    {
      id: 6,
      name: "Dr. Sameer Khanna",
      specialty: "General Physician",
      qualification: "MBBS, MD (General Medicine)",
      experience: 6,
      city: "Ghaziabad",
      area: "Raj Nagar Extension",
      clinicName: "CityCare Clinic",
      address: "Shop 3, Raj Nagar Extension, Ghaziabad",
      consultationFee: 400,
      consultationType: ["In-clinic", "Online"],
      verified: false,
      rating: 4.2,
      reviewCount: 64,
      about: "General health check-ups, fevers, infections and referrals to specialists when needed.",
      workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      workingHours: "8:00 AM – 8:00 PM",
      slots: {
        "today": ["1:00 PM", "1:15 PM", "1:30 PM", "1:45 PM"],
        "tomorrow": ["9:00 AM", "9:15 AM", "9:30 AM"]
      }
    },
    {
      id: 7,
      name: "Dr. Meera Iyer",
      specialty: "ENT",
      qualification: "MBBS, MS (ENT)",
      experience: 10,
      city: "Noida",
      area: "Sector 76",
      clinicName: "ENT & Allergy Care Centre",
      address: "C-21, Sector 76, Noida",
      consultationFee: 650,
      consultationType: ["In-clinic", "Online"],
      verified: true,
      rating: 4.4,
      reviewCount: 98,
      about: "Treats ear infections, sinus issues, hearing concerns and throat problems.",
      workingDays: ["Mon", "Tue", "Thu", "Fri"],
      workingHours: "10:00 AM – 5:00 PM",
      slots: {
        "today": ["3:00 PM", "3:30 PM"],
        "tomorrow": ["10:30 AM", "11:00 AM", "4:00 PM"]
      }
    },
    {
      id: 8,
      name: "Dr. Arjun Deshmukh",
      specialty: "Orthopedics",
      qualification: "MBBS, MS (Orthopedics)",
      experience: 11,
      city: "Delhi",
      area: "Dwarka",
      clinicName: "Bone & Joint Clinic",
      address: "Sector 12, Dwarka, New Delhi",
      consultationFee: 800,
      consultationType: ["In-clinic"],
      verified: true,
      rating: 4.6,
      reviewCount: 143,
      about: "Manages joint pain, sports injuries and post-fracture rehabilitation.",
      workingDays: ["Mon", "Wed", "Fri", "Sat"],
      workingHours: "9:00 AM – 2:00 PM",
      slots: {
        "today": ["9:30 AM", "10:00 AM"],
        "tomorrow": ["9:00 AM", "9:30 AM", "1:00 PM"]
      }
    },
    {
      id: 9,
      name: "Dr. Neha Kapoor",
      specialty: "Neurology",
      qualification: "MBBS, DM (Neurology)",
      experience: 13,
      city: "Noida",
      area: "Sector 137",
      clinicName: "NeuroCare Institute",
      address: "D-9, Sector 137, Noida",
      consultationFee: 1100,
      consultationType: ["In-clinic", "Online"],
      verified: true,
      rating: 4.7,
      reviewCount: 87,
      about: "Consults on migraines, chronic headaches, dizziness and nerve-related concerns.",
      workingDays: ["Tue", "Thu", "Sat"],
      workingHours: "12:00 PM – 6:00 PM",
      slots: {
        "today": ["4:00 PM", "4:30 PM"],
        "tomorrow": ["12:30 PM", "1:00 PM", "5:00 PM"]
      }
    },
    {
      id: 10,
      name: "Dr. Farah Siddiqui",
      specialty: "Psychiatry",
      qualification: "MBBS, MD (Psychiatry)",
      experience: 7,
      city: "Greater Noida",
      area: "Pari Chowk",
      clinicName: "Mindful Wellness Clinic",
      address: "Tower 2, Pari Chowk, Greater Noida",
      consultationFee: 950,
      consultationType: ["Online"],
      verified: true,
      rating: 4.8,
      reviewCount: 112,
      about: "Supports patients dealing with stress, anxiety and sleep difficulties in a confidential setting.",
      workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      workingHours: "2:00 PM – 8:00 PM",
      slots: {
        "today": ["6:00 PM", "6:30 PM", "7:00 PM"],
        "tomorrow": ["2:30 PM", "3:00 PM", "7:30 PM"]
      }
    }
  ];

  /* ---------- Seeded demo appointments ----------
     Shown on the patient dashboard before any real booking is
     made, purely so the UI isn't empty on first load. Clearly
     demo data, not a real patient's history. */
  const APPOINTMENTS = [
    {
      id: "MS-DEMO-1001",
      doctorId: 1,
      patientName: "Demo Patient",
      date: "2026-09-20",
      time: "5:00 PM",
      status: "completed",
      reasonForVisit: "Skin problem",
      fee: 700
    },
    {
      id: "MS-DEMO-1002",
      doctorId: 4,
      patientName: "Demo Patient",
      date: "2026-10-05",
      time: "10:30 AM",
      status: "upcoming",
      reasonForVisit: "Routine check-up",
      fee: 600
    }
  ];

  /* ---------- Expose on a single global namespace ---------- */
  window.MediSlotData = {
    SPECIALTIES: SPECIALTIES,
    CONCERN_TO_SPECIALTY: CONCERN_TO_SPECIALTY,
    DOCTORS: DOCTORS,
    APPOINTMENTS: APPOINTMENTS
  };
})();