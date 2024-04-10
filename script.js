function initializeEventListeners() {
    var errorIcons = document.querySelectorAll(".error-icon");
    errorIcons.forEach(function (icon) {
        icon.addEventListener("click", function () {
            var inputId = this.dataset.for;
            var inputElement = document.getElementById(inputId);
            if (inputElement) {
                var errorTooltip = inputElement.nextElementSibling.nextElementSibling;
                if (errorTooltip.innerText !== "") {
                    errorTooltip.style.display = "block";
                }
            }
        });
    });
}

function showErrorMessage(input, message) {
    input.parentElement.classList.add("invalid");
    var errorTooltip = input.nextElementSibling.nextElementSibling;
    errorTooltip.innerText = message;
    errorTooltip.style.display = "block";
}


function hideErrorMessage(input) {
    input.parentElement.classList.remove("invalid");
    var errorTooltip = input.nextElementSibling.nextElementSibling;
    errorTooltip.innerText = "";
    errorTooltip.style.display = "none";
}


function calculateTax() {
    var incomeInput = document.getElementById("income");
    var extraInput = document.getElementById("extra");
    var ageInput = document.getElementById("age");
    var deductionInput = document.getElementById("deduction");

    var isValid = true;


    if (incomeInput.value.trim() === "") {
        showErrorMessage(incomeInput, "Income is mandatory");
        isValid = false;
    } else {
        hideErrorMessage(incomeInput);
    }


    if (extraInput.value.trim() === "") {
        showErrorMessage(extraInput, "Extra income is mandatory");
        isValid = false;
    } else {
        hideErrorMessage(extraInput);
    }


    if (ageInput.value === "") {
        showErrorMessage(ageInput, "Age is mandatory");
        isValid = false;
    } else {
        hideErrorMessage(ageInput);
    }


    if (deductionInput.value.trim() === "") {
        showErrorMessage(deductionInput, "Deductions are mandatory");
        isValid = false;
    } else {
        hideErrorMessage(deductionInput);
    }

    if (isValid) {
        calculateTaxResult();
    }
}


function calculateTaxResult() {
    var income = parseFloat(document.getElementById("income").value) || 0;
    var extra = parseFloat(document.getElementById("extra").value) || 0;
    var age = document.getElementById("age").value;
    var deduction = parseFloat(document.getElementById("deduction").value) || 0;

    var totalIncome = income + extra - deduction;

    var tax = 0;
    var netIncome = 0;

    if (totalIncome <= 800000) {
        tax = 0;
    } else {
        var taxableAmount = totalIncome - 800000;
        if (age === "<40") {
            tax = taxableAmount * 0.3;
        } else if (age === "≥40 <60") {
            tax = taxableAmount * 0.4;
        } else if (age === "≥60") {
            tax = taxableAmount * 0.1;
        }
    }

    netIncome = totalIncome - tax;


    var newWindow = window.open("", "_blank");
    newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Tax Result</title>
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <div class="container">
                <h1 class="head">TAX RESULT</h1>
                <div class="box newtab">
                    <p class="tot">Your overall income will be </br><span> ${netIncome.toFixed(2)}</span></br>after tax deductions.</p>
                    <div class="button_container">
                <button><a href="index.html">Close</a></button>
            </div>
                </div>
            </div>

        </body>
        </html>
    `);
}
