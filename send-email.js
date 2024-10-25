// send-email.js

document.addEventListener('DOMContentLoaded', function () {
    const callbackForm = document.getElementById('callbackForm');
    const emailForm = document.getElementById('emailForm');

    // Handle callback request form submission
    callbackForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        const name = document.getElementById('callbackName').value;
        const phone = document.getElementById('callbackPhone').value;

        // Send the callback request using fetch
        fetch('/send-callback', { // Update with your server endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, phone }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); // Display a success message
            callbackForm.reset(); // Reset the form
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
    });

    // Handle email form submission
    emailForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        const name = document.getElementById('emailName').value;
        const email = document.getElementById('emailAddress').value;
        const message = document.getElementById('emailMessage').value;

        // Send the email using fetch
        fetch('/send-email', { // Update with your server endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); // Display a success message
            emailForm.reset(); // Reset the form
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
    });
});
