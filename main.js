let coursesValue = document.querySelector(".left .course");
let priceValue = document.querySelector(".left .price");
let quantityValue = document.querySelector(".left .quantity");
let descriptionValue = document.querySelector(".left .description");
let btnAdd = document.querySelector(".left .add");
let btnDeleteAll = document.querySelector(".left .deleteAll");
let btnClear = document.querySelector(".left .clear");
let searchValue = document.querySelector(".right .search");
let buttonSearch = document.querySelector(".container .right .divTwo div span");
let sunButton = document.querySelector(".top div .sun");
let lightButton = document.querySelector(".top div .light");

let arrayValue = [];

if (localStorage.getItem("cart")) {
  arrayValue = JSON.parse(localStorage.getItem("cart"));
}

getDataFromLocalStorage();

/* ------ Button Add ------------ */
btnAdd.onclick = () => {
  if (document.querySelectorAll(".left input").value !== "") {
    getData(
      coursesValue.value,
      priceValue.value,
      quantityValue.value,
      descriptionValue.value
    );
    coursesValue.value = "";
    priceValue.value = "";
    quantityValue.value = "";
    descriptionValue.value = "";
  }


};

function getData(dataOne, dataTwo, dataThree, dataFour) {
  data = {
    courses: dataOne,
    price: dataTwo,
    quantity: dataThree,
    description: dataFour,
    id: Date.now(),
  };
  arrayValue.push(data);
  createElementData(arrayValue);
  addDataToLocalStorage(arrayValue);
}

function createElementData(x) {
  document.querySelector("table tbody").innerHTML = "";
  for (let i = 0; i < arrayValue.length; i++) {
    let tr = document.createElement("tr");
    tr.setAttribute("data-id", x[i].id);
    tr.ClassName = "one";

    let tdOne = document.createElement("td");
    let tdOneText = document.createTextNode(`${i + 1}`);
    tdOne.appendChild(tdOneText);

    let tdTwo = document.createElement("td");
    let tdTwoText = document.createTextNode(x[i].courses);
    tdTwo.appendChild(tdTwoText);

    let tdThree = document.createElement("td");
    let tdThreeText = document.createTextNode(x[i].price);
    tdThree.appendChild(tdThreeText);

    let tdFour = document.createElement("td");
    let tdFourText = document.createTextNode(x[i].quantity);
    tdFour.appendChild(tdFourText);

    let tdFive = document.createElement("td");
    let tdFiveText = document.createTextNode(x[i].description);
    tdFive.appendChild(tdFiveText);

    let tdSix = document.createElement("td");
    let tsSixSpan = document.createElement("span");
    tsSixSpan.classList.add("update");
    let tsSixSpanText = document.createTextNode("Update");
    tsSixSpan.appendChild(tsSixSpanText);
    tdSix.appendChild(tsSixSpan);

    let tdSeven = document.createElement("td");
    let tsSevenSpan = document.createElement("span");
    tsSevenSpan.classList.add("delete");
    let tsSevenSpanText = document.createTextNode("Delete");
    tsSevenSpan.appendChild(tsSevenSpanText);
    tdSeven.appendChild(tsSevenSpan);

    tr.appendChild(tdOne);
    tr.appendChild(tdTwo);
    tr.appendChild(tdThree);
    tr.appendChild(tdFour);
    tr.appendChild(tdFive);
    tr.appendChild(tdSix);
    tr.appendChild(tdSeven);

    document.querySelector("table tbody").appendChild(tr);

    document.querySelector(".right table tfoot .sum").innerHTML = `${i + 1}`;
  }
}

function addDataToLocalStorage(x) {
  localStorage.setItem("crud", JSON.stringify(x));
}

function getDataFromLocalStorage() {
  arrayValue = JSON.parse(localStorage.getItem("crud"));
  if (arrayValue) {
    createElementData(arrayValue);
    console.log(arrayValue);
  }
}

/* ------- clear input ------------ */

btnClear.onclick = function () {
  coursesValue.value = "";
  priceValue.value = "";
  quantityValue.value = "";
  descriptionValue.value = "";
};

/* -------- Clear All -------------- */
btnDeleteAll.onclick = function () {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(() => {
    arrayValue = [];

    localStorage.setItem("crud", JSON.stringify(arrayValue));

    setTimeout(() => {
      window.location.reload();
    }, 2000);
    setTimeout(() => {
      Swal.fire("Deleted!", "all data has been deleted", "success");
    }, 0);
  });
};

/* -------- Delete item ------------- */
document
  .querySelector(".right table tbody")
  .addEventListener("click", function (e) {
    if (e.target.className == "delete") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(() => {
        if (e.target.parentNode.parentNode.getAttribute("data-id")) {
          arrayValue = arrayValue.filter(
            (data) =>
              e.target.parentNode.parentNode.getAttribute("data-id") != data.id
          );
          localStorage.setItem("crud", JSON.stringify(arrayValue));
          e.target.parentNode.parentNode.remove();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
    }
  });

/* --------- search --------------- */

searchValue.addEventListener("input", (e) => {
  const value = e.target.value;
  for (let i = 0; i < arrayValue.length; i++) {
    if (arrayValue[i].courses === value) {
      arrayValue = arrayValue.filter((e) => {
        return e.courses.toLowerCase().includes(value.toLowerCase());
      });

      searchValue.onkeyup = function () {
        createElementData(arrayValue);
      };
    }
  }

  searchValue.onkeyup = function () {
    return createElementData(arrayValue);
  };

  buttonSearch.addEventListener("click", (e) => {
    window.location.reload();
  });
});

/* ----------- update ----------- */

document
  .querySelector(".right table tbody")
  .addEventListener("click", function (e) {
    if (e.target.className == "update") {
      if (e.target.parentNode.parentNode.getAttribute("data-id")) {
        for (let i = 0; i < arrayValue.length; i++) {
          if (
            arrayValue[i].id ==
            e.target.parentNode.parentNode.getAttribute("data-id")
          ) {
            coursesValue.value = arrayValue[i].courses;
            priceValue.value = arrayValue[i].price;
            quantityValue.value = arrayValue[i].quantity;
            descriptionValue.value = arrayValue[i].description;

            if (
              arrayValue[i].id ==
              e.target.parentNode.parentNode.getAttribute("data-id")
            ) {
              arrayValue.splice(i, 1);
            }

            btnAdd.onclick = () => {
              getData(
                coursesValue.value,
                priceValue.value,
                quantityValue.value,
                descriptionValue.value
              );

              coursesValue.value = "";
              priceValue.value = "";
              quantityValue.value = "";
              descriptionValue.value = "";

              window.location.reload();
            };
          }
        }
      }
    }
  });

/* ----------- sun + light ------------ */
/* lightButton.addEventListener("click", (e) => {
  e.target.classList.add("active");
  svgOne.fill = "#FF8E28";
  svgTwo.fill = "#2e77ae";
  colorCrud.style.backgroundColor = "#E0eaf5";
});

sunButton.addEventListener("click", (e) => {
  e.stopPropagation();
  e.target.classList.add("active");
  svgOne.fill = "#e73c37";
  svgTwo.sill = "#312c38";
  colorCrud.style.backgroundColor = "#fbf1e4";
}); */
let svgOne = document.querySelector("svg .one");
let svgTwo = document.querySelector("svg .two");
let colorCrud = document.querySelector(".Curd");

let getColorLocalStorage = localStorage.getItem("de");

if (getColorLocalStorage !== null) {
  document.querySelectorAll(".top .active").forEach((button) => {
    button.classList.remove("active");
  });

  if (getColorLocalStorage === "true") {
    document.querySelector(".top div .sun").classList.add("active");
    svgOne.setAttribute("fill", "#FF8E28");
    svgTwo.setAttribute("fill", "#2e77ae");
    colorCrud.style.backgroundColor = "#E0eaf5";
  } else {
    document.querySelector(".top div .light").classList.add("active");
    svgOne.setAttribute("fill", "#e73c37");
    svgTwo.setAttribute("fill", "#312c38");
    colorCrud.style.backgroundColor = "#fbf1e4";
  }
}

document.querySelectorAll(".top div button").forEach((button) => {
  button.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.value === "yes") {
      e.preventDefault();
      svgOne.setAttribute("fill", "#FF8E28");
      svgTwo.setAttribute("fill", "#2e77ae");
      colorCrud.style.backgroundColor = "#E0eaf5";
      localStorage.setItem("de", JSON.stringify(true));
    } else {
      e.preventDefault();
      svgOne.setAttribute("fill", "#e73c37");
      svgTwo.setAttribute("fill", "#312c38");
      colorCrud.style.backgroundColor = "#fbf1e4";
      localStorage.setItem("de", JSON.stringify(false));
    }
  });
});

function handleActive(ele) {
  ele.target.parentElement.querySelectorAll(".active").forEach((button) => {
    button.classList.remove("active");
  });
  ele.target.classList.add("active");
}

/* ----------- check input value ----------- */
