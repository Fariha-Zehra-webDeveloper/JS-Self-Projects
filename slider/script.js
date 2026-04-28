let img = document.querySelector("#image");
let nextBtn = document.querySelector("#next");
let prevBtn = document.querySelector("#prev");
let currentIndex = 0;
const images = [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
]

prevBtn.addEventListener("click",function(){
   currentIndex--;
   if(currentIndex<0){
     currentIndex=images.length-1;
   }
   update();
});
function update(){
    img.src = images[currentIndex];
}
function nextSlide(){
    currentIndex++;
    if(currentIndex>=images.length){
        currentIndex=0;
    }
    update();
}
nextBtn.addEventListener("click",nextSlide);
setInterval(nextSlide,3000);