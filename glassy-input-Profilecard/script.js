const btn = document.querySelector(".btn");
const displayArea = document.querySelector("#display-area");
const form = document.querySelector(".form");
let name = document.querySelector("#name");
let img = document.querySelector("#img");
let info = document.querySelector("#info");

let savedData = JSON.parse(localStorage.getItem("allCards")) || [];
savedData.forEach(user=>{
  displayCard(user);
})

btn.addEventListener("click",(e)=>{
   e.preventDefault();
   const userObject = {
    id: Date.now(),
    username : name.value,
    userimage: img.value,
    userinfo: info.value
   };
   let alluser = JSON.parse(localStorage.getItem("allCards")) || [];
   alluser.push(userObject);
   localStorage.setItem("allCards",JSON.stringify(alluser));
   displayCard(userObject);
   form.reset();

});

displayArea.addEventListener("click",function(e){
 if(e.target.classList.contains("del-btn")){
 let card = e.target.closest(".card");
 let cardID = card.getAttribute("data-id");
 let currentCards = JSON.parse(localStorage.getItem("allCards")) || [];
 let filteredCards = currentCards.filter(user => user.id != cardID);
 localStorage.setItem("allCards",JSON.stringify(filteredCards));
 card.remove();  
 }
});

function displayCard(obj){
  const id = obj.id || Date.now();
  let cardHTML = `<div class="card" data-id="${id}">
                   <img src="${obj.userimage}">
                   <h3>${obj.username}</h3> 
                   <p>${obj.userinfo}</p>
                   <button class="del-btn">Delete</button>
                   </div>`
  displayArea.innerHTML += cardHTML;                 
}
