// place text in html elements
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

// sorting button
let startSortButton = document.getElementById("startSorting");
let counter = 0;
startSortButton.addEventListener("click", function () {
  counter = getDataFromForm("sortForm", "sortButton");
  if (isNaN(counter)) {
    alert("Dit is geen geldige waaride. Probeer opnieuw!");
  } else {
    showText(counter, "counter");
  }
});
