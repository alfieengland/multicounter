var btnAddCounter;
var counters = 0; // Number of counters active/onscreen, initialised as 0
var counterTemplate;
var counterNameElements;
var latestCounterNameElement;
var counterCheckboxElements;
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
  counters += 1; // Add one to the total number of "counters" currently present on the page
  // The following code auto-focuses to the name/text input element of a newly-created counter
  counterNameElements = document.getElementsByClassName('counterName');
  for (var i = 0; i < counterNameElements.length; i++) {
    latestCounterNameElement = counterNameElements[i];
  }
  latestCounterNameElement.focus();

  addCounterDensity();
}

// Update "Total" count label found in footer upon clicking any counter button instance
function countersTotal() {
  countTotal += 1;
  labelTotal.innerHTML = "Total: " + countTotal;
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
  if (counters != 0) {
    return "";
  }
};

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

// Delete any and all counters that have their corresponding checkbox currently ticked
function deleteCounters() {
  var checked = 0; // Number of boxes checked upon "Delete Selected Counters" being pressed
  var checkedCounters = []; // Initialises blank array in which all counters with checked tickboxes will be identified
  counterCheckboxElements = document.getElementsByClassName('counterCheckbox');
  // For loop to add element names of all counters with ticked checkboxes to checkedCounters array
  for (var i = 0; i < counterCheckboxElements.length; i++) {
    if (counterCheckboxElements[i].checked) {
      checked +=1;
      checkedCounters.push(counterCheckboxElements[i].parentNode);
    }
  }
  // Deletes all counters with their checkbox ticked (all elements within checkedCounters)
  for (var i = 0; i < checkedCounters.length; i++) {
    // Updates countTotal integer to account for the upcoming removal of currently-handled counter
    countTotal -= checkedCounters[i].childNodes[5].innerHTML;
    checkedCounters[i].parentNode.removeChild(checkedCounters[i]);
  }
  // Updates total label to account for count of remove counters
  labelTotal.innerHTML = "Total: " + countTotal;

  // Adjust number of counters var based on total amount checked upon deletion
  counters -= checked;

  addCounterDensity();
}

function addCounterDensity() {
  switch (counters) {
    case 0:
      counterDensity = '#c5bdee';
      break;
    case 1:
      counterDensity = '#b8aeea';
      break;
    case 2:
      counterDensity = '#a69ae5';
      break;
    case 3:
      counterDensity = '#9485e0';
      break;
    case 4:
      counterDensity = '#8371da';
      break;
    case 5:
      counterDensity = '#715dd5';
      break;
    case 6:
      counterDensity = '#5f49d0';
      break;
    case 7:
      counterDensity = '#4d34cb';
      break;
    default:
      counterDensity = '#4d34cb';
  }
  document.getElementById("addCounter").style.backgroundColor = counterDensity;
}
