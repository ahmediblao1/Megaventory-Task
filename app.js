fetch('purchaseorders.json')
  .then(response => response.json())
  .then(data => {
    parseOrders(data);
  })
  .catch(error => {
    console.error('Error fetching JSON data:', error);
  });

function parseOrders(data) {
  const orderList = document.getElementById('order-list');

  data.mvPurchaseOrders.forEach(order => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.textContent = `${order.PurchaseOrderTypeAbbreviation} - ${order.PurchaseOrderNo}`;
    link.href = '#';

    link.addEventListener('click', () => {
      displayOrderDetails(order);
    });

    listItem.appendChild(link);
    orderList.appendChild(listItem);
  });
}

function displayOrderDetails(order) {
    const popupWindow = window.open('', 'Order Details', 'width=500,height=500');
    const container = popupWindow.document.createElement('div');
    container.style.padding = '20px';
  
    const title = popupWindow.document.createElement('h2');
    title.textContent = `Order Details: ${order.PurchaseOrderNo}`;
    container.appendChild(title);
  
    const orderInfoTable = createTable(['Field', 'Value']);
    addTableRow(orderInfoTable, 'Purchase Order Address', order.PurchaseOrderAddress);
    addTableRow(orderInfoTable, 'Purchase Order ContactPerson', order.PurchaseOrderContactPerson);
    addTableRow(orderInfoTable, 'Purchase Order Status ', order.PurchaseOrderStatus);
    container.appendChild(orderInfoTable);
  
    const detailsTitle = popupWindow.document.createElement('h3');
    detailsTitle.textContent = 'Purchase Order Details';
    container.appendChild(detailsTitle);
  
    const detailsTable = createTable(['Product SKU', 'Quantity Ordered', 'Unit Price', 'Total Amount']);
    order.PurchaseOrderDetails.forEach(detail => {
      addTableRow(detailsTable, detail.PurchaseOrderRowProductSKU, detail.PurchaseOrderRowQuantity, detail.PurchaseOrderRowUnitPriceWithoutTaxOrDiscount, detail.PurchaseOrderRowTotalAmount);
    });
    container.appendChild(detailsTable);
  
    popupWindow.document.body.appendChild(container);
  }
    
  
  function createTable(headers) {
    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    table.style.width = '100%';
  
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
      const headerCell = document.createElement('th');
      headerCell.textContent = headerText;
      headerCell.style.padding = '8px';
      headerCell.style.border = '1px solid #ddd';
      headerCell.style.textAlign = 'left';
      headerRow.appendChild(headerCell);
    });
  
    table.appendChild(headerRow);
    return table;
  }
  
  function addTableRow(table, ...cellValues) {
    const row = document.createElement('tr');
    cellValues.forEach(cellValue => {
      const cell = document.createElement('td');
      cell.textContent = cellValue;
      cell.style.padding = '8px';
      cell.style.border = '1px solid #ddd';
      row.appendChild(cell);
    });
  
    table.appendChild(row);
  }
  