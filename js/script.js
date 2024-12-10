const gallery = document.getElementById('gallery');
let users = []; // Array to hold all the users globally

// Fetch 12 random users from the API
fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json()) 
    .then(data => {
        users = data.results; // Store the fetched users globally
        displayUsers(users); // Display users when the data is loaded
    })
    .catch(error => console.log('Looks like there was a problem!', error));

// Function to display users on the home screen
function displayUsers(users) {
    gallery.innerHTML = ''; // Clear gallery before adding new users
    users.forEach((user, index) => {
        const userCard = `
            <div class='card' data-index="${index}">
                <div class="card-img-container">
                    <img class="card-img" src="${user.picture.large}" alt="profile picture">
                </div>
                <div class='card-info-container'>
                    <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                    <p class="card-text">${user.email}</p>
                    <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                </div>
            </div>`;
        gallery.insertAdjacentHTML('beforeend', userCard);
    });

    // Add event listeners to user cards for opening the modal
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', event => {
            const index = card.getAttribute('data-index');
            openModal(users[index]); // Open modal with the clicked user's data
        });
    });
}

// Function to create and display the modal
function openModal(user) {
    const modalHTML = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                    <p class="modal-text">${user.email}</p>
                    <p class="modal-text cap">${user.location.city}</p>
                    <hr>
                    <p class="modal-text">${user.cell}</p>
                    <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.state}, ${user.location.postcode}</p>
                    <p class="modal-text">Birthday: ${new Date(user.dob.date).toLocaleDateString()}</p>
                    <button id="back-to-directory-btn">Back to Directory</button> 
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Close the modal when "X" is clicked
    document.getElementById('modal-close-btn').addEventListener('click', () => {
        document.querySelector('.modal-container').remove();
    });

    // Close modal when clicking outside of it 
    window.addEventListener('click', (event) => {
        const modalContainer = document.querySelector('.modal-container');
        if (event.target === modalContainer) {
            modalContainer.remove();
        }
    });

    // Back to directory button functionality
    document.getElementById('back-to-directory-btn').addEventListener('click', () => {
        document.querySelector('.modal-container').remove(); // Remove modal
        displayUsers(users); // Show the employee directory again
    });
}

// Search functionality
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const name = card.querySelector('.card-name').textContent.toLowerCase();
        if (name.includes(searchTerm)) {
            card.style.display = ''; // Show matching card
        } else {
            card.style.display = "none"; // Hide non-matching card
        }
    });
});
