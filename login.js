const registerLinkBtn = document.querySelector(".registerLink");
const loginPage = document.querySelector("#loginPage");
const registerPage = document.querySelector("#registerPage");
const loginLinkBtn = document.querySelector(".loginLink");
const loginBtn = document.querySelector(".loginBtn");


registerLinkBtn.addEventListener("click", () => {
    loginPage.classList.add("hidden");
    registerPage.classList.remove("hidden");
});

loginLinkBtn.addEventListener("click", () => {
    registerPage.classList.add("hidden");
    loginPage.classList.remove("hidden");
});


loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    loginPage.classList.add("hidden");
    registerPage.classList.add("hidden");
});