//Main template code
// Get Form, Div, and Button Elements
const form = document.getElementById('category-form');
const infoDiv = document.getElementById('entertainment-info');
const button = document.getElementById('transfer-button');

// Add Submit Event Listener to Form
form.addEventListener('submit', function(event) {
  // Prevent Form Submission
  event.preventDefault();

  // Get Selected Category
  const select = document.getElementById('category-select');
  const category = select.value;

  // Update Div Content
  infoDiv.innerHTML = `<p>You have selected the ${category} category.</p>`;

  // Show Button
  button.style.display = 'block';
});

// Add Click Event Listener to Button
button.addEventListener('click', function() {
  // Transfer to Another Page
  window.location.href = `/entertainment/category?category=${category}`;
});


//restaurant code
// Get Template Element
const template = document.getElementById('restaurant-list-template');

// Clone Template Element
const clone = template.content.cloneNode(true);

// Fill in Restaurant Details
clone.querySelector('.restaurant-item a').href = 'https://www.example.com';
clone.querySelector('.restaurant-item h2').textContent = 'Restaurant Name';
clone.querySelector('.restaurant-item .cuisine').textContent = 'Cuisine';
clone.querySelector('.restaurant-item .rating').textContent = 'Rating';
clone.querySelector('.restaurant-item .price').textContent = 'Price';

// Append Clone to DOM
document.body.appendChild(clone);
