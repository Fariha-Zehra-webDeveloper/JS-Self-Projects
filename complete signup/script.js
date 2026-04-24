// forms
//loginForm
let loginForm = document.querySelector("#login-form");
let username = document.querySelector("#login-user");
let password = document.querySelector("#login-pass");
let forgetPass = document.querySelector(".p-forget");
let signBack = document.querySelector(".sign");
let loginBtn = document.querySelector(".login-btn");

//signupForm
let signupForm = document.querySelector("#signup-form");
let user = document.querySelector("#user");
let email = document.querySelector("#email");
let pass = document.querySelector("#pass");
let confPass = document.querySelector("#conf-pass");
let signBtn = document.querySelector(".sign-btn");
let account = document.querySelector(".account");

// toggle Eye
let loginEye = document.querySelector("#login-eye");
let  signupEye =  document.querySelector("#signup-eye");
let confEye =  document.querySelector("#conf-eye");

//forgetPassword
let forgetForm = document.querySelector("#forget-form");
let forgetEmail = document.querySelector("#forget-email");
let resetBtn = document.querySelector("#reset-btn");
let loginBack = document.querySelector(".back-to-login");

//success
let successBox = document.querySelector("#success-box");
let successMsg = document.querySelector("#success-msg");
let continueBtn = document.querySelector("#continue-btn");

//Error
let errorBox = document.querySelector("#error-box");
let errorMsg = document.querySelector("#error-msg");
let closeBtn = document.querySelector("#close-error");

resetBtn.addEventListener("click",function(e){
 e.preventDefault();
 if(forgetEmail.value.trim() === ""){
  showError("enter email",forgetForm);
  forgetForm.style.display = "none";
 }else{
   successBox.style.display = "flex";
   successMsg.innerText = "rest";
   forgetForm.style.display = "none"; 
}
loginBack.addEventListener("click",function(e){
 e.preventDefault();
 forgetForm.style.display = "none";
 loginForm.style.display = "flex";
});
});
forgetPass.addEventListener("click",function(e){
   e.preventDefault();
loginForm.style.display = "none";
forgetForm.style.display = "flex";
});
loginBtn.addEventListener("click",function(e){
  e.preventDefault();
  let savedData = JSON.parse(localStorage.getItem("storedUser"));
  if(username.value.trim() === "" || password.value === ""){
   showError("fill the both fields",loginForm);
   loginForm.style.display = "none";
   currentForm = loginForm;
  }else if(savedData && username.value.trim() === savedData.userName && password.value === savedData.Password){
   successBox.style.display = "flex";
   successMsg.innerText = "login Successfully";
   loginForm.style.display = "none";
  }else{
   successBox.style.display = "flex";
   successMsg.innerText = "login Successfully";
   loginForm.style.display = "none";
  } 
});
signBtn.addEventListener("click",function(e){
   e.preventDefault();
   let emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if(user.value.trim() === "" || email.value.trim() === "" || pass.value === "" || confPass.value === "" ){
   showError("All fields are required",signupForm);
   signupForm.style.display = "none";
   }else if(!emailRegex.test(email.value.trim())){
   showError("enter valid email",signupForm);
   signupForm.style.display = "none";
   }else if(pass.value !== confPass.value){
   showError("password not matched",signupForm);
   signupForm.style.display = "none"; 
   }else{
      const userData = {
         userName: user.value.trim(),
         Password: pass.value,
         Email:email.value.trim()
      };
      localStorage.setItem("storedUser",JSON.stringify(userData));
      successBox.style.display = "flex";
      successMsg.innerText = "successfully signup";
      signupForm.style.display = "none";
   }
});
signupEye.addEventListener("click",function(){
  pass.type = pass.type === "password" ? "text" : "password";
  this.classList.toggle("fa-eye");
  this.classList.toggle("fa-eye-slash");
});
loginEye.addEventListener("click",function(){
  password.type = password.type === "password" ? "text" : "password";
  this.classList.toggle("fa-eye");
  this.classList.toggle("fa-eye-slash");
});
confEye.addEventListener("click",function(){
  confPass.type = confPass.type === "password" ? "text" : "password";
  this.classList.toggle("fa-eye");
  this.classList.toggle("fa-eye-slash");
});
continueBtn.addEventListener("click",function(e){
  e.preventDefault();
   successBox.style.display = "none";
  loginForm.style.display = "flex";
});
account.addEventListener("click",function(e){
  e.preventDefault();
  signupForm.style.display = "none";
  loginForm.style.display = "flex";
});
closeBtn.addEventListener("click",function(e){
 e.preventDefault();
 errorBox.style.display = "none";
 currentForm.style.display = "flex";
});
function showError(msg,formThatHasError){
   errorBox.style.display = "flex";
   errorMsg.innerText = msg;
   formThatHasError.style.display = "none";
   currentForm = formThatHasError;
}