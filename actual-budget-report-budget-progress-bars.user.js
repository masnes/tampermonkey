// ==UserScript==
// @name         Actual Budget Progress Bars for the Report Budget Style
// @namespace    http://tampermonkey.net/
// @version      0.74
// @history      0.74 - fixed color picker, update on change
// @description  A script to add progress bars to elements and update them automatically
// @author       wdpk - updated by masnes and Claude
// @match        YOUR_ACTUAL_SERVER_URL_HERE
// @match        https://app.actualbudget.org/*
// @grant        none
// ==/UserScript==

function colorEditor(){
    var modal = document.getElementById("myModal");
    var span = document.getElementById("closeModal");
    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

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
    var modal = document.createElement('div');
    modal.id = 'myModal';
    modal.className = 'modal';
    document.body.appendChild(modal);

    var modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modal.appendChild(modalContent);

    var closeModalButton = document.createElement('span');
    closeModalButton.id = 'closeModal';
    closeModalButton.textContent = '×';
    modalContent.appendChild(closeModalButton);
    var clearColorsButton = document.createElement('button');
    clearColorsButton.id = 'clearColors';
    clearColorsButton.textContent = 'Clear Colors';
    clearColorsButton.style.display = 'inline';
    clearColorsButton.style.cssFloat = 'right';
    modalContent.appendChild(clearColorsButton);

    var instructionText = document.createElement('p');
    instructionText.textContent = 'Select your colors below. Refresh the tab to enable. Refresh after pressing clear to reset to default colors.';
    modalContent.appendChild(instructionText);

    var colorPickers = document.createElement('div');
    colorPickers.id = 'colorPickers';
    modalContent.appendChild(colorPickers);

    var colors = {
        funded: '#008000',
        fundedFill: '#006400',
        overspent: '#8b0000',
        overspentCovered: '#008000',
        incomeBudgeted: '#90ee90',
        incomeReceived: '#006400',
        incomeBonusOverage: '#32cd32',
        incomeBonusBudgeted: '#008000',
        empty: '#cccccc',
    };

    for (var color in colors) {
        var storedColor = localStorage.getItem(color);
        if (storedColor) {
            colors[color] = storedColor;
        }
    }

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

    var saveColorsButton = document.createElement('button');
    saveColorsButton.id = 'saveColors';
    saveColorsButton.textContent = 'Save Colors';
    modalContent.appendChild(saveColorsButton);

    var button = document.querySelector('button[data-css-1rzl2mi]');

    if (button) {
        button.addEventListener('click', function() {
            setTimeout(function(){
                var container = document.querySelector('div[tabindex="1"]');

                if (container) {
                    var newButton = document.createElement('div');
                    newButton.setAttribute('role', 'button');
                    newButton.className = 'view  css-xu0k9';
                    newButton.setAttribute('id','colorEditButton');
                    newButton.addEventListener('mouseover', function() {
                        this.classList.remove('css-xu0k9');
                        this.classList.add('css-1n3jf7y');
                    });

                    newButton.addEventListener('mouseout', function() {
                        this.classList.remove('css-1n3jf7y');
                        this.classList.add('css-xu0k9');
                    });
                    newButton.addEventListener('click', colorEditor);

                    var span = document.createElement('span');
                    span.className = ' css-nil';
                    span.textContent = 'Edit Progress Bar Colors';
                    newButton.appendChild(span);

                    var viewDiv = document.createElement('div');
                    viewDiv.className = 'view  css-mfy564';
                    newButton.appendChild(viewDiv);

                    container.appendChild(newButton);
                }
            }, 300);
        });
    }
}

function clearSavedColors() {
    const colors = {
        funded: '#008000',
        fundedFill: '#006400',
        overspent: '#8b0000',
        overspentCovered: '#008000',
        incomeBudgeted: '#90ee90',
        incomeReceived: '#006400',
        incomeBonusOverage: '#32cd32',
        incomeBonusBudgeted: '#008000',
        empty: '#cccccc',
    };

    for (const color in colors) {
        localStorage.removeItem(color);
    }
}

function setupProgressBars(){
    const colors = {
        funded: '#008000',
        fundedFill: '#006400',
        overspent: '#8b0000',
        overspentCovered: '#008000',
        incomeBudgeted: '#90ee90',
        incomeReceived: '#006400',
        incomeBonusOverage: '#32cd32',
        incomeBonusBudgeted: '#008000',
        empty: '#cccccc',
    };

    for (const color in colors) {
        const storedColor = localStorage.getItem(color);
        if (!storedColor) {
            localStorage.setItem(color, colors[color]);
        } else {
            colors[color] = storedColor;
        }
    }

    const style = document.createElement('style');
    style.type = 'text/css';

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

    if (style.styleSheet) {
        style.styleSheet.cssText = cssContent;
    } else {
        style.appendChild(document.createTextNode(cssContent));
    }

    document.head.appendChild(style);

    const outerDiv = document.createElement('div');
    const innerDiv = document.createElement('div');
    outerDiv.appendChild(innerDiv);
    outerDiv.className = 'progress progress-small';
    innerDiv.className = 'bar';

    const elements = document.querySelectorAll('.css-1g5tiot:has(div[data-testid="category-name"])');

    elements.forEach(element => {
        const parentRow = element.closest('div[data-testid="row"]');
        const newOuterDiv = outerDiv.cloneNode(true);
        const newInnerDiv = newOuterDiv.querySelector('.bar');

        if(parentRow.classList.contains('css-w3hkmv')){
            newOuterDiv.classList.add('income');
        }

        element.parentNode.insertBefore(newOuterDiv, element.nextSibling);
    });
}

function updateProgress() {
    const elements = document.querySelectorAll('.css-1g5tiot:has(div[data-testid="category-name"])');
    elements.forEach((element, index) => {
        try {
            const parentRow = element.closest('div[data-testid="row"]');
            if (!parentRow) return;

            const budgetElement = parentRow.querySelector('div[data-testid="budget"]');
            const balanceElement = parentRow.querySelector('div[data-testid="balance"]');
            const spentElement = parentRow.querySelector('div[data-testid="spent"]');

            if (!budgetElement || !balanceElement || !spentElement) {
                return;
            }

            const budget = parseFloat(budgetElement.textContent.replace(/,/g, '') || '0');
            const balance = parseFloat(balanceElement.textContent.replace(/,/g, '') || '0');
            const spent = Math.abs(parseFloat(spentElement.textContent.replace(/,/g, '') || '0'));
            const net = balance + spent;

            const newOuterDiv = parentRow.querySelector('.progress');
            const newInnerDiv = newOuterDiv?.querySelector('.bar');

            if (!newOuterDiv || !newInnerDiv) {
                const newProgressBar = createProgressBar();
                element.parentNode.insertBefore(newProgressBar, element.nextSibling);
                return;
            }

            newOuterDiv.classList.remove('funded', 'overspent', 'empty');
            newInnerDiv.style.width = '0%';
            newInnerDiv.style.backgroundPosition = '0 0%';

            if (net >= spent) {
                newOuterDiv.classList.add('funded');
                const percentageCovered = (spent / net) * 100 || 0;
                newInnerDiv.style.width = `${percentageCovered}%`;
                newInnerDiv.style.backgroundPosition = `0 ${percentageCovered}%`;
            } else if (spent > net) {
                newOuterDiv.classList.add('overspent');
                const percentageOverspent = (net / spent) * 100 || 0;
                newInnerDiv.style.width = `${percentageOverspent}%`;
                newInnerDiv.style.backgroundPosition = `0 ${percentageOverspent}%`;
            } else {
                newOuterDiv.classList.add('empty');
            }
        } catch (error) {
            console.error(`Error updating progress for row ${index}:`, error);
        }
    });
}

function createProgressBar() {
    const outerDiv = document.createElement('div');
    const innerDiv = document.createElement('div');
    outerDiv.className = 'progress progress-small';
    innerDiv.className = 'bar';
    outerDiv.appendChild(innerDiv);
    return outerDiv;
}

function watcher() {
    setupProgressBars();
    updateProgress();
    setupColorPicker();

    const targetNode = document.querySelector('div[data-testid="budget-table"]');
    if (!targetNode) {
        console.error('Target node for observer not found');
        return;
    }

    const config = { childList: true, subtree: true, characterData: true, attributes: true };

    const observer = new MutationObserver((mutationsList) => {
        let shouldUpdate = false;

        for (const mutation of mutationsList) {
            if (mutation.type === 'characterData' || 
                (mutation.type === 'attributes' && mutation.attributeName === 'data-testid') ||
                mutation.type === 'childList') {
                shouldUpdate = true;
                break;
            }
        }

        if (shouldUpdate) {
            setTimeout(updateProgress, 100); // Slight delay to ensure DOM is updated
        }
    });

    observer.observe(targetNode, config);
}

// Start the watcher after a short delay to ensure the DOM is fully loaded
setTimeout(watcher, 5000);
