const authKey = "key 942f5d37e43f1d374cce3d22f908b3d4";

// minifig inline
let inline1 = document.getElementById("inline1");

// minifig img urls
let minifigImgs = [];

// minifig names
let minifigNames = [];

// minifig ids
let minifigIds = [];

// minifig set urls
let minifigSets = [];

// fetch miniFigs met user input als param
const getMinifigs = async (number) => {
  let fetchFigs = await fetch(
    `https://rebrickable.com/api/v3/lego/minifigs/?page_size=${number}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: authKey,
      },
    }
  );
  let minifigs = await fetchFigs.json();
  return minifigs.results;
};

// fetch miniFigSets met minifigId uit getMinifigs als param
const getMinifigSets = async (minifigId) => {
  let fetchSets = await fetch(
    `https://rebrickable.com/api/v3/lego/minifigs/${minifigId}/sets/`,
    {
      headers: {
        Accept: "application/json",
        Authorization: authKey,
      },
    }
  );
  let minifigSets = await fetchSets.json();
  return minifigSets.results[0].set_img_url;
};

const changeInlineImages = (inlineId, names, source) => {
  let inline1 = document.getElementById(inlineId);
  inline1.addEventListener("click", () => {
    removeImgBorders();
    let minifigImage = document.getElementById("minifigImage");
    minifigImage.src = inline1.src;
    minifigImage.alt = names[inlineId];
    changesetImage();
    showText(names[inlineId], "minifigName");
  });
  inline1.src = source[inlineId];
  inline1.alt = names[inlineId];
};

// radio button check
const checkInput = () => {
  let radioButtons = document.getElementsByName("customRadio");
  if (radioButtons[0].checked === false) {
    return false;
  } else {
    return true;
  }
};

// belangrijke getElement & initialisatie variabelen
let startSortButton = document.getElementById("startSorting");
let userInput = document.getElementById("userInput");
let rightImage = document.getElementById("setImage1");
let wrongImage = document.getElementById("setImage2");
let counterDown = 0;
let counterUp = 0;
let userScore = document.getElementById("userScore");
userScore = 0;

// tekst vervangen
let showText = (text, id) => {
  let changeText = document.getElementById(id);
  changeText.textContent = text;
};

// verwijder verkeerde/juiste img borders
const removeImgBorders = () => {
  rightImage.style.border = "none";
  wrongImage.style.border = "none";
};

// data uit form halen
const getDataFromForm = (form, data) => {
  let chosenForm = document.getElementById(form);
  let formData = new FormData(chosenForm);
  let chosenData = formData.get(data);
  return chosenData;
};

//  func met array parameter => geeft object uit array terug
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

// maak <li> met a, img & img attributes aan
const createFigImageList = (number) => {
  for (let i = 0; i < number; i++) {
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
    changeInlineImages(i, minifigNames, minifigImgs);
  }
};

// call getMinifigs aan & zet data in arrays
const miniFigDataGetAndPush = async (counterDown) => {
  let minifigs = await getMinifigs(counterDown);
  for (let figData of minifigs) {
    minifigNames.push(figData.name);
    minifigIds.push(figData.set_num);
    minifigImgs.push(figData.set_img_url);
  }
};

// call getMinifigSets & zet data in array
const miniFigSetsGetAndPush = async () => {
  for (let id of minifigIds) {
    let minifigSetsUrl = await getMinifigSets(id);
    minifigSets.push(minifigSetsUrl);
  }
};

// randomiset set images
const changesetImage = () => {
  // haalt setImage element op uit DOM
  let setImage = document.getElementById("setImage1");
  // haalt minifigImage op uit DOM
  let minifigImage = document.getElementById("minifigImage");

  // haalt index van minifigImage uit array
  let numberTwo = minifigImgs.indexOf(minifigImage.src);

  // verandert src attribuut van setImage
  setImage.src = minifigSets[numberTwo];
  let setImageTwo = document.getElementById("setImage2");

  setImageTwo.src = randomizeArray(minifigSets, counterDown);
  while (setImageTwo.src === setImage.src) {
    setImageTwo.src = randomizeArray(minifigSets, counterDown);
  }
};

// laat content zien na fetches & data insertion
const showContent = (counterDown) => {
  showText(counterDown, "counterDown");
  showText(minifigNames[0], "minifigName");
  createFigImageList(counterDown);
  let minifigImage = document.getElementById("minifigImage");
  minifigImage.src = minifigImgs[0];

  // verberg dingen na begin van spel
  $("#sortForm").addClass("d-none");
  $("#gameRules").addClass("d-none");

  // verwijdert de d-none class zodat de content zichtbaar wordt on click
  $("#stopSort").removeClass("d-none");
  $("#inlineSet").removeClass("d-none");
  $("#setSelection").removeClass("d-none");
  $("#minifigAlert").removeClass("d-none");
  $("#minifigImage").removeClass("d-none");
};

const beginGame = () => {
  counterDown = getDataFromForm("sortForm", "sortButton");
  // check of de gebruiker een getal ingeeft met aantal condities
  if (
    isNaN(counterDown) ||
    counterDown === "" ||
    counterDown <= 0 ||
    counterDown % 1 != 0 ||
    counterDown <= 2
  ) {
    return $("#inputErrorModal").modal();
  } else if (counterDown > 20) {
    return $("#tooManyModal").modal();
  } else {
    // verwijder onnodige elementen terwijl game op promises wacht
    $("#formToHideAfterClick").addClass("d-none");
    $("#loadingTime").removeClass("d-none");
    miniFigDataGetAndPush(counterDown).then(() => {
      miniFigSetsGetAndPush()
        .then(() => {
          showContent(counterDown);
        })
        .then(() => {
          changesetImage();
        });
    });
  }
};

// aantal bevestigen onclick button start
startSortButton.addEventListener("click", beginGame);
// aantal bevestigen on ENTER start
userInput.addEventListener("keydown", (event) => {
  if (event.code === "Enter" || event.code === "NumpadEnter") {
    event.preventDefault();
    beginGame();
  }
});

// sort set button
let sortSetButton = document.getElementById("sortSet");
sortSetButton.addEventListener("click", () => {
  removeImgBorders();
  let checkSetInput = checkInput();
  if (checkSetInput) {
    if (counterDown !== 0) {
      userScore++;
      counterDown--;
      counterUp++;
      showText(counterDown, "counterDown");
      showText(counterUp, "counterUp");
      removeInline();

      // bij het bevestigen van een set wordt er een nieuwe minifig ingeladen
      let minifigImage = document.getElementById("minifigImage");
      minifigImage.src = randomizeArray(minifigImgs, counterDown);
      changesetImage();

      showText(
        minifigNames[minifigImgs.indexOf(minifigImage.src)],
        "minifigName"
      );
    }

    if (counterDown === 0) {
      // modal sorting done & refresh page achteraf
      $("#finishSortModal").modal("toggle");
      showText(`Uw score: ${userScore}/${counterUp}`, "userScore");
      $("#finishSortModal").on("hidden.bs.modal", () => {
        location.reload();
      });
    }
  } else {
    rightImage.style.border = "1rem solid limegreen";
    wrongImage.style.border = "1rem solid crimson";
    userScore--;
  }
});

const removeInline = () => {
  let minifigImage = document.getElementById("minifigImage");
  let inlineImage = document.getElementById(
    minifigImgs.indexOf(minifigImage.src)
  );
  let inlineLink = inlineImage.parentNode;
  let listItem = inlineLink.parentNode;
  let unorderedList = listItem.parentNode;
  inlineLink.removeChild(inlineImage);
  listItem.removeChild(inlineLink);
  unorderedList.removeChild(listItem);
  minifigImgs[minifigImgs.indexOf(minifigImage.src)] = undefined;
};
