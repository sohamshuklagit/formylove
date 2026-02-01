const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");
const celebrate = document.getElementById("celebrate");

document.getElementById("nextBtn").onclick = () => {
  page1.classList.remove("active");
  page2.classList.add("active");
  revealCaptions();

  window.scrollTo(0,0);
};

document.getElementById("nextToQuestion").onclick = () => {
  page2.classList.remove("active");
  page3.classList.add("active");
  window.scrollTo(0,0);
};

// Voice note
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const duration = document.getElementById("duration");

playBtn.onclick = () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️ Pause";
  } else {
    audio.pause();
    playBtn.textContent = "▶️ Play";
  }
};

audio.ontimeupdate = () => {
  const m = Math.floor(audio.currentTime / 60);
  const s = Math.floor(audio.currentTime % 60);
  duration.textContent = `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
};

// Question page logic
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const question = document.getElementById("question");
const catImg = document.getElementById("catImg");

let attempts = 0;
const messages = [
  "Are you sure? 🥺",
  "Wait… think again 😿",
  "Don’t want me? 😤",
  "Please don’t do this 🥺",
  "Okay okay 😅"
];

function moveNo() {
  attempts++;

  noBtn.style.position = "fixed";
  noBtn.style.left = Math.random() * (window.innerWidth - 100) + "px";
  noBtn.style.top = Math.random() * (window.innerHeight - 60) + "px";

  question.textContent = messages[Math.min(attempts-1, messages.length-1)];

  yesBtn.style.transform = `scale(${1 + attempts * 0.4})`;

  if (attempts === 1) catImg.src = "images/cat-love.png";
  if (attempts === 2) catImg.src = "images/cat-happy.png";
  if (attempts === 3) catImg.src = "images/cat-angry.png";
  if (attempts == 4) catImg.src = "images/cat-worried.png";

  catImg.classList.add("shake");
  setTimeout(() => catImg.classList.remove("shake"), 400);

  if (attempts >= 5) {
  yesBtn.style.position = "fixed";
  yesBtn.style.inset = "0";
  yesBtn.style.width = "100vw";
  yesBtn.style.height = "100vh";
  yesBtn.style.fontSize = "4rem";
  yesBtn.style.borderRadius = "0";
  yesBtn.style.zIndex = "10";

  question.textContent = "Now there is no option for you 😤";
  question.classList.add("final-caption");
}



}

noBtn.onmouseenter = moveNo;
noBtn.ontouchstart = moveNo;

yesBtn.onclick = () => {
  page3.classList.remove("active");
  celebrate.classList.add("active");
  window.scrollTo(0,0);
};

// PAGE 2 CAPTIONS REVEAL
const captionLines = document.querySelectorAll("#page2 .caption-line");



// PAGE 2 CAPTIONS – LETTER BY LETTER (NETFLIX STYLE)
function revealCaptions() {
  const lines = document.querySelectorAll("#page2 .caption-line");

  let delay = 0;

  lines.forEach(line => {
    const text = line.textContent;
    line.textContent = "";

    [...text].forEach(char => {
      const span = document.createElement("span");

      // preserve spaces properly
      span.innerHTML = char === " " ? "&nbsp;" : char;
      span.classList.add("char");
      line.appendChild(span);

      setTimeout(() => {
        span.classList.add("show");
      }, delay);

      // timing logic
      if (char === "." || char === "," || char === "…") {
        delay += 50; // pause after punctuation
      } else {
        delay += 50; // normal letter delay
      }
    });

    delay += 300; // pause between lines
  });
}


