const addBtn = document.querySelector("#addBtn");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector(".task-list");
const themeBtn = document.querySelector("#themeBtn");
const sidebar = document.querySelector(".sidebar");
const hamIcon = document.querySelector(".hamburger-icon");
const userName = document.querySelector("#userName");
const userEmail = document.querySelector("#userEmail");
const userAvatar = document.querySelector("#userAvatar");
const logout = document.querySelector("#logoutBtn");
const settingsBtn = document.querySelector(".setting");
const tasksBtn = document.querySelector(".myTasks");
const todoAppSec = document.querySelector(".todolistapp");
const settingSec =  document.querySelector("#settingsSection");

let registeredUser = JSON.parse(localStorage.getItem("currentUser")) ;
const userKey = registeredUser ? `todos_${registeredUser.email}` : "guest_todos";
let todoList = JSON.parse(localStorage.getItem(userKey)) || []; 
let editId = null;
console.log(registeredUser);
const renderTask = (todo) =>{
   const taskCard = document.createElement("div");
   taskCard.classList.add("task-card");
   if(todo.completed) taskCard.classList.add("completed");
   taskCard.innerHTML = `
                      <div class = "right" >
                      <input class= "task-check" type="checkbox" ${todo.completed ? "checked" : ""}>
                      <span class=".task-text">${todo.text}</span>
                      </div>
                      <div class = "task-actions">
                      <button class="edit-btn" >
                        <i class="fa-solid fa-pen"></i>      
                      </button>
                      <button class="delete-btn">
                         <i class="fa-solid fa-trash"></i> 
                      </button>
                      </div>
   `;
   taskList.appendChild(taskCard);
   const checkbox = taskCard.querySelector(".task-check");
   checkbox.addEventListener("change",()=>{
        taskCard.classList.toggle("completed");
        todo.completed = checkbox.checked;
        localStorage.setItem(userKey,JSON.stringify(todoList)); 
        updateCounter();
   });
  const delBtn = taskCard.querySelector(".delete-btn");
  delBtn.addEventListener("click",()=>{
    todoList = todoList.filter(item => item.id !== todo.id);
    localStorage.setItem(userKey,JSON.stringify(todoList));
    updateCounter();
    taskCard.remove();
  });
  const editBtn = taskCard.querySelector(".edit-btn");
  editBtn.addEventListener("click",()=>{
    taskInput.value = todo.text;
    editId = todo.id;
    addBtn.innerText = "update";
  });
}
const filterTask = (status) =>{
  taskList.innerHTML = "";
  let filtered;
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  if(status === "active"){
    filtered = todoList.filter( t => t.completed === false);
    document.querySelector("#active-btn").classList.add("active");
  }else if( status === "completed"){
    filtered = todoList.filter( t => t.completed === true);
    document.querySelector("#completed-btn").classList.add("active");
  }else{
    filtered = todoList;
    document.querySelector("#all-btn").classList.add("active");
  }
  filtered.forEach(renderTask);
}
const updateCounter = () =>{
  taskLeft = todoList.filter(item => item.completed === false);
  const count = taskLeft.length;
  document.querySelector("#taskCount").innerText = `${count} task left`; 
}
const toggleTheme = (mode) =>{
  const icon  = document.querySelector("#themeBtn i");
     if(mode === "dark"){
        document.body.classList.add("dark-mode");
        icon.className = "fa-solid fa-moon";
     }else{
         document.body.classList.remove("dark-mode");
         icon.className = "fa-regular fa-moon";
     }
    localStorage.setItem("currentTheme",mode);
}
hamIcon.addEventListener("click",()=>{
  sidebar.classList.toggle("collapsed");
});
themeBtn.addEventListener("click",()=>{
  if(document.body.classList.contains("dark-mode")){
    toggleTheme("light");
  }else{
    toggleTheme("dark");
  }
})
document.querySelector("#all-btn").addEventListener("click",()=>{
   filterTask("all");
   localStorage.setItem("currentFilter","all");
});
document.querySelector("#active-btn").addEventListener("click",()=>{
   filterTask("active");
   localStorage.setItem("currentFilter","active");
});
document.querySelector("#completed-btn").addEventListener("click",()=>{
   filterTask("completed");
   localStorage.setItem("currentFilter","completed");
});
addBtn.addEventListener("click",()=>{
    const taskValue = taskInput.value.trim();
    if(taskValue === ""){
      alert("first write any task then add!");
      return;
    }
    if(editId){
      todoList = todoList.map(item => item.id === editId ? {...item, text: taskValue} :item);
      editId = null;
      addBtn.innerText = "Add";
      taskList.innerHTML = "";
      todoList.forEach(renderTask);
    }else{
        const todoTask ={
          id:crypto.randomUUID(),
          text:taskValue,
          completed: false   
        };
        todoList.push(todoTask);
        renderTask(todoTask);
    }
    localStorage.setItem(userKey,JSON.stringify(todoList));
    updateCounter();
    taskInput.value = "";
});
logout.addEventListener("click",()=>{
  localStorage.removeItem("currentUser");
  window.location.href = "sign.html";
})
const todoLoad = ()=>{
  registeredUser = JSON.parse(localStorage.getItem("currentUser"));
  if(!registeredUser){
    window.location.href = "sign.html";
    return;
  }
  userName.innerText = registeredUser.name;
  userEmail.innerText = registeredUser.email;

  if(registeredUser.image){
    userAvatar.innerHTML = `<img src="${registeredUser.image}" alt="avatar">`;
  }else{
    userAvatar.innerText = getInitials(registeredUser.name);
  }
  const savedFilter = localStorage.getItem("currentFilter") ||"all";
  filterTask(savedFilter);
  const theme = localStorage.getItem("currentTheme") || "light";
  toggleTheme(theme);
  updateCounter();
}
todoLoad();

settingsBtn.addEventListener("click",()=>{
  todoAppSec.classList.add("hidden");
  settingSec.classList.remove("hidden");
  settingSec.classList.add("active");
});

tasksBtn.addEventListener("click",()=>{
  settingSec.classList.add("hidden");
  settingSec.classList.remove("active");
  todoAppSec.classList.remove("hidden");
});

const saveProfileBtn = document.querySelector("#saveProfile");
const avatarInput = document.querySelector("#avatarInput");

saveProfileBtn.addEventListener("click", () => {
    const newImageUrl = avatarInput.value.trim();

    if (newImageUrl !== "") {
        let allUsers = JSON.parse(localStorage.getItem("user")) || [];
          allUsers = allUsers.map(user => {
            if (user.email === registeredUser.email) {
                return { ...user, image: newImageUrl };
            }
            return user;
        });
        localStorage.setItem("user", JSON.stringify(allUsers));
        registeredUser.image = newImageUrl;
        localStorage.setItem("currentUser", JSON.stringify(registeredUser));
        document.querySelector("#userAvatar").innerHTML = `<img src="${newImageUrl}" alt="avatar">`;
        alert("Profile updated permanently! ✨");
        avatarInput.value = "";
    }
});