const burger = document.querySelector(".fa-bars");
const menu = document.querySelector(".nav__menu--links");

burger.addEventListener("click", () => {
  menu.classList.toggle("open");
});
