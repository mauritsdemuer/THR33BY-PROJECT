// minifig Inline: hier wordt het element geïdentificeerd en wordt er onclick deze minifig getoond en de bijhorende sets (voorlopig met een random functie, later met API call)
let inline1 = document.getElementById("inline1");

// voorlopige minifiglocaties
let minifiglocations = [];

//array voor minifignames
let minifigNames = [];

//array met minifigIDs voor set call
let minifigIds = [];

// aray met setSrc
let setsSrc = [];

let promise1;
let promise2;

// voorlopige setlocaties (pre API)
const setlocations = [
  "./images/legosets/creator_set.jpg",
  "./images/legosets/fishing_store_set.jpg",
  "./images/legosets/friends_set.jpeg",
  "./images/legosets/ideas_set.jpg",
];

const apiKey = "?key=3ef36135e7fda4370a11fd6191fef2af";
// param number is user input over aantal te ordenen minifigs



// fetch miniFigs
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

// fetch miniFigsSets
const getMinifigsSets = async (minifigId) => {
  try {
    let result = await fetch(
      `https://rebrickable.com/api/v3/lego/minifigs/${minifigId}/sets/${apiKey}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    let response = await result.json();
    return response.results[0].set_img_url;
  }
  catch (exc) {
    console.log(exc);
  }
};



const changeInlineImages = (inlineId, names, source) => {
  let inline1 = document.getElementById(inlineId);
  inline1.addEventListener("click", () => {
    let minifigImage = document.getElementById("minifigImage");
    minifigImage.src = inline1.src;
    minifigImage.alt = names[inlineId];
    showText(names[inlineId], "minifigName");
  });
  inline1.src = source[inlineId];
  inline1.alt = names[inlineId];
let setimage = document.getElementById("setImage1");
setimage.src = setsSrc[inlineId];

};


// functie om tekst te vervangen
let showText = (text, id) => {
  let changeText = document.getElementById(id);
  changeText.textContent = text;
  return;
};

// random function met een array als input die dan meteen een object uit dat array teruggeeft
const randomizeArray = (array, counter) => {
  let response = array[Math.floor(Math.random() * array.length)];
  if (counter === 0) {
    response = "images/legomasters_large_withlogo.png";
  } else {
    while (response === undefined) {
      response = array[Math.floor(Math.random() * array.length)];
    }
  }

  return response;
};

// Functie om data van formulier op te halen
const getDataFromForm = (form, data) => {
  let chosenForm = document.getElementById(form);
  let formData = new FormData(chosenForm);
  let chosenData = formData.get(data);
  return chosenData;
};

// initialisatie van de startsortbutton en bijhorende parameters, dit moest buiten de functie omdat de counter buiten deze eventlistener gebruikt moet worden
let startSortButton = document.getElementById("startSorting");
let counterDown = 0;
let counterUp = 0;

// maak <li> met a, img & img attributes aan
const createFigImageList = (number) => {
  for(let i=0; i<number; i++){
    let ul = document.getElementById("inlineSet");
    let li = document.createElement("li");
    let a = document.createElement("a");
    let image = document.createElement("img");
    image.setAttribute("class", "minifigInline");
    image.setAttribute("src", "");
    image.setAttribute("id", i);
    image.setAttribute("alt", "");
  
    // alles aan elkaar hangen
    ul.appendChild(li);
    li.appendChild(a);
    a.appendChild(image);
    changeInlineImages(i,minifigNames,minifiglocations);
  }

};
const fillArrayWithImgURL = (array, number, results) => {
  array[number] = results[number].set_img_url;
};
const fillArrayWithNames = (array, number, results) => {
  array[number] = results[number].name;
};

startSortButton.addEventListener("click",async () => 
{
  counterDown = getDataFromForm("sortForm", "sortButton");
  //check of de gebruiker een nummer ingeeft
  if (
    isNaN(counterDown) ||
    counterDown === "" ||
    counterDown <= 0 ||
    counterDown % 1 != 0
  ) 
  {
    $("#inputErrorModal").modal();
  } else if (counterDown > 1000) 
  {
    $("#tooManyModal").modal();
  } else 
  {
    //teller wordt aangemaakt en geïnitialiseerd volgens input van de gebruiker
showText(counterDown, "counterDown");
    await getMinifigs(counterDown).then((minifigdata)=>{
      minifigdata.forEach(minifig => {
        minifiglocations.push(minifig.set_img_url);
        minifigIds.push(minifig.set_num);
        minifigNames.push(minifig.name);
      });
    }).then(()=>{
      minifigIds.forEach((minifigId)=>{
        getMinifigsSets(minifigId).then((setSource)=>{
          setsSrc.push(setSource);
        })
      })
    }).then(()=>{
      createFigImageList(counterDown);
    })
    /*let setImage1 = document.getElementById("setImage1");
    let setImage2 = document.getElementById("setImage2");
    setImage1.src = randomizeArray(setlocations);
    setImage2.src = randomizeArray(setlocations);*/
  
    //verbergt het initiele sorteerformulier & spelregels tot er bevestigd wordt
    $("#sortForm").addClass("d-none");
    $("#gameRules").addClass("d-none");
  
    //verwijdert de d-none class zodat de content zichtbaar wordt on click
    $("#stopSort").removeClass("d-none");
    $("#inlineSet").removeClass("d-none");
    $("#setSelection").removeClass("d-none");
    $("#minifigAlert").removeClass("d-none");
    $("#minifigImage").removeClass("d-none");
  };

   
  
  


  // creëer x <li> adhv hoeveelheid gegeven user input




  //geeft een random waarde aan de set images vanuit een arr

// sort set button
let sortSetButton = document.getElementById("sortSet");
sortSetButton.addEventListener("click", function () {
  // eerste check of de counter niet nul is, de counter wordt aangepast bij het klikken en de tekst ook meteen vervangen
  if (counterDown !== 0) {
    counterDown--;
    counterUp++;
    showText(counterDown, "counterDown");
    showText(counterUp, "counterUp");
    removeInline();

    // bij het bevestigen van een set wordt er een nieuwe minifig ingeladen
    let minifigImage = document.getElementById("minifigImage");
    minifigImage.src = randomizeArray(minifiglocations, counterDown);

    // setimage wordt voorlopig nog random geselecteerd
    /*  let setImage1 = document.getElementById("setImage1");
      let setImage2 = document.getElementById("setImage2");
      setImage1.src = randomizeArray(setlocations, counterDown);
      setImage2.src = randomizeArray(setlocations, counterDown);*/
    showText(
      minifigNames[minifiglocations.indexOf(minifigImage.src)],
      "minifigName"
    );
  }
  if (counterDown === 0) {
    // modal wanneer de gebruiker alle minifigs heeft gesorteerd gevolgd door een refresh
    $("#finishSortModal").modal("toggle");
  }
});

const removeInline = () => {
  let minifigImage = document.getElementById("minifigImage");
  let inlineImage = document.getElementById(
    minifiglocations.indexOf(minifigImage.src)
  );
  let inlineLink = inlineImage.parentNode;
  let listItem = inlineLink.parentNode;
  let unorderedList = listItem.parentNode;
  inlineLink.removeChild(inlineImage);
  listItem.removeChild(inlineLink);
  unorderedList.removeChild(listItem);
  minifiglocations[minifiglocations.indexOf(minifigImage.src)] = undefined;
};});
