// music.js — EmuStation98 background music player

(function () {
  var STORAGE_KEY = "emu98_muted";

  // Read saved mute preference (default: unmuted)
  var muted = localStorage.getItem(STORAGE_KEY) === "true";

  var audio = new Audio("audio/background_music.mp3");
  audio.loop = true;
  audio.volume = 0.4;
  audio.muted = muted;

  // Attempt autoplay; browsers may block it until first interaction
  var playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch(function () {
      // Autoplay blocked — start on first user interaction instead
      document.addEventListener("click", function startOnInteraction() {
        audio.play();
        document.removeEventListener("click", startOnInteraction);
      }, { once: true });
    });
  }

  function updateButton(btn) {
    btn.textContent = audio.muted ? "🔇" : "🔊";
    btn.title = audio.muted ? "Unmute music" : "Mute music";
  }

  function injectButton() {
    var trayIcons = document.querySelector(".tray-icons");
    if (!trayIcons) return;

    var btn = document.createElement("button");
    btn.id = "music-toggle";
    btn.style.cssText = [
      "background: none",
      "border: none",
      "cursor: pointer",
      "font-size: 14px",
      "padding: 0 3px",
      "line-height: 1",
      "display: flex",
      "align-items: center",
    ].join(";");

    updateButton(btn);

    btn.addEventListener("click", function () {
      audio.muted = !audio.muted;
      muted = audio.muted;
      localStorage.setItem(STORAGE_KEY, muted);
      updateButton(btn);
    });

    // Insert before the first tray icon so it sits on the left of the tray
    trayIcons.insertBefore(btn, trayIcons.firstChild);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectButton);
  } else {
    injectButton();
  }
})();
