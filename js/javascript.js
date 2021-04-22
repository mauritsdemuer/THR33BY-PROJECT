const fetch = require("node-fetch");

const apiKey = "?key=3ef36135e7fda4370a11fd6191fef2af";
//param number is user input over aantal te ordenen minifigs
const getMinifigs = async(number) =>{
let result = await fetch(`https://rebrickable.com/api/v3/lego/minifigs/${apiKey}&page_size=${number}`,{
  headers: {
    'Accept': 'application/json'
  }
});
let response = await result.json();
console.log(response.results[0].set_img_url);
}

getMinifigs(4);





/*
// minifig Inline: hier wordt het element geïdentificeerd en wordt er onclick deze minifig getoond en de bijhorende sets (voorlopig met een random functie, later met API call)
let inline1 = document.getElementById("inline1");

inline1.addEventListener("click", function () {
  let minifigImage = document.getElementById("minifigImage");
  minifigImage.src = "./images/minifigs/brick_suit.png";
  let setImage1 = document.getElementById("setImage1");
  let setImage2 = document.getElementById("setImage2");
  setImage1.src = randomizeArray(setlocations);
  setImage2.src = randomizeArray(setlocations);
});

let inline2 = document.getElementById("inline2");

inline2.addEventListener("click", function () {
  let minifigImage = document.getElementById("minifigImage");
  minifigImage.src = "./images/minifigs/dragon_suit.png";
  let setImage1 = document.getElementById("setImage1");
  let setImage2 = document.getElementById("setImage2");
  setImage1.src = randomizeArray(setlocations);
  setImage2.src = randomizeArray(setlocations);
});

let inline3 = document.getElementById("inline3");

inline3.addEventListener("click", function () {
  let minifigImage = document.getElementById("minifigImage");
  minifigImage.src = "./images/minifigs/female_programmer.png";
  let setimage1 = document.getElementById("setimage1");
  setImage1.src = randomizeArray(setlocations);
  setimage2.src = randomizeArray(setlocations);
});

let inline4 = document.getElementById("inline4");

inline4.addEventListener("click", function () {
  let minifigImage = document.getElementById("minifigImage");
  minifigImage.src = "./images/minifigs/lift_bro.png";
  let setImage1 = document.getElementById("setImage1");
  let setImage2 = document.getElementById("setImage2");
  setImage1.src = randomizeArray(setlocations);
  setImage2.src = randomizeArray(setlocations);
});

// voorlopige minifiglocaties (pre API)
const minifiglocations = [
  "./images/minifigs/brick_suit.png",
  "./images/minifigs/dragon_suit.png",
  "./images/minifigs/female_programmer.png",
  "./images/minifigs/lift_bro.png",
];

// voorlopige setlocaties (pre API)
const setlocations = [
  "./images/legosets/creator_set.jpg",
  "./images/legosets/fishing_store_set.jpg",
  "./images/legosets/friends_set.jpeg",
  "./images/legosets/ideas_set.jpg",
];

// functie om tekst te vervangen
let showText = (text, id) => {
  let changeText = document.getElementById(id);
  changeText.textContent = text;
  return;
};

// random function met een array als input die dan meteen een object uit dat array teruggeeft
const randomizeArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Functie om data van formulier op te halen
const getDataFromForm = (form, data) => {
  let chosenForm = document.getElementById(form);
  let formData = new FormData(chosenForm);
  let chosenData = formData.get(data);
  return chosenData;
};

// initialisatie van de startsortbutton en bijhorende parameters, dit moest buiten de functie omdat de counter buiten deze eventlistener gebruikt moet worden.
let startSortButton = document.getElementById("startSorting");
let counterDown = 0;
let counterUp = 0;

startSortButton.addEventListener("click", () => {
  counterDown = getDataFromForm("sortForm", "sortButton");
  //check of de gebruiker een nummer ingeeft
  if (isNaN(counterDown) || counterDown === "") {
    alert("Dit is geen geldige waarde. Probeer opnieuw!");
  } else {
    //teller wordt aangemaakt en geïnitialiseerd volgens input van de gebruiker
    showText(counterDown, "counterDown");
    showText(counterUp, "counterUp");

    //minifig image wordt random ingeladen vanuit een array
    let minifigImage = document.getElementById("minifigImage");
    minifigImage.src = randomizeArray(minifiglocations);

    //geeft een random waarde aan de set images vanuit een array
    let setImage1 = document.getElementById("setImage1");
    let setImage2 = document.getElementById("setImage2");
    setImage1.src = randomizeArray(setlocations);
    setImage2.src = randomizeArray(setlocations);

    //verbergt het initiele sorteerformulier tot er gerefresht wordt
    $("#sortForm").addClass("d-none");

    //verwijdert de d-none class zodat de content zichtbaar wordt on click.
    $("#stopSort").removeClass("d-none");
    $("#inlineSet").removeClass("d-none");
    $("#setSelection").removeClass("d-none");
  }
});

// sort set button
let sortSetButton = document.getElementById("sortSet");
sortSetButton.addEventListener("click", function () {
  // eerste check of de counter niet nul is, de counter wordt aangepast bij het klikken en de tekst ook meteen vervangen.
  if (counterDown !== 0) {
    counterDown--;
    counterUp++;
    showText(counterDown, "counterDown");
    showText(counterUp, "counterUp");

    // bij het bevestigen van een set wordt er een nieuwe minifig ingeladen
    let minifigImage = document.getElementById("minifigImage");
    minifigImage.src = randomizeArray(minifiglocations);

    // setimage wordt voorlopig nog random geselecteerd
    let setImage1 = document.getElementById("setImage1");
    let setImage2 = document.getElementById("setImage2");
    setImage1.src = randomizeArray(setlocations);
    setImage2.src = randomizeArray(setlocations);
  }
  if (counterDown === 0) {
    // modal wanneer de gebruiker alle minifigs heeft gesorteerd gevolgd door een refresh.
    $("#finishSortModal").modal("toggle");
  }
});
*/