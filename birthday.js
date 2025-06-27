// ✅ Music autoplay handler
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById("bgMusic");
  const playmusic = () => {
    audio.play().catch(() => {
      document.addEventListener("click", () => audio.play(), { once: true });
    });
  };
  playmusic();
});

// ✅ Countdown timer
const countdownEl = document.getElementById('countdown');
const targetDate = new Date('June 29, 2025 00:00:00').getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;
  if (distance < 0) {
    countdownEl.innerHTML = "🎉 It's your special day! Happy Birthday 🎂";
    return;
  }
  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((distance % (1000 * 60)) / 1000);
  countdownEl.innerHTML = `Countdown: ⏳ ${d}d ${h}h ${m}m ${s}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// ✅ Shayari random popup
const shayariList = [
  "🎂 जन्मदिन की ढेर सारी शुभकामनाएँ! तेरे चेहरे की ये मुस्कान यूं ही बनी रहे। 💖",
  "🎉 तेरे इस खास दिन पर दुआ है, तू यूं ही हँसता रहे और खुशियों से भरा रहे। 🥳",
  "🌸 खुश रहो तुम हमेशा ज़िंदगी में, तुम्हारे बिना अधूरी है हमारी महफ़िल। 🎈",
  "💖 जन्मदिन की मिठास हो तेरी हर बात में, यूं ही महकता रहे तेरा जहाँ। 🎂",
  "🎁 भगवान करे हर दुआ कबूल हो तेरी, ज़िंदगी में बस प्यार और खुशियां हों भरी। 🥰"
];
function showShayari() {
  const randomIndex = Math.floor(Math.random() * shayariList.length);
  document.getElementById("shayariText").textContent = shayariList[randomIndex];
  document.getElementById("overlay").classList.add("show");
  document.getElementById("popup").classList.add("show");
}
function closePopup() {
  document.getElementById("popup").classList.remove("show");
  document.getElementById("overlay").classList.remove("show");
}

// ✅ Wish Dialog Handlers
function openDialog() {
  document.getElementById("wishDialog").classList.add("show");
}
function closeDialog() {
  document.getElementById("wishDialog").classList.remove("show");
}

// ✅ Review Dialog Handlers
function openReviewDialog() {
  document.getElementById("reviewDialog").classList.add("show");
}
function closeReviewDialog() {
  document.getElementById("reviewDialog").classList.remove("show");
}

// ✅ Floating Hearts animation
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = Math.random() * 100 + "vw";
  heart.innerText = "💖";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}, 600);

// ✅ Thank You Popups
function showThankYou() {
  const thankPopup = document.getElementById("thankPopup");
  thankPopup.classList.add("show");
  setTimeout(() => {
    thankPopup.classList.remove("show");
  }, 1500);
}
function showReviewThankYou() {
  const thankPopup = document.getElementById("reviewThankPopup");
  thankPopup.classList.add("show");
  setTimeout(() => {
    thankPopup.classList.remove("show");
  }, 1500);
}

// ✅ Star Rating animation + selection
let selectedStars = 0;
document.querySelectorAll(".star").forEach(star => {
  star.addEventListener("click", () => {
    selectedStars = star.getAttribute("data-value");
    document.querySelectorAll(".star").forEach(s => s.classList.remove("selected"));
    document.querySelectorAll(".star").forEach(s => {
      if (s.getAttribute("data-value") <= selectedStars) {
        s.classList.add("selected");
      }
    });
  });
});

// ✅ Wish Form submission
document.getElementById("wishForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const wishInput = document.getElementById("wishInput");
  const errorMsg = document.getElementById("errorMsg");
  if (wishInput.value.trim() === "") {
    errorMsg.style.display = "block";
    return;
  }
  errorMsg.style.display = "none";
  fetch("https://formspree.io/f/xjkrjwra", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ wish: wishInput.value })
  }).then(() => {
    document.getElementById("wishDialog").classList.remove("show");
    wishInput.value = "";
    showThankYou();
  });
});

// ✅ Review Form submission
document.getElementById("reviewForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const liked = document.getElementById("likeInput").value.trim();
  const suggestion = document.getElementById("suggestionInput").value.trim();
  const error = document.getElementById("reviewError");
  if (selectedStars === 0 || liked === "" || suggestion === "") {
    error.style.display = "block";
    return;
  }
  error.style.display = "none";
  fetch("https://formspree.io/f/xldnabnv", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ stars: selectedStars, liked: liked, suggestion: suggestion })
  }).then(() => {
    document.getElementById("reviewDialog").classList.remove("show");
    document.getElementById("reviewForm").reset();
    selectedStars = 0;
    document.querySelectorAll(".star").forEach(s => s.classList.remove("selected"));
    showReviewThankYou();
  });
});

// ✅ Trap back button to show review dialog
history.pushState(null, null, location.href);
window.addEventListener("popstate", () => {
  openReviewDialog();
  history.pushState(null, null, location.href);
});
