document.addEventListener('DOMContentLoaded', () => {
  fetchData('inventoryTable', 'inventory.php');
  fetchData('inserviceTable', 'inservice.php');
  fetchData('deliveredTable', 'delivered.php');
  fetchData('customersTable', 'customers.php');
});

function fetchData(tableId, endpoint) {
  fetch(endpoint)
      .then(response => response.json())
      .then(data => populateTable(tableId, data))
      .catch(error => console.error('Error:', error));
}

function populateTable(tableId, data) {
  const table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
  table.innerHTML = '';
  data.forEach((item, index) => {
      const row = table.insertRow();
      Object.values(item).forEach(text => {
          const cell = row.insertCell();
          cell.textContent = text;
      });
      const actionCell = row.insertCell();
      actionCell.innerHTML = `
          <button class="save-btn" onclick="saveRow(this)">💾 Save</button>
          <button class="delete-btn" onclick="deleteRow(this)">❌</button>
      `;
  });
}

function addRow(tableId) {
  const table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
  const row = table.insertRow();
  // Add input fields based on tableId
  // ...
  const actionCell = row.insertCell();
  actionCell.innerHTML = `
      <button class="save-btn" onclick="submitRow(this, '${tableId}')">💾 Save</button>
      <button class="delete-btn" onclick="deleteRow(this)">❌</button>
  `;
}

function submitRow(button, tableId) {
  const row = button.closest('tr');
  const inputs = row.querySelectorAll('input, select');
  const data = {};
  inputs.forEach(input => {
      data[input.name] = input.value;
  });

  let endpoint = '';
  switch (tableId) {
      case 'inventoryTable':
          endpoint = 'inventory.php';
          break;
      case 'inserviceTable':
          endpoint = 'inservice.php';
          break;
      case 'deliveredTable':
          endpoint = 'delivered.php';
          break;
      case 'customersTable':
          endpoint = 'customers.php';
          break;
  }

  fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data)
  })
  .then(response => response.json())
  .then(() => fetchData(tableId, endpoint))
  .catch(error => console.error('Error:', error));
}

function deleteRow(button) {
  const row = button.closest('tr');
  const table = row.closest('table');
  const id = row.cells[0].innerText;

  let endpoint = '';
  switch (table.id) {
    case 'inventoryTable':
      endpoint = 'inventory.php';
      break;
    case 'inserviceTable':
      endpoint = 'inservice.php';
      break;
    case 'deliveredTable':
      endpoint = 'delivered.php';
      break;
    case 'customersTable':
      endpoint = 'customers.php';
      break;
  }

  fetch(endpoint, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `id=${id}`
  })
  .then(response => response.json())
  .then(() => {
    row.remove(); // Remove from UI
    updateIds(table.id); // Reorder IDs
  })
  .catch(error => console.error('Error deleting row:', error));
}


function deleteRow(button) {
  const row = button.closest('tr');
  row.remove();
}


function addRow(tableId) {
  const table = document.getElementById(tableId);
  const tbody = table.querySelector('tbody');
  const newRow = tbody.insertRow();
  const headerCells = table.querySelector('thead tr').cells;
  const rowIndex = tbody.rows.length;

  for (let i = 0; i < headerCells.length; i++) {
      const newCell = newRow.insertCell(i);
      const headerText = headerCells[i].innerText.trim().toLowerCase();

      if (i === 0) {
          newCell.innerText = rowIndex;
      } else if (headerText === 'status') {
          newCell.innerHTML = `
              <select>
                  <option value="available">Available</option>
                  <option value="out of stock">Out of Stock</option>
                  <option value="ordered">Ordered</option>
              </select>`;
      } else if (headerText.includes('paid') || headerText.includes('not')) {
          newCell.innerHTML = `
              <select>
                  <option value="paid">Paid</option>
                  <option value="not paid">Not Paid</option>
              </select>`;
      } else if (headerText.includes('delivery status')) {
          newCell.innerHTML = `
              <select>
                  <option value="pending">Pending</option>
                  <option value="delivered">Delivered</option>
              </select>`;
      } else if (headerText.includes('delivery date')) {
          newCell.innerHTML = `<input type="date">`;
      } else if (headerText === 'action') {
          newCell.innerHTML = `
              <button class="save-btn" onclick="saveRow(this)">💾 Save</button>
              <button class="delete-btn" onclick="deleteRow(this)">❌</button>`;
      } else {
          newCell.innerHTML = `<input type="text">`;
      }
  }
}

function deleteRow(button) {
  const row = button.closest('tr');
  const id = row.cells[0].innerText;

  fetch('inventory.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `action=delete&id=${id}`
  })
  .then(res => res.json())
  .then(result => {
    alert('Deleted from database!');
    row.remove();
  })
  .catch(err => {
    alert('Delete failed');
    console.error(err);
  });
}


function deleteRow(button) {
  const row = button.closest('tr');
  const table = row.closest('table');
  row.remove();
  updateIds(table.id);
}

function updateIds(tableId) {
  const table = document.getElementById(tableId);
  const tbody = table.querySelector('tbody');
  for (let i = 0; i < tbody.rows.length; i++) {
      tbody.rows[i].cells[0].innerText = i + 1;
  }
}

function saveRow(button) {
  alert('Row saved! (Add your own save logic here)');
}
