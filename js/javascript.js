const authKey = "key 3ef36135e7fda4370a11fd6191fef2af";

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

// parameter number is user input
// fetch miniFigs
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

// fetch miniFigSets
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
    let minifigImage = document.getElementById("minifigImage");
    minifigImage.src = inline1.src;
    minifigImage.alt = names[inlineId];
    showText(names[inlineId], "minifigName");
  });
  inline1.src = source[inlineId];
  inline1.alt = names[inlineId];
};

// initialisatie van de startSortButton
let startSortButton = document.getElementById("startSorting");
let counterDown = 0;
let counterUp = 0;

// tekst vervangen
let showText = (text, id) => {
  let changeText = document.getElementById(id);
  changeText.textContent = text;
  return;
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
  minifigs.forEach((fig) => {
    minifigNames.push(fig.name);
    minifigIds.push(fig.set_num);
    minifigImgs.push(fig.set_img_url);
  });
};

// call getMinifigSets & zet data in array
const miniFigSetsGetAndPush = () => {
  minifigIds.forEach((id) => {
    getMinifigSets(id).then((setUrl) => {
      setTimeout(() => {
        minifigSets.push(setUrl);
      }, 100);
    });
  });
};

// laat content zien na fetches & data insertion
const showContent = (counterDown) => {
  showText(counterDown, "counterDown");
  createFigImageList(counterDown);

  // verberg dingen na begin van spel
  $("#sortForm").addClass("d-none");
  $("#gameRules").addClass("d-none");

  // verwijdert de d-none class zodat de content zichtbaar wordt on click
  $("#stopSort").removeClass("d-none");
  $("#inlineSet").removeClass("d-none");
  $("#setSelection").removeClass("d-none");
  $("#minifigAlert").removeClass("d-none");
  $("#minifigImage").removeClass("d-none");

  let setImage = document.getElementById("setImage1");
  setImage.src = minifigSets[0];
  let setImage2 = document.getElementById("setImage2");
  setImage2.src = minifigSets[1];
};

// aantal bevestigen begint
startSortButton.addEventListener("click", async () => {
  counterDown = getDataFromForm("sortForm", "sortButton");
  // check of de gebruiker een getal ingeeft met aantal condities
  if (
    isNaN(counterDown) ||
    counterDown === "" ||
    counterDown <= 0 ||
    counterDown % 1 != 0
  ) {
    return $("#inputErrorModal").modal();
  } else if (counterDown > 20) {
    return $("#tooManyModal").modal();
  } else {
    await miniFigDataGetAndPush(counterDown);
    miniFigSetsGetAndPush();
    setTimeout(showContent, 300, counterDown);
  }
});

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
    minifigImage.src = randomizeArray(minifigImgs, counterDown);

    // setimage wordt voorlopig nog random geselecteerd
    /*  let setImage1 = document.getElementById("setImage1");
      let setImage2 = document.getElementById("setImage2");
      setImage1.src = randomizeArray(setlocations, counterDown);
      setImage2.src = randomizeArray(setlocations, counterDown);*/

    showText(
      minifigNames[minifigImgs.indexOf(minifigImage.src)],
      "minifigName"
    );
  }
  if (counterDown === 0) {
    // modal sorting done & refresh page achteraf
    $("#finishSortModal").modal("toggle");
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
