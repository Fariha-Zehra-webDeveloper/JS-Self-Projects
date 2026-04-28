// let btn = document.querySelector('#next');
// let pre = document.querySelector("#prev");
// let progress = document.querySelector("#progress");
// let circles = document.querySelectorAll(".circle");
// let currentActive = 1;
// btn.addEventListener("click", function () {
//     currentActive++;
//     if (currentActive > circles.length) {
//         currentActive = circles.length;
//     }
//     update();
// });
// pre.addEventListener("click",function(){
//    currentActive--; // Ginti 1 kam karo (e.g., 3 se 2)
//    // Agar ginti 1 se niche chali jaye (yani 0 ho jaye)
//    if(currentActive<1){
//     currentActive=1; // Usay wapas 1 par rok do
//    }
//    update();
// });
// function update() {
//     circles.forEach((circle, index) => {
//         if (index < currentActive) {
//             circle.classList.add('active');
//         } else {
//             circle.classList.remove('active');
//         }
//     });
//     const actives = document.querySelectorAll('.active');
//     progress.style.width = ((actives.length - 1) / (circles.length - 1)) * 100 + '%';

//     if(currentActive === 1){
//         pre.disabled = true; // Pehle step par Prev band
//     }else if(currentActive === circles.length){
//         next.disabled = true; // Aakhri step par Next band
//     }else{
//         // Beech mein dono buttons kaam karenge
//         pre.disabled = false;
//         next.disabled=false;
//     }
// }

let nextBtn = document.querySelector("#next");
let prevBtn = document.querySelector("#prev");
let circles = document.querySelectorAll(".circle");
let progress = document.querySelector("#progress");
let currentActive = 1;
nextBtn.addEventListener("click",function(){
   currentActive++;
   if(currentActive>circles.length){
       currentActive=circles.length;
   }
   update();
});
prevBtn.addEventListener("click",function(){
    currentActive--;
    if(currentActive<1){
        currentActive=1;
    }
    update();
});
function update(){
    circles.forEach((circle,index)=>{
        if(index<currentActive){
               circle.classList.add("active");
        }else{
            circle.classList.remove("active");
        }
    });
    const actives = document.querySelectorAll(".active");
    progress.style.width = ((actives.length-1)/(circles.length-1))*100+'%';

    if(currentActive===1){
        prevBtn.disabled=true;
    }else if(currentActive===circles.length){
        nextBtn.disabled= true;
    }else{
        prevBtn.disabled=false;
        nextBtn.disabled=false;
    }
}
window.addEventListener("keydown",(e)=>{
    if(e.key === "ArrowRight"){
        currentActive++;
        if(currentActive>circles.length){
            currentActive=circles.length;
        }update();}
        else if(e.key === "ArrowLeft"){
          currentActive--;
          if(currentActive<1){
            currentActive=1;
          }update();
        }
});