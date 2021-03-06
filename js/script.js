// Form Elements
const nameElement = document.querySelector("#name");
const otherJobRoleElement = document.querySelector("#other-job-role");
const jobRoleSelectElement = document.querySelector("#title");
const colorSelectElement = document.querySelector("#color");
const designSelectElement = document.querySelector("#design");
const activitiesFieldSet = document.querySelector("#activities");
const activitiesCostP = document.querySelector("#activities-cost");
const activityCheckboxes = document.querySelectorAll('#activities input');
const activitiesBoxDiv = document.querySelector("#activities-box");
const paymentSelectElement = document.querySelector("#payment");
const creditCardDiv = document.querySelector("#credit-card");
const paypalDiv = document.querySelector("#paypal");
const bitcoinDiv = document.querySelector("#bitcoin");
const form = document.querySelector("form");
const emailElement = document.querySelector("#email")
const emailHint = document.querySelector("#email-hint");

// initialize selected activities for validation
let selectedActivities = 0;

// Set default form options when page is loaded
window.addEventListener("load", () => {
    // focus first element of the form
    nameElement.focus();
    // hide or disable related fields
    otherJobRoleElement.style.display = "none";
    colorSelectElement.disabled = true;
    paypalDiv.style.display = "none";
    bitcoinDiv.style.display = "none";
    // clear activity checkboxes
    for (let i=0; i < activityCheckboxes.length; i++)  {
        if (activityCheckboxes[i].type === 'checkbox')   {
            activityCheckboxes[i].checked = false;
        }
    }
    // set credit card as selected when page is loaded and on refresh
    for (let i=0; i < paymentSelectElement.children.length; i++)  {
        if (paymentSelectElement.children[i].value === 'credit-card')   {
            paymentSelectElement.children[i].selected = true;
        }
    }
});

// If other is selected from "job Role" drop down menu
jobRoleSelectElement.addEventListener("change", (e) => {
    const selectedRole = e.target.value;
    if (selectedRole === "other") {
        otherJobRoleElement.style.display = "block";
    } else {
        otherJobRoleElement.style.display = "none";
    }
});

// If design option selected, related color options should be populated.
designSelectElement.addEventListener("change", (e) => {
    colorSelectElement.disabled = false;
    const selectedDesign = e.target.value;
    for (let i = 0; i < colorSelectElement.children.length; i++) {
        const designDataOfColor = colorSelectElement.children[i].getAttribute("data-theme");
        if (designDataOfColor === selectedDesign ) {
            colorSelectElement.children[i].removeAttribute("hidden");
            colorSelectElement.children[i].selected = false;
        } else {
            colorSelectElement.children[i].setAttribute("hidden", true);
            colorSelectElement.children[i].selected = false;
        }
    }
});

let activityTotalCost = 0;

// Calculate total cost for selected activities
activitiesFieldSet.addEventListener("change", (e) => {
    const activity = e.target;
    const activityTime = activity.getAttribute("data-day-and-time");
    const activityCost = +activity.getAttribute("data-cost");

    if (activity.checked) {
        activityTotalCost += activityCost;
        selectedActivities++;
    } else {
        activityTotalCost -= activityCost;
        selectedActivities--;
    }
    activitiesCostP.innerHTML = "Total: $" + activityTotalCost;

    // prevent users from selecting activities that occur at the same time
    for (let i = 0; i < activityCheckboxes.length; i++) {
        const checkboxTime = activityCheckboxes[i].getAttribute("data-day-and-time");
        if (checkboxTime === activityTime && activity !== activityCheckboxes[i]) {
            if (activity.checked) {
                activityCheckboxes[i].disabled = true;
                activityCheckboxes[i].parentElement.classList.add("disabled");
            } else {
                activityCheckboxes[i].disabled = false;
                activityCheckboxes[i].parentElement.classList.remove("disabled");
            }
        }
    }
});

// show the related area according to selected payment type
paymentSelectElement.addEventListener("change", (e) => {
    const selectedPaymentMethod = e.target;
    if (selectedPaymentMethod.value === "paypal") {
        paypalDiv.style.display = "block";
        bitcoinDiv.style.display = "none";
        creditCardDiv.style.display = "none";
    } else if (selectedPaymentMethod.value === "bitcoin") {
        paypalDiv.style.display = "none";
        bitcoinDiv.style.display = "block";
        creditCardDiv.style.display = "none";
    } else {
        paypalDiv.style.display = "none";
        bitcoinDiv.style.display = "none";
        creditCardDiv.style.display = "block";
    }
});

// Helper functions to display form validation errors
const validationPass = (element) => {
    element.parentElement.classList.add("valid");
    element.parentElement.classList.remove("not-valid");
    element.parentElement.lastElementChild.style.display = "none";
};

const validationFail = (element) => {
    element.parentElement.classList.add("not-valid");
    element.parentElement.classList.remove("valid");
    element.parentElement.lastElementChild.style.display = "block";
};

// Name form field validation
const nameValidator = () => {
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameElement.value);
    if (nameIsValid) {
        validationPass(nameElement);
    } else {
        validationFail(nameElement);
    }
    return nameIsValid;
}

// Email form field validation
const emailValidator = () => {
    let emailIsValid;
    if (!emailElement.value) {
        // if email field is empty display a different message
        emailIsValid = false
        emailHint.innerHTML = "Email field cannot be blank";
        validationFail(emailElement);
    } else if (/^[^@]+@[^@.]+\.[a-z]+$/i.test(emailElement.value) === false) {
        emailHint.innerHTML = "Email address must be formatted correctly";
        emailIsValid = false
        validationFail(emailElement);
    } else {
        validationPass(emailElement);
        emailIsValid = true;
    }

    return emailIsValid;
};

// Activity selection form field validation
const activityValidator = () => {
    const anyActivitySelected = selectedActivities > 0;
    if (anyActivitySelected) {
        validationPass(activitiesBoxDiv);
    } else {
        validationFail(activitiesBoxDiv);
    }

    return anyActivitySelected;
};

// Card number form field validation (if credit card is selected as payment method)
const cardNumber = document.querySelector("#cc-num");
const cardNumberValidator = () => {
    if (paymentSelectElement.value === "credit-card") {
        if (/^\d{13,16}$/.test(cardNumber.value)) {
            validationPass(cardNumber);
            return true;
        } else {
            validationFail(cardNumber);
            return false;
        }
    } else {
        return true;
    }
};

// Zip code form field validation (if credit card is selected as payment method)
const zipCode = document.querySelector("#zip");
const zipCodeValidator = () => {
    if (paymentSelectElement.value === "credit-card") {
        if (/^\d{5}$/.test(zipCode.value)) {
            validationPass(zipCode);
            return true;
        } else {
            validationFail(zipCode);
            return false;
        }
    } else {
        return true;
    }
};

// Cvv form field validation (if credit card is selected as payment method)
const cvv = document.querySelector("#cvv");
const cvvValidator = () => {
    if (paymentSelectElement.value === "credit-card") {
        if (/^\d{3}$/.test(cvv.value)) {
            validationPass(cvv);
            return true;
        } else {
            validationFail(cvv);
            return false;
        }
    } else {
        return true;
    }
};

// Real time form validation
nameElement.addEventListener("keyup", nameValidator);
emailElement.addEventListener("keyup", emailValidator);
activitiesFieldSet.addEventListener("change", activityValidator);
cardNumber.addEventListener("keyup", cardNumberValidator);
zipCode.addEventListener("keyup", zipCodeValidator);
cvv.addEventListener("keyup", cvvValidator);

form.addEventListener("submit", (e) => {
    // form validations on submission
    const isNameValid = nameValidator();
    const isEmailValid = emailValidator();
    const isActivityValid = activityValidator();
    const isCarNumberValid = cardNumberValidator();
    const isZipCodeValid = zipCodeValidator();
    const isCVVValid = cvvValidator();

    if(!isNameValid || !isEmailValid || !isActivityValid || !isCarNumberValid || !isZipCodeValid || !isCVVValid) {
        e.preventDefault();
    }

});

// Highlight focused checkbox field
activityCheckboxes.forEach(cb => {
    cb.addEventListener('focus', e => cb.parentElement.classList.add('focus'));

    cb.addEventListener('blur', e => {
        const active = document.querySelector('.focus');
        if (active) active.classList.remove('focus');
    })
});