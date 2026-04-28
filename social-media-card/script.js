let displayCount = document.querySelector("#like-count");
let heart = document.querySelector(".fa-heart");
let likeSound =new Audio('./u_u4pf5h7zip-prop_popup-345986.mp3');
let count = 0;
heart.addEventListener("click",function(){
    this.classList.toggle("active");
    if(this.classList.contains("active")) {
        this.classList.add("active");
        count++;
        likeSound.currentTime = 0;
        likeSound.play();
    }else{
        this.classList.remove("active");
         count--;
    }
    displayCount.innerText = count;
});