# Treehouse FSJS Techdegree - Project 3 Interactive Form

### The "Name" field

- Line 23-43: I set the default visibility rules on form elements by adding an event listener on the window interface. When page loads, name fields is focused initially. Other job role field, PayPal and bitcoin payment information are hidden, and the select colour element is disabled. Also, this event listener clears activity selections and makes credit card as the default payment method.

### "Job Role" section

- Line 46:53: Added an event listener on the job role select element. When the user selects "other" option, it will display other text input element.

### "T-Shirt Info" section

- Line: 56:69: Populates the data in the select colour element according to the user's design selection. Colour selection is disabled until the user selects the design.

### "Register for Activities" section

- Line 71:101: Event listener on the activities fieldset calculates the total costs according to users selections while preventing users from selecting activities that occur at the same time by disabling the other activity.**(exceeds)**

### "Payment Info" section

- Line 103:119: Displays the form fields according to the selected payment method.

### Form validation

- Line 121:132: Shows and hides validation errors
- Line 135:143: This validator check name field is not empty and contains first name optional middle and last name.
- Line 146:163: This validator check email field is not empty and contains a valid email address. Validator changes the error message if the email field is blank.**(exceeds)**
- Line 165:175: Activity validator checks at least one activity is checked.
- Line 177:217: This section includes three validators that check credit card number, zip code and CVV.
- Line 219:225: Accomplished realtime form validation by adding "keyup" and "change" event listeners to form fields.**(exceeds)**
- Line 227:253: Added form validation to form submission event. If any validation rule fails, form submission is prevented.

### Accessibility

- Line 255:263: Adds or removes "focus" class name from the class list on users interaction.