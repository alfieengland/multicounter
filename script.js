var counterButtons;
var btnAddCounter;
var counters = 0;
var counterTemplate;

function afterPageLoads() {
  counterButtons = document.getElementsByClassName('counterButton');
  btnAddCounter = document.getElementById('addCounter');
  btnAddCounter.addEventListener('click', addCounter);
}

function addCounter() {
  counterTemplate = document.querySelector('#counter');
  var clone = counterTemplate.content.cloneNode(true);
  document.body.appendChild(clone); // Add an instance HTML elements/contents present withing counterTemplate to the page
  //counterButtons[counters].addEventListener('click', countFunction);
  count[counters] = 0; // Add new value in array of "count" in which the count of the newly created "counter" is stored
  counters += 1; // Add one to the total number of "counters" current present on the page
}

function countFunction(elem) {
  var currentValue = parseInt(elem.innerHTML) + 1;
  elem.innerHTML = currentValue;
}

document.addEventListener('DOMContentLoaded', afterPageLoads); /* Triggers the function after the page has loaded */
