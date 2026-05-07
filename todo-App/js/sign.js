const container = document.getElementById('container');
const registerBtn = document.getElementById('registerToggle');
const signInBtn = document.getElementById('loginToggle');
const avatarCircle = document.getElementById('avatarPreview');
const photoInput = document.getElementById('photoInput');
const uploadLink = document.querySelector('.upload-link');
//signupfields
const signupForm = document.querySelector('.signup');
const signupName = document.querySelector('#signupName');
const signupEmail = document.querySelector('#signupEmail');
const signupPass = document.querySelector('#signupPass');
const signupBtn = document.querySelector('#signBtn');
//loginfields
const loginForm = document.querySelector('.login');
const loginEmail = document.querySelector('#loginEmail');
const loginPass = document.querySelector('#loginPass');
const loginBtn = document.querySelector('#login-Btn');
//forgot Pass
const forgotLink = document.querySelector("#forgotlink");
const forgetModel = document.querySelector("#forgetModal");
const closeModel = document.querySelector("#closeModal");
const verifyBtn = document.querySelector("#checkUserBtn");
//errors
const errorMsg = document.querySelectorAll('.error-msg');
//googleIcon
const googleIcons = document.querySelectorAll(".icon"); 
const customAlert = document.querySelector("#customAlert");
const closeAlert = document.querySelector("#closeAlert");
let profileImageData = "";
let savedData = JSON.parse(localStorage.getItem("user")) || [];
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});
signInBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
const errormsg = (inputElement,msg) =>{
  const errorDisplay = inputElement.nextElementSibling;
  errorDisplay.innerText = msg;
  errorDisplay.classList.add("show");
}
const btns = [avatarCircle,uploadLink];
btns.forEach(el => {
    el.addEventListener("click",()=>{
      photoInput.click();
    });
});
photoInput.addEventListener("change",(e)=>{
  const file = e.target.files[0];
  const reader = new FileReader();
  if(file){
    reader.onload = () =>{
       profileImageData = reader.result;
       avatarCircle.innerHTML = `<img src="${profileImageData}" alt="Profile">`;
    };
      reader.readAsDataURL(file);
  }
});
signupName.addEventListener("input",()=>{
  if(!profileImageData){
    const initials = getInitials(signupName.value);
    avatarCircle.innerHTML = initials ? `<div class="initials-style">${initials}</div>` : `<span id="initials">?</span>`;
  }
});
signupBtn.addEventListener("click",(e) =>{ 
  e.preventDefault();
  errorMsg.forEach(el => el.innerText = "");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(signupName.value === ""){
    errormsg(signupName,"enter your name!");
  }else if(!emailRegex.test(signupEmail.value)){
    errormsg(signupEmail,"enter valid email");
  }else if(signupPass.value.length < 8){
    errormsg(signupPass,"password must be atleast 8 chars!");
  }else{
     const userData = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPass.value,
        image: profileImageData,
     };
     savedData.push(userData);
     localStorage.setItem("user",JSON.stringify(savedData));
     alert("Registeration Successfull!");
     container.classList.remove("active");
     signupForm.reset();
     profileImageData = "";
     avatarCircle.innerHTML = `<span id = "initials">?</span>`;
  }
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = loginEmail.value.trim();
  const pass = loginPass.value.trim();
  const users = JSON.parse(localStorage.getItem("user")) || [];
  const findUser = users.find(u => u.email === email && u.password === pass);
  if (findUser) {
    localStorage.setItem("currentUser", JSON.stringify(findUser));
    loginForm.reset();
    alert("Login successfully!");
    window.location.href = "index.html";
  } else {
    alert("Invalid Credentials!");
  }
});
forgotLink.addEventListener("click",(e)=>{
  e.preventDefault();
  forgetModel.classList.add("active");
});
closeModel.addEventListener("click",()=>{
 forgetModel.classList.remove("active");
});
verifyBtn.addEventListener("click",()=>{
  const emailInput = document.querySelector("#recoveryEmail").value.trim();
  const nameInput = document.querySelector("#recoveryName").value.trim();
  let users = JSON.parse(localStorage.getItem("user")) || [];
  const userIndex = users.findIndex(u => u.email === emailInput && u.name.toLowerCase() === nameInput.toLowerCase());
  if(userIndex !== -1){
    const newPass = prompt("user Verified! Enter your New Pass:");
    if(newPass && newPass.length >= 8){
      users[userIndex].password = newPass;
      localStorage.setItem("user",JSON.stringify(users));
      alert("Success! Your password has been changed. Now Login with new PAssword!");
      forgetModel.classList.add("hiddenn");
      document.querySelector("#recoveryEmail").value = "";
      document.querySelector("#recoveryName").value = "";
    } else if(newPass){
      alert("password must be atleast 8 characters long!");
    }
  } else{
    alert("Invalid Details!");
  }
});
googleIcons.forEach(icon =>{
  icon.addEventListener("click",(e) =>{
    e.preventDefault();
    customAlert.classList.remove("hiddenn");
  });
});
closeAlert.addEventListener("click",()=>{
  customAlert.classList.add("hiddenn");
});
