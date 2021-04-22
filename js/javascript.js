const apiKey = "?key=3ef36135e7fda4370a11fd6191fef2af";
//param number is user input over aantal te ordenen minifigs
const getMinifigs = async (number) => {
  let result = await fetch(
    `https://rebrickable.com/api/v3/lego/minifigs/${apiKey}&page_size=${number}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  let response = await result.json();

  return response.results;
};

const changeInlineImages = (inlineId, response) => {
  let inline1 = document.getElementById(inlineId);
  inline1.addEventListener("click", () => {
    let minifigImage = document.getElementById("minifigImage");
    minifigImage.src = inline1.src;
    minifigImage.alt = response.name;
    showText(response.name, "minifigName");
  });
  inline1.src = response.set_img_url;
  inline1.alt = response.name;
};

// minifig Inline: hier wordt het element geïdentificeerd en wordt er onclick deze minifig getoond en de bijhorende sets (voorlopig met een random functie, later met API call)
let inline1 = document.getElementById("inline1");

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

// maak <li> met a, img & img attributes aan
const createFigImageList = (id) => {
  let ul = document.getElementById("inlineSet");
  let li = document.createElement("li");
  let a = document.createElement("a");
  let image = document.createElement("img");
  image.setAttribute("class", "minifigInline");
  image.setAttribute("src", "");
  image.setAttribute("id", id);
  image.setAttribute("alt", "");

  // alles aan elkaar hangen
  ul.appendChild(li);
  li.appendChild(a);
  a.appendChild(image);
};

startSortButton.addEventListener("click", () => {
  counterDown = getDataFromForm("sortForm", "sortButton");
  //check of de gebruiker een nummer ingeeft
  if (isNaN(counterDown) || counterDown === "") {
    alert("Dit is geen geldige waarde. Probeer opnieuw!");
  } else {
    //teller wordt aangemaakt en geïnitialiseerd volgens input van de gebruiker
    showText(counterDown, "counterDown");
    showText(counterUp, "counterUp");

    // creëer x <li> adhv hoeveelheid gegeven user input
    for (let i = 0; i < counterDown; i++) {
      getMinifigs(counterDown).then((results) => {
        createFigImageList(i);
        changeInlineImages(i, results[i]);
      });
    }

    getMinifigs(counterDown).then((results) => {
    let defImage = document.getElementById("minifigImage");
    defImage.src = results[0].set_img_url;
    showText(results[0].name, "minifigName");
    });

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
