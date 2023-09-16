
// start nav and tap section

let cliced = document.querySelectorAll(".nav-item button");

cliced.forEach((element, ind) => {
  element.addEventListener("click", function () {
    cheaked(this, ind);
  });
});
// this two function to give the btn a design when you click on it
function cheaked(x, ind) {
  clearAll();
  cliced[ind].classList.add("cliced");
}
function clearAll() {
  for (let i = 0; i < cliced.length; i++) {
    cliced[i].classList.remove("cliced");
  }
}
// end nav and tap section

// start js selected section (swiper js)

const swiper = new Swiper(".swiper", {
  slidesPerView: 4,
  spaceBetween: 10,
  breakpoints: {
    // when window width is >= 0px
    0: {
      slidesPerView: 1,
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    // when window width is >= 992px
    992: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    // when window width is >= 1200px
    1200: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    // when window width is >= 1400px
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

// start Clothing selection section

let smallimgs = document.querySelectorAll(".smallimgs img"),
  colorColthes = document.querySelectorAll(".productColor .colorBox span"),
  bigPic = document.querySelector("#selectedPic");

bigPicInSmallScreen = document.querySelectorAll(
  ".carousel-indicators button"
);
let SmallScreenImg = document.querySelectorAll(".carousel-item");

// to replace the small pic with the pig pic when you click on the small pic

smallimgs.forEach((element, ind) => {
  element.addEventListener("click", function () {
    let chosenColor = element.getAttribute("id");
    let allElInTheSameColor = document.querySelectorAll("#" + chosenColor);
    bigPic.src = allElInTheSameColor[3].src;
    cleanTheBorderColor();
    allElInTheSameColor[0].classList.add("theChoosenOne");
    allElInTheSameColor[4].parentElement.classList.add("theChoosenOne");
  });
});

// to replace the small pic with the pig pic when you click on the color

colorColthes.forEach((element, ind) => {
  element.addEventListener("click", function () {
    let chosenColor = element.getAttribute("id");
    let allElInTheSameColor = document.querySelectorAll("#" + chosenColor);
    bigPic.src = allElInTheSameColor[3].src;
    cleanTheBorderColor();
    allElInTheSameColor[0].classList.add("theChoosenOne");
    allElInTheSameColor[4].parentElement.classList.add("theChoosenOne");
  });
});

// to replace between the pic when the screen is less than lg

colorColthes.forEach((element, ind) => {
  element.addEventListener("click", function () {
    let chosenColor = element.getAttribute("id");
    let allElInTheSameColor = document.querySelectorAll("#" + chosenColor);
    cleanTheBorderColor();
    cleanFromActiveClass();
    allElInTheSameColor[1].setAttribute("aria-current", "true");
    allElInTheSameColor[1].classList.add("active");
    allElInTheSameColor[2].classList.add("active");
    allElInTheSameColor[0].classList.add("theChoosenOne");
    allElInTheSameColor[4].parentElement.classList.add("theChoosenOne");
  });
});

// clean the blue box when you click in anther one

function cleanTheBorderColor() {
  for (let i = 0; i < smallimgs.length; i++) {
    smallimgs[i].classList.remove("theChoosenOne");
    colorColthes[i].parentElement.classList.remove("theChoosenOne");
  }
}

function cleanFromActiveClass() {
  for (let i = 0; i < smallimgs.length; i++) {
    bigPicInSmallScreen[i].setAttribute("aria-current", "false");
    bigPicInSmallScreen[i].classList.remove("active");
    SmallScreenImg[i].classList.remove("active");
  }
}
// end Clothing selection section

// start Control the amount of clothing
const decreaseBtn = document.querySelector("#decrease"),
  increaseBtn = document.querySelector("#increase"),
  number = document.querySelector("#conter");

let spanContant = parseInt(number.innerText);

decreaseBtn.addEventListener("click", decrease);
increaseBtn.addEventListener("click", increase);
function decrease() {
  if (spanContant != 1) {
    spanContant = spanContant - 1;
    number.innerText = spanContant;
  }
}
function increase() {
  spanContant = spanContant + 1;
  number.innerText = spanContant;
}
// end Control the amount of clothing

//  open the card page

const cartIcon = document.querySelector(".fa-cart-shopping");

cartIcon.addEventListener("click", (_) => {
  location.assign("../../cartDetails/index.html");
});

// --------------------------------------------------------------------------------------------

// count the prodecut in the cart

let countOfProduct = document.querySelector(".fa-cart-shopping div.number");

// Function Collect cart data

const sendDataBtn = document.querySelector(".sebdDataBtn");
let colthesList = JSON.parse(localStorage.getItem("colthes")) || [];

sendDataBtn.addEventListener("click", (event) => {
  event.preventDefault();
  colletData(sendDataBtn);
});

function colletData(item) {
  let colthesSection =
    item.parentElement.parentElement.parentElement.parentElement.parentElement
      .parentElement.parentElement;
  let colthesImg;
  let wornningMessage = document.querySelector(".wornningMessage");
  if (window.innerWidth >= 992) {
    colthesImg = colthesSection.querySelector("#selectedPic").src;
  } else {
    colthesImg = colthesSection.querySelector(
      ".carousel-inner .carousel-item.active img"
    ).src;
  }
  let colthesName = colthesSection.querySelector(".productNameIn").innerText,
    colthesId = colthesSection.querySelector(".produtId span").innerText,
    colthesColor = colthesSection.querySelector(".carousel-inner .carousel-item.active img").getAttribute("id"),
    selectElement = colthesSection.querySelector("#selectedSize"),
    colthesSize = selectElement.options[selectElement.selectedIndex].innerText,
    colthesAmmount = colthesSection.querySelector("#conter").innerText,
    colthesPrice = colthesSection.querySelector("#clothePrice span").innerText;
  // find index function 
  colthesIndex = colthesList.findIndex((item) => {
    return (
      item.color == colthesColor &&
      item.size == colthesSize &&
      item.name == colthesName
    );
  });
  // condition for the same colthes
  if (colthesIndex >= 0) {
    let oldCount = +colthesList[colthesIndex].count;
    oldCount += +colthesAmmount;
    colthesList[colthesIndex].count = oldCount;
  } else {
    // new object
    if (colthesSize == "Choose size") {
      wornningMessage.classList.remove("d-none");
    } else {
      let clotheObject = {
        imgSrc: colthesImg,
        name: colthesName,
        id: colthesId,
        count: colthesAmmount,
        price: colthesPrice,
        size: colthesSize,
        color: colthesColor,
      };
      // add to the local storage
      colthesList.push(clotheObject);
      wornningMessage.classList.add("d-none");
    }
  }

  localStorage.setItem("colthes", JSON.stringify(colthesList));
  countOfProduct.innerText = colthesList.length;
}
countOfProduct.innerText = colthesList.length;

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

// start nav bar scroll js

const headerEl = document.querySelector("nav.navbar#header");
 t1 = document.querySelector(".navbar .container .navbar-brand span"),
 t2 = document.querySelectorAll(".navbar .navbar-nav .nav-link"),
 t3 = document.querySelectorAll(".iconsContainer i"),
 t4 = document.querySelector(".navbar-toggler i"),
 disCountSec = document.querySelector(".disCountSec");

window.addEventListener("scroll", navScroll);

// this function to convert the color in the nave bar

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
    disCountSec.classList.add("d-lg-none");
    headerEl.classList.remove("pt-lg-0");
    headerEl.classList.add("bg-white", "border-bottom", "textBlack", "py-4");
  } else {
    t1.classList.remove("textBlack");
    t2[0].classList.remove("textBlack");
    t2[1].classList.remove("textBlack");
    t2[2].classList.remove("textBlack");
    t3[0].classList.remove("textBlack");
    t3[1].classList.remove("textBlack");
    t3[2].classList.remove("textBlack");
    t4.classList.remove("textBlack");
    disCountSec.classList.remove("d-lg-none");
    headerEl.classList.add("pt-lg-0");
    headerEl.classList.remove("bg-white", "border-bottom", "textBlack", "py-4");
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

// preLoad page

const preloader = document.querySelector(".preloader");
if (preloader) {
  window.addEventListener("load", () => {
    preloader.remove();
  });
}
