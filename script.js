let selectedItem = null;
let selectedCell = null;
let movingItem = false;

// Store food items for each cell using cell IDs
const foodItems = {};

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
  const previouslySelected = document.querySelector('.drag-item.selected');
  if (previouslySelected) {
    previouslySelected.classList.remove('selected');
  }

  selectedItem = event.currentTarget;
  selectedItem.classList.add('selected');
  movingItem = false;
}

// Function to handle cell click
function handleCellClick(event) {
  const cell = event.currentTarget;
  if (selectedItem && !movingItem) {
    if (cell.children.length === 0) {
      const itemClone = selectedItem.cloneNode(true); // Clone the selected item
      itemClone.onclick = handleCellItemClick; // Add click event to cloned item
      cell.innerHTML = '';
      cell.appendChild(itemClone);

      // Initialize food items for the new cell if not exists
      const cellId = cell.id;
      if (!foodItems[cellId]) {
        foodItems[cellId] = [];
      }

      // Clear the selection
      selectedItem.classList.remove('selected');
      selectedItem = null;
    }
  } else if (movingItem) {
    if (cell.children.length === 0) {
      cell.appendChild(selectedItem);
      selectedCell.innerHTML = ''; // Clear the previous cell
      selectedCell = null;
      selectedItem = null;
      movingItem = false;
      document.getElementById('sidenav2').style.display = 'none';
    }
  } else {
    if (event.currentTarget.children.length > 0) {
      selectedCell = event.currentTarget;
      const cellId = event.currentTarget.id;
      showOptions(cellId);
    }
  }
}

// Function to show options for selected cell
function showOptions(cellId) {
  document.getElementById('sidenav2').style.display = 'flex';
  const addFoodButton = document.getElementById('add-food');
  const foodListContainer = document.getElementById('food-list-container');
  if (selectedItem.id.includes('fridge') || selectedItem.id.includes('cabinet')) {
    // Show options related to fridge
    document.getElementById('add-food').style.display = 'block';
    document.getElementById('food-list-container').style.display = 'block';
  } else {
    // Hide options related to non-fridge items
    document.getElementById('add-food').style.display = 'none';
    document.getElementById('food-list-container').style.display = 'none';
  }
  displayFoodItems(cellId);
}

// Function to display food items in the table
function displayFoodItems(cellId) {
  const tableBody = document.querySelector('#food-list tbody');
  tableBody.innerHTML = ''; // Clear existing items

  if (!foodItems[cellId]) {
    foodItems[cellId] = [];
  }

  foodItems[cellId].forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>${item.expiry}</td>
      <td><button class="remove-food-item" data-cell-id="${cellId}" data-item-name="${item.name}">Remove</button></td>
    `;
    tableBody.appendChild(row);
  });
}

// Function to handle remove button click
function handleRemoveFoodItemClick(event) {
  if (event.target && event.target.classList.contains('remove-food-item')) {
    const cellId = event.target.dataset.cellId;
    const itemName = event.target.dataset.itemName;
    removeFoodItem(cellId, itemName); // Call removeFoodItem with parameters
  }
}

// Function to remove food item
function removeFoodItem(cellId, itemName) {
  if (foodItems[cellId]) {
    foodItems[cellId] = foodItems[cellId].filter(item => item.name !== itemName);
    displayFoodItems(cellId); // Refresh the food list display
  }
}

// Attach event listener to table body for removing food items
document.querySelector('#food-list tbody').addEventListener('click', handleRemoveFoodItemClick);


// Function to delete selected item
function deleteItem() {
  if (selectedCell) {
    selectedCell.innerHTML = ''; // Remove item from cell
    delete foodItems[selectedCell.id]; // Remove food items list for the cell
    selectedCell = null;
  }
  document.getElementById('sidenav2').style.display = 'none';
}

// Function to handle cell item click
function handleCellItemClick(event) {
  selectedCell = event.currentTarget.parentElement;
  selectedItem = event.currentTarget;
  movingItem = true;
  showOptions(event.currentTarget.parentElement.id);
  event.stopPropagation();
}

// Initialize the grid
createGrid(4, 6); // Create a 4x6 grid

// Attach click event to drag items
const dragItems = document.querySelectorAll('.drag-item');
dragItems.forEach(item => {
  item.onclick = selectItem;
  // Ensure each drag item has a unique identifier
  item.dataset.itemId = item.id; // Set a unique ID for each drag item
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
    const cellId = selectedCell.id;
    if (!foodItems[cellId]) {
      foodItems[cellId] = [];
    }
    foodItems[cellId].push({ name, qty, expiry });
    displayFoodItems(cellId); // Refresh the food list display
    modal.style.display = 'none';
    // Clear input fields after submission
    document.getElementById('food-name').value = '';
    document.getElementById('food-qty').value = '';
    document.getElementById('food-expiry').value = '';
  } else {
    alert('Please fill out all fields.');
  }
};

const xButton = document.getElementById('xButton');
xButton.addEventListener('click', () => {
  document.getElementById('sidenav2').style.display = 'none';
})