const form = document.querySelector(".form");
const btn = document.querySelector("#addBtn");
const displayArea = document.querySelector("#displayArea");
const input = document.querySelector("#userInput");

let editId = null;
let userList = JSON.parse(localStorage.getItem("allCards")) || [];
userList.forEach(user =>{
 displayCard(user);
});

btn.addEventListener("click",(e)=>{
  e.preventDefault();
  if(editId === null){
      const userObj ={
    id: crypto.randomUUID(),
    name:input.value
  };
  userList.push(userObj);
  localStorage.setItem("allCards",JSON.stringify(userList));
  displayCard(userObj);
  form.reset();
  }else{
    let user = userList.find(u => u.id === editId);
    if(user){
     user.name = input.value;
    }
    localStorage.setItem("allCards",JSON.stringify(userList));
    editId = null;
    renderAll();
    form.reset();
    btn.innerText = "Add";
  }
});
displayArea.addEventListener("click",function(e){
let card = e.target.closest(".card");
if (!card) return;
let cardID = card.getAttribute("data-id");
 if(e.target.classList.contains("del-btn")){
      userList = userList.filter(user => user.id !== cardID);
      localStorage.setItem("allCards",JSON.stringify(userList));
      card.remove();
      renderAll();
   }else if(e.target.classList.contains("edit-btn")){
        let userEdit = userList.find(user => user.id === cardID);
   if(userEdit){
    input.value = userEdit.name;
    editId =userEdit.id;
    btn.innerText = "Update";
   }
   }
  
});

function renderAll(){
  displayArea.innerHTML = "";
  userList.forEach(user =>{
   displayCard(user);
  });
}

function displayCard(obj){
  const id = obj.id;
  let cardHTML = `<div class="card" data-id="${id}">
                  <h3>${obj.name}</h3> 
                  <div class="btns">
                  <button class="edit-btn">Edit</button>
                  <button class="del-btn">Delete</button> 
                  </div>
                  </div>`
  displayArea.innerHTML += cardHTML;                
}