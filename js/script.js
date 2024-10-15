
const gallery = document.getElementById('gallery');

//fetch 12 random users 
fetch('https://randomuser.me/api/?results=12')
.then (response => response.json()) // used promise to convert to JSON or parse the JSON response
.then(data => displayUsers(data.results)) //again used promise to pass the data to a function to display users 
.catch (error => console.error('Error fetching data:', error)); // used .catch method to handle rejected promises and errors
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
// using fetch video

//Creating the Modal Window

// //add event listeners to user cards for opening the modal
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', event => {
        const index = card.getAttribute('data-index');
        openModal(users[index]); //open modal with the clicked user's data
    });
});
}
//function to create and display the modal
function openModal(user){
    const modalHTML = `<div class = "modal-container">
    <div class = "modal">
        <button type= "button" id="modal-close-btn" class = "modal-close-btn"><strong>X</strong> </button>
        <div class="modal-info-container">
        <img class = "modal-img" src = "${user.picture.large}" alt="profile picture">
        // 
        `
}