// place text in html elements
const minifiglocations = ["./images/minifigs/brick_suit.jpg", "./images/minifigs/burninate.jpg", "./images/mninifigs/female_programmer.jpg", "./images/minifigs/lift_bro.jpg"];
const setlocations = ["./images/legosets/creator_set.jpg", "./images/legosets/fishing_store_set.jpg", "./images/legosets/friends_set.jpeg", "./images/legosets/ideas_set.jpg"];
let showText = function (text, id) {
let changeText = document.getElementById(id);
  changeText.textContent = text;
  return;
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
    let random =  Math.floor(Math.random(0*minifiglocations.length));
    let minifigImage = document.getElementById("minifigImage");
    minifigImage.src = minifiglocations[random];
    minifiglocations.splice(minifiglocations[random]);
    random =  Math.floor(Math.random(0*setlocations.length));
    let random2 =  Math.floor(Math.random(0*setlocations.length));
    if(random2 === random){
      random2++;
    }
    let setImage1 = document.getElementById("setImage1");
    let setImage2 = document.getElementById("setImage2");
    setImage1.src = setlocations[random];
    setImage2.src = setlocations[random2];
    $("#sortForm").addClass("d-none");
    $("#stopSort").removeClass("d-none");
  }
});

// sort set button
let sortSetButton = document.getElementById("sortSet");
sortSetButton.addEventListener("click", function () {
  counterDown--;
  counterUp++;
  if (counterDown < 0) {
    alert("U bent klaar met sorteren!");
    location.reload();
  } else {
    let random =  Math.floor(Math.random(0*minifiglocations.length));
    let minifigImage = document.getElementById("minifigImage");
    minifigImage.src = minifiglocations[random];
    minifiglocations.splice(minifiglocations[random]);
    random =  Math.floor(Math.random(0*setlocations.length));
    let random2 =  Math.floor(Math.random(0*setlocations.length));
    if(random2 === random){
      random2++;
    }
    let setImage1 = document.getElementById("setImage1");
    let setImage2 = document.getElementById("setImage2");
    setImage1.src = setlocations[random];
    setImage2.src = setlocations[random2];
    
    showText(counterDown, "counterDown");
    showText(counterUp, "counterUp");
  }
});
