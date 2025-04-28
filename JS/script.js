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

function addRow(tableId) {
    const table = document.getElementById(tableId).querySelector('tbody');
    const newRow = table.insertRow();
  
    const columns = {
      inserviceTable: [
        'Vehicle ID', 'Type Vehicle', 'Changed Parts', 'Labour Charges', 'Parts Charged Cost', 'Total Cost', 'Delivery Date', 'Delivery Status'
      ],
      deliveredTable: [
        'Vehicle ID', 'Type Vehicle', 'Changed Parts', 'Total Cost (Paid/Not)', 'Delivered Status'
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
      } else {
        cell.innerHTML = `<input type="text" placeholder="${col}">`;
      }
    });
  
    const actionCell = newRow.insertCell();
    actionCell.innerHTML = `<button class="deleteBtn" onclick="deleteRow(this, '${tableId}')">❌</button>`;
  
    updateIds(tableId);
  }
  
  function deleteRow(btn, tableId) {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateIds(tableId);
  }
  
  function updateIds(tableId) {
    const table = document.getElementById(tableId).querySelector('tbody');
    const rows = table.querySelectorAll('tr');
    rows.forEach((row, index) => {
      row.cells[0].innerText = index + 1;
    });
  }
  

