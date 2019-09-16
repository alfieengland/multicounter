var btnAddCounter;
var counters = 0; // Number of counters active/onscreen, initialised as 0
var counterTemplate;
var labelTotal; // Label element "labelTotal" which shows the total count of all counters
var countTotal = 0; // Int of combined counters' amounts

function afterPageLoads() {
  btnAddCounter = document.getElementById('addCounter');
  labelTotal = document.getElementById('labelTotal');
  btnAddCounter.addEventListener('click', addCounter);
}

function addCounter() {
  counterTemplate = document.querySelector('#counter');
  var clone = counterTemplate.content.cloneNode(true);
  document.body.appendChild(clone); // Add an instance HTML elements/contents present withing counterTemplate to the page
  //counterButtons[counters].addEventListener('click', countFunction);
  counters += 1; // Add one to the total number of "counters" current present on the page
}

function countFunction(elem) {
  var currentValue = parseInt(elem.innerHTML) + 1;
  elem.innerHTML = currentValue;
  countersTotal();
}

document.addEventListener('DOMContentLoaded', afterPageLoads); /* Triggers the function after the page has loaded */

// Confirmation alert/popup on reload to prevent user from accidentally leaving page & losing counters
window.onbeforeunload = function() {
  return "";
};

// Update "Total" count label
function countersTotal() {
  countTotal += 1;
  labelTotal.innerHTML = "Total: " + countTotal;
}
