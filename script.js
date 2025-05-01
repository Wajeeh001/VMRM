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
