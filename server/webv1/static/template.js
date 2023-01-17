// Get Form, Div, and Button Elements
const form = document.getElementById('category-form');
const button = document.getElementById('transfer-button');

// Add Submit Event Listener to Form
form.addEventListener('submit', function(event) {
  // Prevent Form Submission
  event.preventDefault();

  // Get Selected Category
  const select = document.getElementById('category-select');
  const category = select.value;

  //Transfer to another page 
  window.location.href = '/component_view?category_type=' + category;
});