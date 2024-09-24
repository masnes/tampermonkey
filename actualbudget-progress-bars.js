// ==UserScript==
// @name         Actual Budget Progress Bars for the Report Budget Style
// @namespace    http://tampermonkey.net/
// @version      0.71
// @history      0.71 - budget = spent handling
// @description  A script to add progress bars to elements
// @author       wdpk
// @match        YOUR_ACTUAL_SERVER_URL_HERE
// @match        https://app.actualbudget.org/*
// @grant        none
// ==/UserScript==
// NOTE TO USERS: This script contains hardcoded references to some elements which may change.
// this script may require some maintenance, comments are added to explain most operations

// Create a style element
function colorEditor(){
    var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementById("closeModal");

//  open the modal

  modal.style.display = "block";


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Save the colors to local storage
document.getElementById('saveColors').onclick = function() {
  var colorInputs = document.querySelectorAll('.color-picker input');
  for (var i = 0; i < colorInputs.length; i++) {
    var colorName = colorInputs[i].parentElement.previousSibling.textContent;
    var colorValue = colorInputs[i].value;
    localStorage.setItem(colorName, colorValue);
  }
  alert('Colors saved!');
};
document.getElementById('clearColors').onclick = function() {
  clearSavedColors()
  alert('Colors Cleared!');
};
}

function setupColorPicker(){
// Create the modal
var modal = document.createElement('div');
modal.id = 'myModal';
modal.className = 'modal';
document.body.appendChild(modal);

// Create the modal content container
var modalContent = document.createElement('div');
modalContent.className = 'modal-content';
modal.appendChild(modalContent);

// Create the close button
var closeModalButton = document.createElement('span');
closeModalButton.id = 'closeModal';
closeModalButton.textContent = '×';
modalContent.appendChild(closeModalButton);
var clearColorsButton = document.createElement('button');
clearColorsButton.id = 'clearColors';
clearColorsButton.textContent = 'Clear Colors';
clearColorsButton.style.display='inline';
clearColorsButton.style.cssFloat='right';
modalContent.appendChild(clearColorsButton);
// Create the instruction text
var instructionText = document.createElement('p');
instructionText.textContent = 'Select your colors below. Refresh the tab to enable. Refresh after pressing clear to reset to default colors.';
modalContent.appendChild(instructionText);


// Create the color pickers container
var colorPickers = document.createElement('div');
colorPickers.id = 'colorPickers';
modalContent.appendChild(colorPickers);

// Define the color variables
var colors = {
  funded: '#008000', // green
  fundedFill: '#006400', // darkgreen
  overspent: '#8b0000', // darkred
  overspentCovered: '#008000', // green
  incomeBudgeted: '#90ee90', // lightgreen
  incomeReceived: '#006400', // darkgreen
  incomeBonusOverage: '#32cd32', // limegreen
  incomeBonusBudgeted: '#008000', // green
  empty: '#cccccc', // #ccc in short form
};

// Load the color variables from local storage
for (var color in colors) {
  var storedColor = localStorage.getItem(color);
  if (storedColor) {
    colors[color] = storedColor;
  }
}

// Create the color pickers
var colorPickersDiv = document.getElementById('colorPickers');
for (var color in colors) {
  var colorPickerDiv = document.createElement('div');
  colorPickerDiv.className = 'color-picker';

  var colorNameDiv = document.createElement('div');
  var colorNameText = document.createElement('p');
  colorNameText.textContent = color;
  colorNameDiv.appendChild(colorNameText);
  colorPickerDiv.appendChild(colorNameDiv);

  var colorDisplayDiv = document.createElement('label');
  colorDisplayDiv.className = 'color-display';
  colorDisplayDiv.style.backgroundColor = colors[color];

  var colorInput = document.createElement('input');
  colorInput.type = 'color';
  colorInput.value = colors[color];
  colorInput.oninput = function() {
    this.parentElement.style.backgroundColor = this.value;
  };
  colorDisplayDiv.appendChild(colorInput);
  colorPickerDiv.appendChild(colorDisplayDiv);
  colorPickersDiv.appendChild(colorPickerDiv);
}

var buttonHolderDiv = document.createElement('div');

// Create the 'Save Colors' button
var saveColorsButton = document.createElement('button');
saveColorsButton.id = 'saveColors';
saveColorsButton.textContent = 'Save Colors';
modalContent.appendChild(saveColorsButton);

// Select the button
var button = document.querySelector('button[data-css-1rzl2mi]');

// Add a click event listener to the button
button.addEventListener('click', function() {
    console.log("clicked");
    setTimeout(function(){
	// Get the div with tabindex
var container = document.querySelector('div[tabindex="1"]');

// Create new button
var newButton = document.createElement('div');
newButton.setAttribute('role', 'button');
newButton.className = 'view  css-xu0k9';
newButton.setAttribute('id','colorEditButton');
// Add event listeners for mouseover and mouseout
newButton.addEventListener('mouseover', function() {
    this.classList.remove('css-xu0k9');
    this.classList.add('css-1n3jf7y');
});

newButton.addEventListener('mouseout', function() {
    this.classList.remove('css-1n3jf7y');
    this.classList.add('css-xu0k9');
});
        newButton.addEventListener('click', colorEditor);

// Create span for button text
var span = document.createElement('span');
span.className = ' css-nil';
span.textContent = 'Edit Progress Bar Colors'; // Set the text for the new button
newButton.appendChild(span);

// Create div for view
var viewDiv = document.createElement('div');
viewDiv.className = 'view  css-mfy564';
newButton.appendChild(viewDiv);

// Append new button to the container
container.appendChild(newButton);
    });
        // Select the button
	},300);

}
function clearSavedColors() {
  // Define the color variables
  const colors = {
    funded: '#008000', // green
    fundedFill: '#006400', // darkgreen
    overspent: '#8b0000', // darkred
    overspentCovered: '#008000', // green
    incomeBudgeted: '#90ee90', // lightgreen
    incomeReceived: '#006400', // darkgreen
    incomeBonusOverage: '#32cd32', // limegreen
    incomeBonusBudgeted: '#008000', // green
    empty: '#cccccc', // #ccc in short form
  };

  // Remove the color variables from local storage
  for (const color in colors) {
    localStorage.removeItem(color);
  }
}

function setupProgressBars(){
// Define the color variables
// Define the color variables
const colors = {
  funded: '#008000', // green
  fundedFill: '#006400', // darkgreen
  overspent: '#8b0000', // darkred
  overspentCovered: '#008000', // green
  incomeBudgeted: '#90ee90', // lightgreen
  incomeReceived: '#006400', // darkgreen
  incomeBonusOverage: '#32cd32', // limegreen
  incomeBonusBudgeted: '#008000', // green
  empty: '#cccccc', // #ccc in short form
};

// Store the color variables in local storage
for (const color in colors) {
  const storedColor = localStorage.getItem(color);
  if (!storedColor) {
    localStorage.setItem(color, colors[color]);
  } else {
    colors[color] = storedColor;
  }
}

// Create the style element
const style = document.createElement('style');
style.type = 'text/css';

// Define the CSS content using the color variables
const cssContent = `
.progress {
  box-sizing: border-box;
}
.progress .bar {
  box-sizing: border-box;
  transition: all 0.5s ease-in-out;
  max-width: 100%;
}
.progress-small {
  display: inline-block;
  width: 95%;
  margin-bottom: 4px;
  border-radius: 3px 4px 4px 3px;
}
.progress-small .bar {
  height: 6px;
  border-radius: 3px 0 0 3px;
}
.funded.progress-small {
  background-color: ${colors.funded};
}
.funded.progress-small .bar {
  background-color: ${colors.fundedFill};
}
.overspent.progress-small {
  background-color: ${colors.overspent};
}
.overspent.progress-small .bar {
  background-color: ${colors.overspentCovered};
}
.income.progress-small {
  background-color: ${colors.incomeBudgeted};
}
.income.progress-small .bar {
  background-color: ${colors.incomeReceived};
}
.income.overspent.progress-small {
  background-color: ${colors.incomeBonusOverage};
}
.income.overspent.progress-small .bar {
  background-color: ${colors.incomeBonusBudgeted};
}
.empty.progress-small, .empty.progress-small .bar {
  background-color: ${colors.empty};
}
.css-qqwx7g:hover .progress-small, [data-css-qqwx7g]:hover .progress-small {
  margin-bottom: 6px !important;
}
 /* Modal styles */
    .modal {
      display: none;
      position: fixed;
      z-index: 1;
      padding-top: 100px;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0,0,0,0.65);
    }
    .modal-content {
    background-color: var(--color-tableRowHeaderBackground);
    color: var(--color-pageText);
      margin: auto;
      padding: 20px;
      border-radius: 4px;
      width: 40%;
      left: 15%;
      position: relative;
    }
    .color-picker {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      margin-right: 15px;
      margin-left:8px;
    }
    .color-picker p {
      color: var(--color-pageText);
      margin:0;
      font-size: 15px;
      margin-left:10px;
    }
    .color-display {
    width: -webkit-fill-available;
    border-radius: 10px;
    height: 20px;
    }
    .color-picker div {
    width: min-content;
    height: 20px;
    margin-right:15px;
    }
    input[type="color"] {
    border:none;
    visibility:hidden;
    }
    .modal-content button {
    border: 1px solid var(--color-pageTextLight);
    border-radius: 5px;
    background-color: var(--color-tableBackground);
    color: var(--color-pageTextLight);
    padding: 3px 18px;
    }
    #clearColors {
    font-size:50%;
    padding:5px 2px;
    }
`;


// Append the CSS content to the style element
if (style.styleSheet) {
  style.styleSheet.cssText = cssContent;
} else {
  style.appendChild(document.createTextNode(cssContent));
}

// Inject the style element into the head of the document
document.head.appendChild(style);



// Create the outer div
const outerDiv = document.createElement('div');

// Create the inner div
const innerDiv = document.createElement('div');

// Nest the inner div inside the outer div
outerDiv.appendChild(innerDiv);

// Optionally, you can add classes or other attributes to the divs
outerDiv.className = 'progress progress-small';
innerDiv.className = 'bar';

// Find all elements with class "css-tpz8fm"
const elements = document.querySelectorAll('.css-1g5tiot:has(div[data-testid="category-name"])');

// Append the new div as a sibling to each element
elements.forEach(element => {
    // Find the parent row element
    const parentRow = element.closest('div[data-testid="row"]');

    // Clone the outerDiv
    const newOuterDiv = outerDiv.cloneNode(true);
    const newInnerDiv = newOuterDiv.querySelector('.bar');


	if(parentRow.classList.contains('css-w3hkmv')){
		newOuterDiv.classList.add('income');
	}

    // Insert the new div as a sibling to the element
    element.parentNode.insertBefore(newOuterDiv, element.nextSibling);
});

}

function updateProgress(){
	const elements = document.querySelectorAll('.css-1g5tiot:has(div[data-testid="category-name"])');
	elements.forEach(element => {
    // Find the parent row element
    const parentRow = element.closest('div[data-testid="row"]');

    if (!parentRow) { return ; }
    // Get the value of the sibling elements (assuming it's text content)
    const budget = parseFloat(parentRow.querySelector('div[data-testid="budget"]').textContent.replace(/,/g, ''));
    const balance = parseFloat(parentRow.querySelector('div[data-testid="balance"]').textContent.replace(/,/g, ''));
    const spent = Math.abs(parseFloat(parentRow.querySelector('div[data-testid="spent"]').textContent.replace(/,/g, '')));
    const net = balance+spent;
        // Find the progress bar for this element
        const newOuterDiv = parentRow.querySelector('.progress');
        const newInnerDiv = newOuterDiv.querySelector('.bar');
    newOuterDiv.classList.remove('funded');
    newOuterDiv.classList.remove('overspent');
    newOuterDiv.classList.add('empty');

    newInnerDiv.setAttribute('style',('width:0%; backgroundPosition:0 0%'));
    // Calculate the percentage of spent over budget
    if (net >= spent) {
        var percentageCovered;
		newOuterDiv.classList.add('funded');
        newOuterDiv.classList.remove('empty');
        percentageCovered = (spent / net) * 100;
        if(percentageCovered=="Infinity") {
            percentageCovered=0;
        }
        newInnerDiv.setAttribute('style',('width:' + percentageCovered + '%; background-position:0 '+ percentageCovered + '%'));
    }
	else if (spent > net) {
		newOuterDiv.classList.add('overspent');
        newOuterDiv.classList.remove('empty');
        var percentageOverspent;
        percentageOverspent = (net / spent) * 100;
        if(percentageOverspent=="Infinity") {
            percentageOverspent=0;
        }
        newInnerDiv.setAttribute('style',('width:' + percentageOverspent + '%; background-position:0 '+ percentageOverspent + '%'));
    }
});}

//watcher script
function watcher(){
    setupProgressBars();
    updateProgress();
    setupColorPicker();
    var targetNode = document.querySelector('span[data-testid="category-month-spent"]');

    // Options for the observer (which mutations to observe)
    var config = { attributes: true, childList: true, subtree: true };

    // Variable to store the state of updateProgress function
    var isUpdateInProgress = false;

    // Callback function to execute when mutations are observed
    var callback = function(mutationsList, observer) {
        for(var mutation of mutationsList) {
            // Check if update is not in progress
            if (!isUpdateInProgress) {
                isUpdateInProgress = true; // Set the flag to true
                updateProgress();
                // Reset the flag after 1 second
                setTimeout(function() {
                    isUpdateInProgress = false;
                }, 156);
            }
        }
    };

    // Create an observer instance linked to the callback function
    var observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
}
setTimeout(watcher,6000);