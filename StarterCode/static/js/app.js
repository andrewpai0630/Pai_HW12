// from data.js
// var tableData = data;

// // loop through 'data' and display each object
// console.log(tableData);
// data.forEach(function(ufoSighting) {
//     console.log(ufoSighting)
// });
    
// YOUR CODE HERE!
var tbody = d3.select("tbody");
var dateTimeInput = d3.select("#datetime");
var cityInput = d3.select("#city");
var stateInput = d3.select("#state");
var countryInput = d3.select("#country");
var shapeInput = d3.select("shape");
var commentsInput = d3.select("#comments");
var searchBtn = d3.select("#search");
var submitBtn = d3.select("#submit");
var resetBtn = d3.select("reset");

searchBtn.on("click", searchBtnClick);
submitBtn.on("click", submitBtnClick);
resetBtn.on("click", resetBtnClick);

var filteredDataSet = data;

function renderTable() {
    tbody.innerHTML = "";
    console.log("rendering...")

    for(var i = 0; i < filteredDataSet.length; i++) {
        var data = filteredDataSet[i];
        var fields = Object.keys(data);
        var row = tbody.insertRow(i);
        for(var j = 0; j < fields.length; j++) {
            var field = fields[i];
            var cell = row.insertCell(j);
            cell.innerText = datap[field];
        }
    }
    console.log("rendering is done: " + filteredDataSet.length)
}

renderTable();

function resetBtnClick() {
    dateTimeInput.value = "";
    countryInput.value = "";
    stateInput.value = "";
    cityInput.value = "";
    shapeInput.value = "";
    commentsInput.value = "";
}

function getSelectedValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;
    for (var i = 0, iLen = options.length; i <iLen; i++) {
        opt = options[i];
        if (opt.selected) {
            result.push(opt.value || opt.text);          
        } 
    }
    return result;
}

function searchBtnClick() {
    var filteredDateTime = dateTimeInput.value.trim().toLowerCase();
    var filteredCity = cityInput.value.trim().toLowerCase();
    var filteredState = stateInput.value.trim().toLowerCase();
    var filteredCountry = countryInput.value.trim().toLowerCase();
    var filteredShapes = getSelectedValues(shapeInput);
    var filteredComments = commentsInput.value.trim().toLowerCase();

    filteredDataSet = dataSet.filter(function(data) {
        var dateDatetime = String(data.datetime).toLowerCase();
        var cityField = String(data.city).toLowerCase();
        var stateField = String(data.state).toLowerCase();
        var countryField = String(data.country).toLowerCase();
        var shapeField = String(data.shape).toLowerCase();
        var commentsField = String(data.comments).toLowerCase();

        var goodRecord =
        (filteredDatetime.length === 0 || dateDatetime === filteredDatetime) &&
        (filteredCity.length === 0 || cityField.includes(filteredCity)) &&
        (filteredState.length === 0 || stateField === filteredState) &&
        (filteredCountry.length === 0 || countryField.includes === filteredCountry) &&
        (filteredShapes.length === 0 || filteredShapes.includes(shapeField)) &&
        (filteredComments.length === 0 || commentsField.includes(filteredComments));
        return goodRecord;
    });
}

function submitBtnClick(event) {
    // The default behavior of a button clicked inside of a form is to try and submit the form somewhere (which we don't want)
    d3.event.preventDefault();
  
   var newUFO = {
      datetime: dateTimeInput.value.trim(),
      city: cityInput.value.trim(),
      state: stateInput.value.trim(),
      country: countryInput.value.trim(),
      shape: shapeInput.value.trim(),
      comments: commentsInput.value.trim()
    }
  
    if (newUFO.datetime !=0) {
      filteredDataSet.push(newUFO);
    }
    renderTable();
    resetBtnClick();
  }