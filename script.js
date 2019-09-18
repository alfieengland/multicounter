var btnAddCounter;
var counters = 0; // Number of counters active/onscreen, initialised as 0
var counterTemplate;
var labelTotal; // Label element "labelTotal" which shows the total count of all counters
var countTotal = 0; // Int of combined counters' amounts
var cssColumns;
var cssRows;
var inputColumns;
var inputRows;
// Used to update rows/columns css variables, initialised here to prevent them resetting every time changeRows or changeColumns are called
var newRows;
var newColumns;

function afterPageLoads() {
  btnAddCounter = document.getElementById('addCounter');
  labelTotal = document.getElementById('labelTotal');
  btnAddCounter.addEventListener('click', addCounter); // Trigger "addCounter" function when "btnAddCounter" ("Add New Counter" button) element is clicked

  // Sets "Columns" & "Rows" inputs to corresponding css variable values
  cssColumns = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--counterColumns')); // Stores css variable '--counterColumns' as a Javascript Variable
  cssRows = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--counterRows')); // Stores css variable '--counterRows' as a Javascript Variable

  // Store number-input elements "inputColumns" and "inputRows" as Javascript variables for ease of access
  inputColumns = document.getElementById('inputColumns');
  inputRows = document.getElementById('inputRows');

  // Set aforementioned inputs' values to their corresponding initial CSS variable values (as found in styles.css)
  inputColumns.value = cssColumns;
  inputRows.value = cssRows;
}

// Create a new counter instance from the html template every time "Add New Counter" button is pressed
function addCounter() {
  counterTemplate = document.querySelector('#counter');
  var clone = counterTemplate.content.cloneNode(true);
  document.body.appendChild(clone); // Add an instance HTML elements/contents present withing counterTemplate to the page
  counters += 1; // Add one to the total number of "counters" current present on the page
}

// Add 1 to the corresponding counter button (works for all counter instances using 'this' argument)
function countFunction(elem) {
  var currentValue = parseInt(elem.innerHTML) + 1;
  elem.innerHTML = currentValue;
  countersTotal();
}

// Triggers 'afterPageLoads' function after the page loads
document.addEventListener('DOMContentLoaded', afterPageLoads);

// Confirmation alert/popup on reload to prevent user from accidentally leaving page & losing counters
window.onbeforeunload = function() {
  return "";
};

// Update "Total" count label found in footer upon clicking and counter button instance
function countersTotal() {
  countTotal += 1;
  labelTotal.innerHTML = "Total: " + countTotal;
}

// Update CSS rows variable to match newly-changed rows input value
function changeRows() {
  // If statement used to prevent code triggering twice due to "onClick", "onKeyPress", "onPaste" & "onInput" sometimes occuring simultaneously
  if (newRows != inputRows.value) {
    newRows = inputRows.value;
    cssRows = parseInt(document.documentElement.style.setProperty('--counterRows', newRows));
  }
}

// Update CSS columns variable to match newly-changed columns input value
function changeColumns() {
  // If statement used to prevent code triggering twice due to "onClick", "onKeyPress", "onPaste" & "onInput" sometimes occuring simultaneously
  if (newColumns != inputColumns.value) {
    newColumns = inputColumns.value;
    cssColumns = parseInt(document.documentElement.style.setProperty('--counterColumns', newColumns));
  }
}
