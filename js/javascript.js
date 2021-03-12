// place text in html elements
let showText = function(text, id) {
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
startSortButton.addEventListener("click", function() {
    counterDown = getDataFromForm("sortForm", "sortButton");
    if (isNaN(counterDown) || counterDown === "") {
        alert("Dit is geen geldige waarde. Probeer opnieuw!");
    } else {
        showText(counterDown, "counterDown");
        showText(counterUp, "counterUp");
    }
});

// sort set button
let sortSetButton = document.getElementById("sortSet");
sortSetButton.addEventListener("click", function() {
    counterDown--;
    counterUp++;
    if (counterDown < 0) { alert("U bent klaar met sorteren!") } else {

        showText(counterDown, "counterDown");
        showText(counterUp, "counterUp");
    }

});