// let btn = document.querySelectorAll(".tile");

// btn.forEach(function(elem){
//    elem.addEventListener("click",function(){
//            document.body.style.backgroundColor= this.getAttribute("data-color");
//    });
// });

// let button = document.querySelectorAll(".tile");
// button.forEach(elem => {
//     elem.addEventListener("click",function(){
//         let color = this.getAttribute("data-color");
//         document.body.style.backgroundColor = color;
//     });
// });

// let btn = document.querySelectorAll(".tile");
// btn.forEach(elem => {
//      elem.addEventListener("click",function(){
//         btn.forEach(function(item){
//             item.classList.remove("active");
//         });
//        
//         this.classList.add("active");
//         let selectedColor = this.getAttribute("data-color");
//         document.body.style.backgroundColor = selectedColor;
//      });
// });

let btn = document.querySelectorAll(".tile");
btn.forEach(elem => {
    elem.addEventListener("click",function(){
        btn.forEach(item=>{
            item.classList.remove("active");
        });
         this.classList.add("active");
        let color = this.getAttribute("data-color");
        document.body.style.backgroundColor = color;

    });
});

