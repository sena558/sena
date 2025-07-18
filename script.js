const CORRECT_KEY = "SENA123";
const STORAGE_KEY = "unlock_status";

// Encode & decode base64
function encodeBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function decodeBase64(str) {
  return decodeURIComponent(escape(atob(str)));
}

// Cek status kunci
function isUnlocked() {
  return localStorage.getItem(STORAGE_KEY) === encodeBase64("unlocked");
}

function setUnlocked() {
  localStorage.setItem(STORAGE_KEY, encodeBase64("unlocked"));
}

// Fungsi utama untuk cek key
function checkKey() {
  const input = document.getElementById("unlockKey").value;
  const popup = document.getElementById("popup");
  const status = document.getElementById("status");
  const modal = document.getElementById("successModal");
  const video = document.getElementById("unlockVideo");

  if (input === CORRECT_KEY) {
    setUnlocked();

    // Sembunyikan popup, tampilkan modal sukses
    popup.style.display = "none";
    modal.classList.add("show");

    // Setelah 3 detik, sembunyikan modal, tampilkan video
    setTimeout(() => {
      modal.classList.remove("show");

      // Tampilkan video jedak jeduk
      video.style.display = "block";
      video.play();
    }, 3000);
  } else {
    status.textContent = "❌ Kode salah. Coba lagi.";
  }
}

// Cek status kunci saat halaman diload
function lockSystemOnLoad() {
  const popup = document.getElementById("popup");
  const video = document.getElementById("unlockVideo");

  if (!isUnlocked()) {
    popup.style.display = "flex";
    video.style.display = "none"; // Sembunyikan video
  } else {
    popup.style.display = "none";
    video.style.display = "none"; // Jangan auto-tampil meski sudah unlocked
  }
}