// Fungsi untuk membuat kode pemesanan unik sesuai mode
function generateKodePemesanan() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  const isDark = document.body.classList.contains('dark-mode');
  const prefix = isDark ? 'UBD' : 'UBL';
  return `${prefix}-${timestamp}-${randomPart}`;
}

// Fungsi pop-up sederhana
function showPopup(message) {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML = `
    <p>${message.replace(/\n/g, "<br>")}</p>
    <button class="popup-close" aria-label="Tutup popup">Tutup</button>
  `;
  document.body.appendChild(popup);

  popup.querySelector(".popup-close").addEventListener("click", () => {
    popup.style.opacity = "0";
    popup.style.transform = "translate(-50%, -60%)";
    setTimeout(() => popup.remove(), 300);
  });
}

// Fungsi untuk sembunyikan loading screen
function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen");
  if (loadingScreen) {
    loadingScreen.classList.add("hide");
    setTimeout(() => loadingScreen.remove(), 500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  hideLoadingScreen();

  const jadwalForm = document.getElementById("jadwalForm");
  const feedback = document.getElementById("feedback");
  const selectKonselor = document.getElementById("konselor");

  if (jadwalForm && feedback && selectKonselor) {
    jadwalForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const checkedBoxes = jadwalForm.querySelectorAll('input[type="checkbox"]:checked');
      if (!selectKonselor.value || selectKonselor.value === "Pilih salah satu") {
        feedback.textContent = "Silakan pilih konselor terlebih dahulu.";
        feedback.style.color = "#e63946";
        selectKonselor.focus();
        return;
      }

      if (checkedBoxes.length === 0) {
        feedback.textContent = "Silakan pilih setidaknya satu jadwal.";
        feedback.style.color = "#e63946";
        return;
      }

      const selectedTimes = Array.from(checkedBoxes).map(cb => cb.value).join(", ");
      const kodeUnik = generateKodePemesanan();

      showPopup(`Jadwal berhasil dipesan:\n${selectedTimes}\nKonselor: ${selectKonselor.value}\n\nKode Pemesanan Anda:\n${kodeUnik}`);

      feedback.textContent = "";
      jadwalForm.reset();
      selectKonselor.selectedIndex = 0;
      selectKonselor.style.borderColor = "";
      selectKonselor.style.boxShadow = "";
    });

    selectKonselor.addEventListener("change", () => {
      selectKonselor.style.borderColor = "#2a9d8f";
      selectKonselor.style.boxShadow = "0 0 10px rgba(42, 157, 143, 0.5)";
    });
  }

  const anonForm = document.getElementById("anonForm");
  const anonFeedback = document.getElementById("anonFeedback");
  if (anonForm && anonFeedback) {
    anonForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const textarea = anonForm.querySelector("textarea");
      const message = textarea.value.trim();

      if (!message) {
        anonFeedback.textContent = "Pesan tidak boleh kosong.";
        anonFeedback.style.color = "#e63946";
        textarea.focus();
        return;
      }

      anonFeedback.textContent = "Pesan Anda telah terkirim secara anonim.";
      anonFeedback.style.color = "#2a9d8f";
      textarea.value = "";

      setTimeout(() => {
        anonFeedback.textContent = "";
      }, 4000);
    });
  }

  const emergencyBtn = document.querySelector('.emergency-btn');
  if (emergencyBtn) {
    emergencyBtn.addEventListener('click', () => {
      showPopup("🚨 Layanan Darurat 24 Jam\n\nNomor Telepon: 119\nWhatsApp: 0811-222-3333\n\nSegera hubungi jika Anda membutuhkan bantuan darurat.");
    });
  }

  const chatBtn = document.querySelector('.chat-btn');
  if (chatBtn) {
    chatBtn.addEventListener('click', () => {
      showPopup("💬 Chat Cepat\n\nFitur ini akan menghubungkan Anda dengan konselor yang tersedia untuk chat langsung.\n\nFitur dalam pengembangan.");
    });
  }

  const themeBtn = document.querySelector('.theme-btn');
  if (themeBtn) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      themeBtn.textContent = '🌞';
    } else {
      themeBtn.textContent = '🌓';
    }

    themeBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      themeBtn.textContent = isDark ? '🌞' : '🌓';

      document.body.animate([
        { opacity: '0.8' },
        { opacity: '1' }
      ], { duration: 300, easing: 'ease-in-out' });

      // Debugging visual - Tampilkan kode saat ganti tema
      const testKode = generateKodePemesanan();
      console.log("Kode saat ini:", testKode);
    });
  }

  const container = document.querySelector('.container');
  if (container) {
    container.addEventListener('mouseenter', () => {
      container.style.transition = 'transform 0.3s cubic-bezier(.4,2,.6,1)';
      container.style.transform = 'scale(1.03)';
    });

    container.addEventListener('mouseleave', () => {
      container.style.transition = 'transform 0.3s cubic-bezier(.4,2,.6,1)';
      container.style.transform = 'scale(1)';
    });
  }
});
