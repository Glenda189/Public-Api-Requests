
const gallery = document.getElementById('gallery');

// reference fetch video
//fetch 12 random users 
fetch('https://randomuser.me/api/?results=12')
.then (response => response.json()) // used promise and arrow method to convert to JSON or parse the JSON response
.then(data => displayUsers(data.results)) //again used promise to pass the data to a function to display users 
.catch (error => console.log('Looks like there was a problem!', error)); // used .catch method to handle rejected promises and errors
//function to display users 
function displayUsers(users){
    users.forEach((user,index) =>{
        const userCard= `
    <div class='card' data-index="${index}">
       <div class="card-img-container">
        <img class="card-img" src="${user.picture.large}" alt="profile picture">
        </div>
        <div class='card-info-container'>
        <h3 id="name" class="card-name cap"> ${user.name.first} ${user.name.last}</h3>
        <p class = "card-text">${user.email}</p>
        <p class="card-text cap"> ${user.location.city}, ${user.location.state}</p>
        </div>
    </div>`;
    gallery.insertAdjacentHTML('beforeend',userCard);
    });

// //add event listeners to user cards for opening the modal
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', event => {
        const index = card.getAttribute('data-index');
        openModal(users[index]); //open modal with the clicked user's data
    });
});
}
// *
//function to create and display the modal
function openModal(user){
    const modalHTML = `<div class = "modal-container">
    <div class = "modal">
        <button type= "button" id="modal-close-btn" class = "modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
        <img class = "modal-img" src = "${user.picture.large}" alt="profile picture">
        <h3 id="name" class = "modal-name cap">${user.name.first} ${user.name.last}</h3>
        <p class = "modal-text"> ${user.email}</p>
        <p class = "modal-tex cap"> ${user.location.city}</p>
        <hr>
        <p class = "modal-text">${user.cell}</p>
        <p class = "modal-text"> ${user.location.street.number} ${user.location.street.name}, ${user.location.state},${user.location.postcode}</p>
        <p class = "modal-text">Birthday: ${new Date (user.dob.date).toLocaleDateString()}</p>
        </div>
    </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

//close the modal when "X" is clicked
document.getElementById('modal-close-btn').addEventListener('click', () => {
    document.querySelector('.modal-container').remove();
});

//close modal when clicking outside of it 
window.addEventListener('click', (event) => {
    const modalContainer = document.querySelector('.modal-container');
    if (event.target === modalContainer) {
        modalContainer.remove();
    }
});













// search functionality 
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const name = card.querySelector('.card-name').textContent.toLowerCase();
        if (name.includes(searchTerm)) {
            card.style.display = ''; 
        } else {
            card.style.display = "none";
        }
    });
});
}
