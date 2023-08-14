// Validate Form Submission
const formValidation = () => {    
    let inputValue = document.getElementById('inputValue').innerHTML;
    let passwordValue = document.getElementById('passwordValue').innerHTML;

    // Create a Regular Expression Representing what a Valid Email is for Comparison
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // Add an Event Listener to Button 
    document.getElementById('formButton').addEventListener('click', (event) => {
        // Prevent screen refresh
        event.preventDefault();

        if (!inputValue.match(emailRegex) && !passwordValue.length > 5) {
            alert("Invalid email and password!");
        }
        else if (inputValue.match(emailRegex) && !passwordValue.length > 5) {
            alert("Invalid password!");
        }
        else if (!inputValue.match(emailRegex) && passwordValue.length > 5) {
            alert("Invalid email!");
        }
        else if (inputValue.match(emailRegex) && passwordValue.length > 5) {
            alert("Email and password are both valid!!");
        }
    });
}