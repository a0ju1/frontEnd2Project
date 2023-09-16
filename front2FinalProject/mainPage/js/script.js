// start js new produt  section

let productContant = document.querySelectorAll(".productContant");
let sProductImg = document.querySelectorAll(".productContant .small");
let bProductImg = document.querySelectorAll(".productContant .big");
let firstPic = document.querySelectorAll(".productContant img:first-child");

productContant.forEach((element, ind) => {
  element.addEventListener("click", function () {
    active(this, ind);
  });
});
function active(x, ind) {
  clearAll();
  x.classList.add("col-lg-6");
  console.log(bProductImg[ind]);
  sProductImg[ind].classList.remove("d-lg-flex");
  bProductImg[ind].classList.remove("d-lg-none");
}
function clearAll() {
  for (let i = 0; i < productContant.length; i++) {
    productContant[i].classList.remove("col-lg-6");
    productContant[i].classList.add("col-lg-3");
    sProductImg[i].classList.add("d-lg-flex");
    bProductImg[i].classList.add("d-lg-none");
  }
}
// end js new produt  section

// ------------------------------------------------------------------------------------------------------

// start js selected section (swiper js)

const swiper = new Swiper(".swiper", {
  slidesPerView: 4,
  spaceBetween: 10,
  breakpoints: {
    // when window width is >= 320px
    0: {
      slidesPerView: 1,
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1400: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
  },
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// move to the second page (cart page)

let theChosenSlide = document.querySelector("#theChosenSlide");
theChosenSlide.addEventListener("click", (_) => {
  location.assign("../../cartPage/index.html");
});
// end js selected section

// ---------------------------------------------------------------------------------------------------

// start js choose us section

let box = document.querySelectorAll(".row .usBox");
let imgBox = document.querySelectorAll(".usBoxImgContainer");
let img = document.querySelectorAll(".usBoxImgContainer .normalImg");
let hoverimg = document.querySelectorAll(".usBoxImgContainer .hoverImg");

box.forEach((element, inde) => {
  element.addEventListener("mouseover", function () {
    clean();
    imgBox[inde].classList.add("usBoxImgContainerActive");
    img[inde].classList.add("d-none");
    hoverimg[inde].classList.remove("d-none");
  });
  element.addEventListener("mouseout", function () {
    clean();
  });
});

function clean() {
  for (let i = 0; i < imgBox.length; i++) {
    imgBox[i].classList.remove("usBoxImgContainerActive");
    img[i].classList.remove("d-none");
    hoverimg[i].classList.add("d-none");
  }
}

// end js choose us section

//  open the card page

const cartIcon = document.querySelector(".fa-cart-shopping");
cartIcon.addEventListener("click", (_) => {
  location.assign("../../cartDetails/index.html");
});

// start nav bar scroll js
const headerEl = document.querySelector("nav.navbar#header");
const t1 = document.querySelector(".navbar .container .navbar-brand span");
const t2 = document.querySelectorAll(".navbar .navbar-nav .nav-link");
const t3 = document.querySelectorAll(".iconsContainer i");
const t4 = document.querySelector(".navbar-toggler i");
const whiteLogo = document.querySelector(".whiteLogo");
const blackLogo = document.querySelector(".blackLogo");
console.log(t1, t2, t3, t4);

window.addEventListener("scroll", navScroll);

function navScroll(onclickValue) {
  if (scrollY > 150 || onclickValue == "1") {
    t1.classList.add("textBlack");
    t2[0].classList.add("textBlack");
    t2[1].classList.add("textBlack");
    t2[2].classList.add("textBlack");
    t3[0].classList.add("textBlack");
    t3[1].classList.add("textBlack");
    t3[2].classList.add("textBlack");
    t4.classList.add("textBlack");
    headerEl.classList.add("bg-white", "border-bottom", "textBlack", "py-4");
    whiteLogo.classList.remove("d-lg-flex");
    blackLogo.classList.remove("d-lg-none");
  } else {
    t1.classList.remove("textBlack");
    t2[0].classList.remove("textBlack");
    t2[1].classList.remove("textBlack");
    t2[2].classList.remove("textBlack");
    t3[0].classList.remove("textBlack");
    t3[1].classList.remove("textBlack");
    t3[2].classList.remove("textBlack");
    t4.classList.remove("textBlack");
    headerEl.classList.remove("bg-white", "border-bottom", "textBlack", "py-4");
    whiteLogo.classList.add("d-lg-flex");
    blackLogo.classList.add("d-lg-none");
  }
}
let menBtn = document.querySelector(".menBtn");
console.log(menBtn);
let countClick = 0;
menBtn.addEventListener("click", (_) => {
  if (countClick === 2) {
    countClick = 1;
  } else {
    countClick += 1;
  }

  menBtn.classList.toggle("clickBorder");
  navScroll(countClick);
});
// end nav bar scroll js

// tell phone number code
const input = document.querySelector("#phone");
window.intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: (callback) => {
    fetch("https://ipapi.co/json")
      .then((res) => res.json())
      .then((data) => callback(data.country_code))
      .catch(() => callback("us"));
  },
  utilsScript: "/intl-tel-input/js/utils.js?1690975972744", // just for formatting/placeholders etc
});
// ---------------------------------------------------------------------------------------------------

// start globle function
function classToggle(element, chooseClass) {
  element.classList.toggle(chooseClass);
}

// end globle function

// count the prodecut in the cart
let colthesList = JSON.parse(localStorage.getItem("colthes")) || [];
let countOfProduct = document.querySelector(".fa-cart-shopping div.number");
countOfProduct.innerText = colthesList.length;

// count the number of pic in the main section

let theNumberOfPic = document.querySelector(".theNumberOfPic");
let numberOfPic = document.querySelectorAll(".carousel-indicators button");
theNumberOfPic.innerText = `0${numberOfPic.length}`;

// preLoad page
const preloader = document.querySelector(".preloader");
if (preloader) {
  window.addEventListener("load", () => {
    preloader.remove();
  });
}
