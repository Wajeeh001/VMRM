"use strict";

// Inventory
const addRowBtn = document.getElementById('addRowBtn');
const tableBody = document.querySelector('#inventoryTable tbody');

// Function to reassign IDs based on current row
function updateIDs() {
  const rows = tableBody.querySelectorAll('tr');
  rows.forEach((row, index) => {
    row.querySelector('td').textContent = index + 1;
  });
}

// Add Row to Inventory Table with Dropdowns for Paid/Not Paid and Delivery Status
addRowBtn.addEventListener('click', () => {
  const row = document.createElement('tr');

  row.innerHTML = `
    <td></td> <!-- ID will be set dynamically -->
    <td><input type="text" placeholder="Vehicle ID"></td>
    <td><input type="text" placeholder="Vehicle Type"></td>
    <td><input type="text" placeholder="Changed Parts"></td>
    <td><input type="text" placeholder="Total Cost"></td>
    <td><input type="text" placeholder="Order Number"></</td>
    <td>
      <select>
        <option value="Available">Available</option>
        <option value="Out of Stock">Out of Stock</option>
        <option value="Ordered">Ordered</option>
      </select>
    </td>
    <td><button class="deleteBtn">❌</button></td>
  `;
  tableBody.appendChild(row);
  updateIDs();

  // Add event listener to delete button for this row
  row.querySelector('.deleteBtn').addEventListener('click', () => {
    row.remove();
    updateIDs();
  });
});

// Add row to other tables dynamically (like inserviceTable, deliveredTable, etc.)
function addRow(tableId) {
  const table = document.getElementById(tableId).querySelector('tbody');
  const newRow = table.insertRow();

  const columns = {
    inserviceTable: [
      'Vehicle ID', 'Type Vehicle', 'Changed Parts', 'Labour Charges', 'Parts Charged Cost', 'Total Cost', 'Delivery Date',
    ],
    deliveredTable: [
      'Vehicle ID', 'Type Vehicle', 'Changed Parts', 'Total Cost', '(Paid/Not)', 'Delivery Status'
    ],
    customersTable: [
      'Name', 'Vehicle Type', 'Vehicle ID', 'Remaining Charges', 'Address'
    ]
  };

  newRow.insertCell().innerText = '';

  columns[tableId].forEach(col => {
    const cell = newRow.insertCell();
    if (col === 'Delivery Date') {
      cell.innerHTML = `<input type="date">`;
    } else if (col === '(Paid/Not)') {
      cell.innerHTML = `
        <select>
          <option value="Paid">Paid</option>
          <option value="Not Paid">Not Paid</option>
        </select>
      `;
    } else if (col === 'Delivery Status') {
      cell.innerHTML = `
        <select>
          <option value="Delivered">Delivered</option>
          <option value="Not Delivered">Not Delivered</option>
        </select>
      `;
    } else {
      cell.innerHTML = `<input type="text" placeholder="${col}">`;
    }
  });

  const actionCell = newRow.insertCell();
  actionCell.innerHTML = `<button class="deleteBtn" onclick="deleteRow(this, '${tableId}')">❌</button>`;

  updateIds(tableId);
}

// Function to delete row
function deleteRow(btn, tableId) {
  const row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
  updateIds(tableId);
}

// Function to update IDs dynamically
function updateIds(tableId) {
  const table = document.getElementById(tableId).querySelector('tbody');
  const rows = table.querySelectorAll('tr');
  rows.forEach((row, index) => {
    row.cells[0].innerText = index + 1;
  });
}
