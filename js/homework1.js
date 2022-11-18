function isNotNumber(event) {
  var charCode = evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && !evt.metaKey) {
    return true;
  }
  return false;
}

function isNumber(evt) {
  var charCode = evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && !evt.metaKey) {
    return false;
  }
  return true;
}

function handleChange(event) {
  var isIE = false;

  var ele = document.getElementById("social-security");
  var key = extractNumber(ele.value);
  var isBackSpace = false,
    isDelete = false;
  var caretPosition = "";
  if (isIE) {
    caretPosition = event.srcElement.selectionStart;
  } else {
    caretPosition = event.target.selectionStart;
  }
  if (event.inputType === "deleteContentBackward") {
    isBackSpace = true;
  }
  if (event.inputType === "deleteContentForward") {
    isDelete = true;
  }
  if (!(isBackSpace && key.length == 3) && key.length > 3) {
    key = key.substring(0, 3) + "-" + key.substring(3, key.length);
  }
  if (!(isBackSpace && key.length == 7) && key.length > 6) {
    key = key.substring(0, 6) + "-" + key.substring(6, key.length);
  }
  if (key.length > 11) {
    key = key.substring(0, 11);
  }
  document.getElementById("social-security").value = key;
  if (isBackSpace || isDelete) {
    ele.setSelectionRange(caretPosition, caretPosition);
  }
}

function extractNumber(text) {
  var txt1 = "";
  for (var i = 0; i < text.length; i++) {
    if (text.charAt(i) >= "0" && text.charAt(i) <= "9") txt1 += text.charAt(i);
  }
  return txt1;
}

// salary ranges

const rangeInput = document.querySelectorAll(".range-input input"),
  priceInput = document.querySelectorAll(".price-input input"),
  range = document.querySelector(".slider .progress");
let priceGap = 20000;

priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = parseInt(priceInput[0].value),
      maxPrice = parseInt(priceInput[1].value);

    if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minPrice;
        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
  });
});

const displayTime = document.querySelector(".display-time");
// Time
function showTime() {
  let time = new Date();
  displayTime.innerText = time.toLocaleTimeString("en-US", { hour12: false });
  setTimeout(showTime, 1000);
}

showTime();

// Date
function updateDate() {
  let today = new Date();

  // return number
  let dayName = today.getDay(),
    dayNum = today.getDate(),
    month = today.getMonth(),
    year = today.getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // value -> ID of the html element
  const IDCollection = ["day", "daynum", "month", "year"];
  // return value array with number as a index
  const val = [dayWeek[dayName], dayNum, months[month], year];
  for (let i = 0; i < IDCollection.length; i++) {
    document.getElementById(IDCollection[i]).firstChild.nodeValue = val[i];
  }
}

updateDate();

function blockSpecialChar(e) {
  var k = e.keyCode;
  return (
    (k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || (k >= 48 && k <= 57)
  );
}
