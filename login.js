const registerLinkBtn = document.querySelector(".registerLink");
const loginPage = document.querySelector("#loginPage");
const registerPage = document.querySelector("#registerPage");
const loginLinkBtn = document.querySelector(".loginLink");








const registerBtn = document.querySelector(".registerBtn")
const registerInputsDiv = document.querySelector("#registerInputsDiv")
const registerUsername = document.querySelector("#registerUsername")
const registerPassword = document.querySelector("#registerPassword")



const inputsDiv = document.querySelector(".inputsDiv")
const loginUsername = document.querySelector("#loginUsername")
const loginPassword = document.querySelector("#loginPassword")
const loginBtn = document.querySelector(".loginBtn")

let users = JSON.parse(localStorage.getItem("idPass")) || [];

let loggedInUser  = localStorage.getItem("currentUser");

if(loggedInUser ){
    
    loginPage.classList.add("hidden");
    registerPage.classList.add("hidden");
}


registerInputsDiv.addEventListener("submit",(e)=>{

 e.preventDefault();


 let username = registerUsername.value.trim();
 let password =registerPassword.value.trim();

if (registerUsername.value === "" || registerPassword.value === "") {
    return;
}

let obj1 = {
password,
username
}

let exists = users.find(user => user.username === registerUsername.value);

if (exists) {
    alert("Username already exists");
    return;
}



 Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
}).fire({
  icon: "success",
  title: "Register is successfully"
});



users.push(obj1)

localStorage.setItem("idPass",JSON.stringify(users))
 registerPage.classList.add("hidden");
 loginPage.classList.remove("hidden");
     

})







inputsDiv.addEventListener("submit",(e)=>{
 e.preventDefault();
  

 let foundUser = users.find(user => {
    return (
        user.username === loginUsername.value &&
        user.password === loginPassword.value
    );
 });

if (foundUser) {
    

 Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
}).fire({
  icon: "success",
  title: "Signed in successfully"
});

localStorage.setItem("currentUser", foundUser.username);
location.reload()
console.log("Login Successful");

loginPage.classList.add("hidden");
    registerPage.classList.add("hidden");

}else {
    alert("Wrong username or password");
}



})

registerLinkBtn.addEventListener("click", () => {
    loginPage.classList.add("hidden");
    registerPage.classList.remove("hidden");
});

loginLinkBtn.addEventListener("click", () => {
    registerPage.classList.add("hidden");
    loginPage.classList.remove("hidden");
});


const logoutBtn = document.querySelector(".logoutBtn");

logoutBtn.addEventListener("click",()=>{

    localStorage.removeItem("currentUser");

    location.reload();

});

// loginBtn.addEventListener("click", (e) => {
//     e.preventDefault();

//     loginPage.classList.add("hidden");
//     registerPage.classList.add("hidden");
// });
