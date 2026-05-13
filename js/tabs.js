// tabs.js — EmuStation98 tab switcher

(function () {
  function initTabs(containerSelector) {
    const containers = document.querySelectorAll(containerSelector);

    containers.forEach(function (container) {
      const tabs = container.querySelectorAll('[role="tab"]');
      const panels = container.querySelectorAll('[role="tabpanel"]');

      function activateTab(selectedTab) {
        tabs.forEach(function (tab) {
          const isSelected = tab === selectedTab;
          tab.setAttribute("aria-selected", isSelected ? "true" : "false");
          // 98.css uses .active on the tab button for the raised/active look
          if (isSelected) {
            tab.classList.add("active");
          } else {
            tab.classList.remove("active");
          }
        });

        const targetId = selectedTab.getAttribute("aria-controls");
        panels.forEach(function (panel) {
          if (panel.id === targetId) {
            panel.removeAttribute("hidden");
            panel.classList.add("active-panel");
          } else {
            panel.setAttribute("hidden", "");
            panel.classList.remove("active-panel");
          }
        });
      }

      tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
          activateTab(tab);
        });

        // Keyboard navigation (left/right arrows)
        tab.addEventListener("keydown", function (e) {
          const tabList = Array.from(tabs);
          const idx = tabList.indexOf(tab);
          if (e.key === "ArrowRight") {
            const next = tabList[(idx + 1) % tabList.length];
            next.focus();
            activateTab(next);
          } else if (e.key === "ArrowLeft") {
            const prev = tabList[(idx - 1 + tabList.length) % tabList.length];
            prev.focus();
            activateTab(prev);
          }
        });
      });

      // Activate the first tab by default
      if (tabs.length > 0) {
        activateTab(tabs[0]);
      }
    });
  }

  // Run after DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initTabs(".emu-tab-container");
    });
  } else {
    initTabs(".emu-tab-container");
  }
})();
