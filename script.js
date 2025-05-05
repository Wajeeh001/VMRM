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
      <button class="save-btn" onclick="saveRow(this, '${tableId}')">💾 Save</button>
      <button class="delete-btn" onclick="deleteRow(this, '${tableId}')">❌</button>
    `;
  });
}

function addRow(tableId) {
  const table = document.getElementById(tableId);
  const tbody = table.querySelector('tbody');
  const newRow = tbody.insertRow();
  const columns = table.querySelector('thead tr').cells.length - 1; // Exclude action column

  for (let i = 0; i < columns; i++) {
    const cell = newRow.insertCell(i);
    
    if (i === 0) {
      cell.textContent = tbody.rows.length;
    }
    else if (tableId === 'customersTable') {
      switch (i) {
        case 1: // Name
          cell.innerHTML = '<input type="text" name="Name" required>';
          break;
        case 2: // Contact
          cell.innerHTML = '<input type="text" name="VehicleType">';
          break;
        case 3: // Email
          cell.innerHTML = '<input type="text" name="VehicleID">';
          break;
        case 4: // Address
          cell.innerHTML = '<input type="text" name="RemainingCharges">';
          break;
        case 5: // Address
          cell.innerHTML = '<input type="text" name="Address">';
        break;
      }
    }
    else if (tableId === 'inserviceTable') {
      switch (i) {
        case 1: // Vehicle ID
          cell.innerHTML = '<input type="text" name="VehicleId">';
          break;
        case 2: // Type Vehicle
          cell.innerHTML = '<input type="text" name="TypeVehicle">';
          break;
        case 3: // Changed Parts
          cell.innerHTML = '<input type="text" name="ChangedParts">';
          break;
        case 4: // Labour Charges
          cell.innerHTML = '<input type="number" name="LabourCharges" value="0">';
          break;
        case 5: // Parts Charged Cost
          cell.innerHTML = '<input type="number" name="PartsChangedCost" value="0">';
          break;
        case 6: // Total Cost (auto-calculated)
          cell.innerHTML = '<span class="total-cost">0</span>';
          const labourInput = newRow.cells[4].querySelector('input');
          const partsInput = newRow.cells[5].querySelector('input');
          
          const calculateTotal = () => {
            const labour = parseFloat(labourInput.value) || 0;
            const parts = parseFloat(partsInput.value) || 0;
            cell.querySelector('.total-cost').textContent = (labour + parts).toFixed(2);
          };
          
          labourInput.addEventListener('input', calculateTotal);
          partsInput.addEventListener('input', calculateTotal);
          break;
        case 7: // Delivery Date
          cell.innerHTML = '<input type="date" name="DeliveryDate">';
          break;
      }
    }
    else if (tableId === 'deliveredTable') {
      switch (i) {
        case 1: // Vehicle ID
          cell.innerHTML = '<input type="text" name="VehicleId">';
          break;
        case 2: // Type vehicle
          cell.innerHTML = `
            <input type="text" name="VehicleType">
          `;
          break;
          case 3: // changed parts
          cell.innerHTML = `
            <input type="text" name="ChangedParts">
          `;
          break;

          case 4: // total cost
          cell.innerHTML = `
            <input type="text" name="TotalCost">
          `;
          break;
          case 5: // payment status
          cell.innerHTML = `
            <select name="PaidStatus">
              <option value="Paid">Paid</option>
              <option value="Not Paid" selected>Not Paid</option>
            </select>
          `;
          break;

          case 6: // Delivery Status
          cell.innerHTML = `
            <select name="DeliveryStatus">
              <option value="Delivered">Delivered</option>
              <option value="Not Delivered">Not Delivered</option>
            </select>
          `;
          break;
        default:
          cell.innerHTML = '<input type="text">';
      }
    }
    else if (tableId === 'inventoryTable') {
      switch (i) {
        case 1: // Part Name
          cell.innerHTML = '<input type="text" name="PartName">';
          break;
        case 2: // Vehicle Type
          cell.innerHTML = '<input type="text" name="VehicleType">';
          break;
        case 3: // Price
          cell.innerHTML = '<input type="number" name="Price">';
          break;
        case 4: // Quantity
          cell.innerHTML = '<input type="number" name="Quantity">';
          break;
        case 5: // Order Number
          cell.innerHTML = '<input type="text" name="OrderedNumber">';
          break;
        case 6: // Status
          cell.innerHTML = `
            <select name="Status">
              <option value="Available">Available</option>
              <option value="Ordered">Ordered</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          `;
          break;
      }
    }
    else {
      cell.innerHTML = '<input type="text">';
    }
  }

  // Action buttons
  const actionCell = newRow.insertCell(columns);
  actionCell.innerHTML = `
    <button class="save-btn" onclick="saveRow(this, '${tableId}')">💾 Save</button>
    <button class="delete-btn" onclick="deleteRow(this, '${tableId}')">❌</button>
  `;
}

async function saveRow(button, tableId) {
  const row = button.closest('tr');
  const inputs = row.querySelectorAll('input, select');
  const data = {};
  
  if (tableId === 'deliveredTable') {
    const vehicleType = row.querySelector('[name="VehicleType"]').value;
    if (!vehicleType) {
      alert('Vehicle Type is required!');
      return;
    }
  }
  inputs.forEach(input => {
    data[input.name] = input.value;
  });

  console.log("Sending data to backend:", data);

  const endpoint = tableId.replace('Table', '.php');
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data)
    });
    
    const result = await response.json();
    console.log("Backend response:", result);
    
    if (result.success) {
      alert('Saved successfully!');
      inputs.forEach(input => {
        const value = input.value;
        const parent = input.parentNode;
        parent.textContent = value;
      });
      
      if (result.insert_id) {
        row.cells[0].textContent = result.insert_id;
      }
      
      button.onclick = function() { editRow(this, tableId); };
    } else {
      throw new Error(result.message || 'Save failed');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error saving: ' + error.message);
  }
}

async function deleteRow(button, tableId) {
  if (!confirm('Are you sure you want to delete this record?')) return;
  
  const row = button.closest('tr');
  const id = row.cells[0].textContent;
  const endpoint = tableId.replace('Table', '.php');

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `action=delete&id=${id}`
    });
    
    const result = await response.json();
    
    if (result.success) {
      row.remove();
      updateIds(tableId);
      alert('Deleted successfully!');
    } else {
      throw new Error(result.message || 'Delete failed');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Delete failed: ' + error.message);
  }
}

function updateIds(tableId) {
  const table = document.getElementById(tableId);
  const tbody = table.querySelector('tbody');
  Array.from(tbody.rows).forEach((row, index) => {
    row.cells[0].textContent = index + 1;
  });
}