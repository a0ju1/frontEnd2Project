const cartList = document.querySelector("#cartBody");
let colthesList = JSON.parse(localStorage.getItem("colthes")) || [];
let allTotalEl = document.querySelector(".totalPrice");

function show() {
  let sum = 0;
  cartList.innerHTML = "";
  colthesList.forEach((colthes, ind) => {
    sum += colthes.price * colthes.count;
    let contentCss = `
    <div class="row cartContentProdcut align-items-center mb-5 justify-content-center">
      <div class="col-7 col-xl-5 d-flex gap-3 gap-lg-5">
          <img src="${colthes.imgSrc}" class="img-fluid colthesImg" alt="">
          <div class="prodcutNameId d-flex flex-column justify-content-center ">
              <p class="m-0">${colthes.name}</p>
              <p class="text-black-50">#${colthes.id}</p>
          </div>
      </div>
  
      <p class="d-flex align-items-center col-2 col-xl-1">${colthes.color}</p>
      <p class="d-flex align-items-center col-2 col-xl-1">${colthes.size}</p>
      <div class="quantityControl d-flex align-items-center col-2 col-xl-2 gap-3 me-lg-5">
          <span  onclick = "decrease(this , ${ind})" id = "decrease" >-</span>
          <span id="conter" class="fs-6 fw-bold">${colthes.count}</span>
          <span onclick = "increase(this , ${ind})" id = "increase" >+</span>
      </div>
      <p class="fw-bold col-1 col-xl-1 mx-5 d-flex justify-content-start">$${(colthes.price * colthes.count).toFixed(2)}</p>
      <i  onclick = "delColthes(${ind})" class="fa-solid fa-xmark col-1 col-xl-1 cancelImg" style="color: #000000;"></i>
  </div>
    `;
    cartList.innerHTML += contentCss;
  });
  allTotalEl.innerText = sum.toFixed(2);
}
show();
// count the prodecut in the cart
let countOfProduct = document.querySelector(".fa-cart-shopping div.number");
countOfProduct.innerText = colthesList.length;

// del one product from cart
function delColthes(index) {
  colthesList.splice(index, 1);
  localStorage.setItem("colthes", JSON.stringify(colthesList)); 
  countOfProduct.innerText = colthesList.length;
  show();
  window.location.reload();
}

// start Control the amount of clothing

const decreaseBtn = document.querySelector("#decrease"),
  increaseBtn = document.querySelector("#increase"),
  number = document.querySelectorAll("#conter");
// to decrease the number of colthes that you want (in the cart)
function decrease(item, ind) {
  let spanContant = parseInt(number[ind].innerText);
  if (spanContant != 1) {
    spanContant = spanContant - 1;
    number[ind].innerText = spanContant;
    // to save the data in local storage
    if (parseInt(number[ind].innerText) != parseInt(item)) {
      colthesList[parseInt(ind)].count = parseInt(number[ind].innerText);
      localStorage.setItem("colthes", JSON.stringify(colthesList));
    }
  }
  show();
  
}
// to increase the number of colthes that you want (in the cart)
function increase(item, ind) {
  let spanContant = parseInt(number[ind].innerText);
  console.log(spanContant);
  spanContant = spanContant + 1;
  number[ind].innerText = spanContant;
  // to save the data in local storage
  if (parseInt(number[ind].innerText) != parseInt(item)) {
    colthesList[parseInt(ind)].count = parseInt(number[ind].innerText);
    localStorage.setItem("colthes", JSON.stringify(colthesList));
  }
  show();  
}
// end Control the amount of clothing

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
const headerEl = document.querySelector("nav.navbar#header"),
 t1 = document.querySelector(".navbar .container .navbar-brand span"),
 t2 = document.querySelectorAll(".navbar .navbar-nav .nav-link"),
 t3 = document.querySelectorAll(".iconsContainer i"),
 t4 = document.querySelector(".navbar-toggler i"),
 whiteLogo = document.querySelector(".whiteLogo"),
 blackLogo = document.querySelector(".blackLogo");

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
//  for the men btn
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

// back to the previous page

let backToTheLastPage = document.querySelector(".backToTheLastPage");

backToTheLastPage.addEventListener("click", (_) => {
  window.history.back();
});

// preLoad page
const preloader = document.querySelector(".preloader");
if (preloader) {
  window.addEventListener("load", () => {
    preloader.remove();
  });
}