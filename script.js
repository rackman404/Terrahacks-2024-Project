let selectedItem = null;
let selectedCell = null;
let movingItem = false;

// Function to create the grid
function createGrid(rows, cols) {
  const gridContainer = document.getElementById('grid-container');

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const gridItem = document.createElement('div');
      gridItem.className = 'grid-item';
      gridItem.id = `cell${i * cols + j + 1}`;
      gridItem.dataset.row = i;
      gridItem.dataset.col = j;
      gridItem.onclick = handleCellClick; // Set click event to handle cell actions
      gridContainer.appendChild(gridItem);
    }
  }
}

// Function to handle item selection
function selectItem(event) {
  // Remove 'selected' class from previously selected item
  const previouslySelected = document.querySelector('.drag-item.selected');
  if (previouslySelected) {
    previouslySelected.classList.remove('selected');
  }

  // Set the clicked item as selected
  selectedItem = event.currentTarget;
  selectedItem.classList.add('selected');
  movingItem = false;
}

// Function to handle cell click
function handleCellClick(event) {
  const cell = event.currentTarget;
  if (selectedItem && !movingItem) {
    if (cell.children.length === 0) {
      // Place item into cell
      const itemClone = selectedItem.cloneNode(true); // Clone the selected item
      itemClone.onclick = handleCellItemClick; // Add click event to cloned item
      cell.innerHTML = '';
      cell.appendChild(itemClone);
      // Clear the selection
      selectedItem.classList.remove('selected');
      selectedItem = null;
    }
  } else if (movingItem) {
    if (cell.children.length === 0) {
      // Move the item to the new cell
      cell.appendChild(selectedItem);
      selectedCell.innerHTML = ''; // Clear the previous cell
      selectedCell = null;
      selectedItem = null;
      movingItem = false;
      document.getElementById('sidenav2').style.display = 'none';
    }
  } else {
    // Display options if an item is clicked in the cell
    if (event.currentTarget.children.length > 0) {
      selectedCell = event.currentTarget;
      showOptions(selectedCell.children[0].id);
    }
  }
}

// Function to show options for selected item
function showOptions(itemId) {
  document.getElementById('sidenav2').style.display = 'flex';
  const addFoodButton = document.getElementById('add-food');
  const foodListContainer = document.getElementById('food-list-container');
  if (itemId.includes('fridge') || itemId.includes('cabinet')) {
    addFoodButton.style.display = 'block';
    foodListContainer.style.display = 'block';
  } else {
    addFoodButton.style.display = 'none';
    foodListContainer.style.display = 'none';
  }
}

// Function to delete selected item
function deleteItem() {
  if (selectedCell) {
    selectedCell.innerHTML = ''; // Remove item from cell
    selectedCell = null;
  }
  document.getElementById('sidenav2').style.display = 'none';
}

// Function to handle cell item click
function handleCellItemClick(event) {
  selectedCell = event.currentTarget.parentElement;
  selectedItem = event.currentTarget;
  movingItem = true;
  showOptions(event.currentTarget.id);
  event.stopPropagation();
}

// Initialize the grid
createGrid(4, 6); // Create a 4x6 grid

// Attach click event to drag items
const dragItems = document.querySelectorAll('.drag-item');
dragItems.forEach(item => {
  item.onclick = selectItem;
});

// Attach event listener to delete button
document.getElementById('delete-item').onclick = deleteItem;

// Modal element and its close button
const modal = document.getElementById('food-modal');
const closeModal = document.querySelector('#food-modal .close');

// Open the modal when the add food button is clicked
document.getElementById('add-food').onclick = function() {
  modal.style.display = 'block';
};

// Close the modal when the close button is clicked
closeModal.onclick = function() {
  modal.style.display = 'none';
};

// Close the modal when clicking outside of the modal content
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Handle form submission
document.getElementById('save-food').onclick = function() {
  const name = document.getElementById('food-name').value;
  const qty = document.getElementById('food-qty').value;
  const expiry = document.getElementById('food-expiry').value;

  if (name && qty && expiry) {
    addFoodToList(name, qty, expiry);
    modal.style.display = 'none';
    // Clear input fields after submission
    document.getElementById('food-name').value = '';
    document.getElementById('food-qty').value = '';
    document.getElementById('food-expiry').value = '';
  } else {
    alert('Please fill out all fields.');
  }
};

// Function to add food item to the list
function addFoodToList(name, qty, expiry) {
  const tableBody = document.querySelector('#food-list tbody');
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${name}</td>
    <td>${qty}</td>
    <td>${expiry}</td>
  `;

  tableBody.appendChild(row);
}
