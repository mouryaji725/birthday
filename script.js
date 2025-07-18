const shayariList = [
    "Tere bina zindagi adhuri hai, teri dosti meri khushnuma subah hai.",
    "Dosti mein jo maza hai woh mohabbat mein kahan.",
    "Har pal teri yaad aati hai, teri dosti meri zindagi ki pehchaan hai.",
    "Teri har khushi meri duaon mein basi hai, tu sada muskurata rahe.",
    "Dost sirf waqt bitane ke liye nahi, dard baantne ke liye hota hai.",
    "Aryan, tu hai toh zindagi rangeen hai."
  ];
  function openPopup() {
    const randomIndex = Math.floor(Math.random() * shayariList.length);
    document.getElementById("shayari").innerHTML = shayariList[randomIndex];
    document.getElementById("popup").style.display = "flex";
  }
  function closePopup() {
    document.getElementById("popup").style.display = "none";
  }


 // Floating Lantern Balloons
setInterval(() => {
  const balloon = document.createElement("img");
  balloon.src = "balloon.png";
  balloon.style.position = "absolute";
  balloon.style.left = Math.random() * 100 + "vw";
  balloon.style.animation = "floatUp 12s linear";
  balloon.style.width = "85px";
  document.getElementById("balloon-container").appendChild(balloon);
  setTimeout(() => balloon.remove(), 12000);
}, 1000);


 const countDate = new Date("July 11, 2026 00:00:00").getTime();
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    daysEl.innerHTML = days + "<div class='label'>Days</div>";
    hoursEl.innerHTML = hours + "<div class='label'>Hours</div>";
    minutesEl.innerHTML = minutes + "<div class='label'>Minutes</div>";
    secondsEl.innerHTML = seconds + "<div class='label'>Seconds</div>";
    if (distance < 0) {
      clearInterval(countdown);
      document.getElementById("time-content").innerHTML = "🎉 Happy Birthday Aryan! 🎂";
    }
     else{
      if(distance==0){
        clearInterval(countdown);
      document.getElementById("time-content").innerHTML = "🎉 Happy Birthday Aryan! Today is your birthday 🎂";
   }else{
       document.getElementById("time-content").innerHTML = "🎉 Your Birthday is coming soon !🎂";
   }  } }, 1000);

 function openDialog() {
  document.getElementById("wishDialog").classList.add("show");
}
function closeDialog() {
  document.getElementById("wishDialog").classList.remove("show");
}
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
function openReviewDialog() {
  document.getElementById("reviewDialog").classList.add("show");
}
function closeReviewDialog() {
  document.getElementById("reviewDialog").classList.remove("show");
}
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
// ✅ Trap back button to show review dialog
history.pushState(null, null, location.href);
window.addEventListener("popstate", () => {
  openReviewDialog();
  history.pushState(null, null, location.href);
});
