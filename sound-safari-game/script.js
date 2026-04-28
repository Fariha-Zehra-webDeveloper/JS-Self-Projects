let cards = document.querySelectorAll(".animal-card");
let h1 = document.querySelector("#display-name");
let scoreDisplay = document.querySelector(".score");
let led = document.querySelector(".led-light");
let progressBar = document.querySelector(".progress-bar");
let stopBtn = document.querySelector("#stop-btn");

let currentAudio = new Audio();
let score = 0;

stopBtn.addEventListener("click", function() {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    score = 0; 
    scoreDisplay.innerText = "Score: " + score;
    h1.innerText = "Game Reset! 🛑";
    cards.forEach(c => c.classList.remove("playing"));
    progressBar.style.width = "0%";
    led.style.backgroundColor = "#555";
});

cards.forEach(card => {
    card.addEventListener("click", function() {
      
        cards.forEach(c => c.classList.remove("playing"));
      
        let soundFile = this.getAttribute("data-sound");
        currentAudio.src = soundFile; 
        currentAudio.play();

        score = score + 10; 
        scoreDisplay.innerText = "Score: " + score;

        h1.innerText = this.getAttribute("data-animal");
        this.classList.add("playing");
        led.style.backgroundColor = "red";

        currentAudio.ontimeupdate = function() {
            if (currentAudio.duration) {
                let progress = (currentAudio.currentTime / currentAudio.duration) * 100;
                progressBar.style.width = progress + "%";
            }
        };

        currentAudio.onended = function() {
            card.classList.remove("playing");
            led.style.backgroundColor = "#555";
            progressBar.style.width = "0%";
        };
    });
});