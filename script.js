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
var newColumns;
var newRows;

// Calculated number of rows/columns based on number of counters present
var autoRows;
var autoColumns;

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

  // Set configurable columns/row footer elements to hidden on page loads
  document.getElementById("labelColumns").style.visibility = "hidden";
  document.getElementById("inputColumns").style.visibility = "hidden";
  document.getElementById("labelRows").style.visibility = "hidden";
  document.getElementById("inputRows").style.visibility = "hidden";
}

// Dynamically scale/position counters based on number on screen as well as screen size
function counterPositioning() {
  var counterContainers = document.getElementsByClassName("counterContainer");
  for (var x=0; x < counterContainers.length; x++) {
    if (counters == 1) {
      autoColumns = 1;
      autoRows = 1;
    } else if (counters == 2) {
      autoColumns = 1;
      autoRows = 2;
    } else if (counters == 3) {
      autoColumns = 3;
      autoRows = 1;
    } else if (counters == 4) {
      autoColumns = 2;
      autoRows = 2;
    } else if (counters == 5 || counters == 6) {
      autoColumns = 3;
      autoRows = 2;
    } else if (counters >= 7 && counters <= 9) {
      autoColumns = 3;
      autoRows = 3;
    } else if (counters >= 10 && counters <= 12) {
      autoColumns = 4;
      autoRows = 3;
    } else if (counters >= 13 && counters <= 15) {
      autoColumns = 5;
      autoRows = 3;
    } else if (counters >= 16 && counters <= 20) {
      autoColumns = 5;
      autoRows = 4;
    } else if (counters >= 21 && counters <= 24) {
      autoColumns = 6;
      autoRows = 4;
    } else if (counters >= 25 && counters <= 28) {
      autoColumns = 7;
      autoRows = 4;
    } else if (counters >= 29 && counters <= 35) {
      autoColumns = 7;
      autoRows = 5;
    } else if (counters >= 29 && counters <= 35) {
      autoColumns = 7;
      autoRows = 5;
    } else {
      autoColumns = 8;
      autoRows = 6;
    }

    // Update css column.row variables using js column/row variables as set in above if statements
    document.documentElement.style.setProperty("--counterColumns", autoColumns);
    document.documentElement.style.setProperty("--counterRows", autoRows);
  }
}

// Triggers everytime "AutoFit" checkbox clicked
function autoFitToggle() {
  if (autoFit.checked != true) {
    changeRows();
    changeColumns();
    document.getElementById("labelColumns").style.visibility = "visible";
    document.getElementById("inputColumns").style.visibility = "visible";
    document.getElementById("labelRows").style.visibility = "visible";
    document.getElementById("inputRows").style.visibility = "visible";
  } else {
    document.getElementById("labelColumns").style.visibility = "hidden";
    document.getElementById("inputColumns").style.visibility = "hidden";
    document.getElementById("labelRows").style.visibility = "hidden";
    document.getElementById("inputRows").style.visibility = "hidden";
    counterPositioning();
  }
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

  // Update grid auto-scaling/positioning if autoFit is enabled
  if (autoFit.checked == true) {
    counterPositioning();
  }
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
/* changeRows & changeColumns if statement condition meanings:
   "newRows != inputRows.value" & "newColumns != inputColumns.value" - prevent code triggering twice due to "onClick", "onKeyPress", "onPaste" & "onInput" sometimes occuring simultaneously
   "cssRows != inputRows.value" & "cssColumns != inputColumns.value" - Allow if-statement to trigger when checking/unchecking "Auto Fit" by comparing amount of rows/columns present to values in footer "Columns" / "Rows" inputs */
function changeRows() {
  if (newRows != inputRows.value || cssRows != inputRows.value) {
    newRows = inputRows.value;
    cssRows = parseInt(document.documentElement.style.setProperty('--counterRows', newRows));
  }
}

// Update CSS columns variable to match newly-changed columns input value
function changeColumns() {
  if (newColumns != inputColumns.value || cssColumns != inputColumns.value) {
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
  // Update grid auto-scaling/positioning if autoFit is enabled
  if (autoFit.checked == true) {
    counterPositioning();
  }
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
