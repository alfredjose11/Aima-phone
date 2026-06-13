// ---------------------------------------------------------
// Supabase configuration
// Project Settings -> API in your Supabase dashboard
// ---------------------------------------------------------
const SUPABASE_URL = "https://ttyciazygdtvzatvodqr.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_J_H-aeDZZGA-aYjav71snA_vV3dKc15";

// Initialize the Supabase Client
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Master Blood Group Array
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

/**
 * Populates a given select element with blood group options.
 */
function fillBloodGroupOptions(selectElement, withAny = false) {
  if (!selectElement) return;

  // Clear "Loading groups..." out of the DOM completely
  selectElement.innerHTML = "";

  // Add the blanket filter option if requested (for find.html)
  if (withAny) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "Any Group";
    selectElement.appendChild(opt);
  }

  // Loop through and append the dynamic blood group options
  BLOOD_GROUPS.forEach(bg => {
    const opt = document.createElement("option");
    opt.value = bg;
    opt.textContent = bg;
    selectElement.appendChild(opt);
  });
}

/**
 * Standardized status response handler
 */
function showStatus(element, message, isOk = true) {
  if (!element) return;
  element.textContent = message;
  element.className = "status-msg show " + (isOk ? "ok" : "err");
}

// ==========================================================================
// EMERGENCY BACKUP FORCE-LOADER
// Automatically scans the current page and forcefully populates any blood group dropdown
// ==========================================================================
(function forcePopulate() {
  const runFill = () => {
    const selectEl = document.getElementById("blood_group");
    if (selectEl) {
      // If we are on find.html, pass true for "Any Group", otherwise false for register.html
      const isSearchPage = window.location.pathname.includes("find");
      fillBloodGroupOptions(selectEl, isSearchPage);
      console.log("Supabase-config forced dropdown generation successfully.");
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runFill);
  } else {
    runFill();
  }
})();