// minifig Inline
let inline1 = document.getElementById("inline1");

inline1.addEventListener("click", function () {
  let minifigImage = document.getElementById("minifigImage");
  minifigImage.src = "./images/minifigs/brick_suit.jpg";
  let setImage1 = document.getElementById("setImage1");
  let setImage2 = document.getElementById("setImage2");
  setImage1.src = randomizeArray(setlocations);
  setImage2.src = randomizeArray(setlocations);

});

let inline2 = document.getElementById("inline2");

inline2.addEventListener("click", function () {
  let minifigImage = document.getElementById("minifigImage");
  minifigImage.src = "./images/minifigs/burninate.jpg";
  let setImage1 = document.getElementById("setImage1");
  let setImage2 = document.getElementById("setImage2");
  setImage1.src = randomizeArray(setlocations);
  setImage2.src = randomizeArray(setlocations);

});

let inline3 = document.getElementById("inline3");

inline3.addEventListener("click", function () {
  let minifigImage = document.getElementById("minifigImage");
  minifigImage.src = "./images/minifigs/female_programmer.jpg";
  let setimage1= document.getElementById("setimage1")
  setImage1.src=randomizeArray(setlocations);
  setimage2.src=randomizeArray(setlocations);
});

let inline4 = document.getElementById("inline4");

inline4.addEventListener("click", function () {
  let minifigImage = document.getElementById("minifigImage");
  minifigImage.src = "./images/minifigs/lift_bro.jpg";
  let setImage1 = document.getElementById("setImage1");
  let setImage2 = document.getElementById("setImage2");
  setImage1.src = randomizeArray(setlocations);
  setImage2.src = randomizeArray(setlocations);

});

// place text in html elements
const minifiglocations = [
  "./images/minifigs/brick_suit.jpg",
  "./images/minifigs/burninate.jpg",
  "./images/minifigs/female_programmer.jpg",
  "./images/minifigs/lift_bro.jpg",
];

const setlocations = [
  "./images/legosets/creator_set.jpg",
  "./images/legosets/fishing_store_set.jpg",
  "./images/legosets/friends_set.jpeg",
  "./images/legosets/ideas_set.jpg",
];

let showText = function (text, id) {
  let changeText = document.getElementById(id);
  changeText.textContent = text;
  return;
};

// random function
const randomizeArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// get data from form
function getDataFromForm(form, data) {
  let chosenForm = document.getElementById(form);
  let formData = new FormData(chosenForm);
  let chosenData = formData.get(data);
  return chosenData;
}

// start sorting button
let startSortButton = document.getElementById("startSorting");
let counterDown = 0;
let counterUp = 0;

startSortButton.addEventListener("click", function () {
  counterDown = getDataFromForm("sortForm", "sortButton");
  if (isNaN(counterDown) || counterDown === "") {
    alert("Dit is geen geldige waarde. Probeer opnieuw!");
  } else {
    showText(counterDown, "counterDown");
    showText(counterUp, "counterUp");
    let minifigImage = document.getElementById("minifigImage");
    minifigImage.src = randomizeArray(minifiglocations);
    //random = randomizeArray(setlocations);
    let setImage1 = document.getElementById("setImage1");
    let setImage2 = document.getElementById("setImage2");
    setImage1.src = randomizeArray(setlocations);
    setImage2.src = randomizeArray(setlocations);
    $("#sortForm").addClass("d-none");
    $("#stopSort").removeClass("d-none");
    $("#inlineSet").removeClass("d-none");
  }
});

// sort set button
let sortSetButton = document.getElementById("sortSet");
sortSetButton.addEventListener("click", function () {
  if (counterDown != 0) {
    counterDown--;
    counterUp++;
    showText(counterDown, "counterDown");
    showText(counterUp, "counterUp");
    if (counterDown === 0) {
      alert("U bent klaar met sorteren!");
      location.reload();
    } else {
      let random = randomizeArray(minifiglocations);
      console.log(random);
      let minifigImage = document.getElementById("minifigImage");
      minifigImage.src = randomizeArray(minifiglocations);
      //minifiglocations.splice(minifiglocations[random]);
      let setImage1 = document.getElementById("setImage1");
      let setImage2 = document.getElementById("setImage2");
      setImage1.src = randomizeArray(setlocations);
      setImage2.src = randomizeArray(setlocations);
      }
  }
});
