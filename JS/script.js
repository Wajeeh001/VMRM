"use strict";

// Inventory

const addRowBtn = document.getElementById('addRowBtn');
const tableBody = document.querySelector('#inventoryTable tbody');

// Function to reassign IDs based on current rows
function updateIDs() {
  const rows = tableBody.querySelectorAll('tr');
  rows.forEach((row, index) => {
    row.querySelector('td').textContent = index + 1; // Set first td (ID) to (index + 1)
  });
}

addRowBtn.addEventListener('click', () => {
  const row = document.createElement('tr');

  row.innerHTML = `
  <td></td> <!-- ID will be set dynamically -->
  <td><input type="text" placeholder="Enter Name"></td>
  <td><input type="text" placeholder="Vehicle Type"></td>
  <td><input type="number" placeholder="Price"></td>
  <td><input type="number" placeholder="Quantity"></td>
  <td><input type="text" placeholder="Order Number"></td>
  <td>
    <select class="status-filter">
      <option value="In Stock">In Stock</option>
      <option value="Ordered">Ordered</option>
      <option value="Out of Stock">Out of Stock</option>
    </select>
  </td>
  <td><button class="deleteBtn">❌</button></td>
`;
  tableBody.appendChild(row);
  updateIDs();
  row.querySelector('.deleteBtn').addEventListener('click', () => {
    row.remove();
    updateIDs();
  });
});

