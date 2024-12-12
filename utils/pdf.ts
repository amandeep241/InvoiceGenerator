import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
// import * as FileSystem from 'expo-file-system';

const getTotal = (itemPrice, itemQuantity) => {
  return (Number(itemPrice * itemQuantity).toFixed(2))
}

const generateHTML = (invoice: any) => {


const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #eef2f7;
    }
    .container {
      max-width: 800px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
      padding: 20px 30px;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #dcdcdc;
      padding-bottom: 15px;
      margin-bottom: 20px;
    }
    header h1 {
      font-size: 28px;
      color: #333333;
    }
    .sender-details {
      text-align: right;
      font-size: 14px;
      color: #333333;
    }
    .sender-details p {
      margin: 0;
    }
    .bill-to {
      margin-bottom: 30px;
    }
    .bill-to h2 {
      font-size: 20px;
      color: #444444;
      margin-bottom: 10px;
    }
    .bill-to p {
      margin: 5px 0;
      font-size: 16px;
      color: #333333;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    table th, table td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
      font-size: 16px;
    }
    table th {
      background-color: #f7f7f7;
      color: #333333;
    }
    table tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    .totals {
      margin-top: 20px;
      text-align: right;
    }
    .totals p {
      font-size: 18px;
      margin: 5px 0;
    }
    .totals .total-due {
      font-size: 20px;
      font-weight: bold;
      color: #333333;
      margin-top: 10px;
    }
    footer {
      margin-top: 30px;
      text-align: center;
      font-size: 14px;
      color: #888888;
    }
    .highlight {
      color: #4caf50;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header Section -->
    <header>
      <h1>Invoice</h1>
      <!-- Sender Details Section -->
      <div class="sender-details">
        <p><strong>${invoice.senderInfo.name}</strong></p>
        ${invoice.senderInfo.email ? `<p>${invoice.senderInfo.email}</p>` : ''}
        ${invoice.senderInfo.phone ? `<p>${invoice.senderInfo.phone}</p>` : ''}
        ${invoice.senderInfo.address ? `<p>${invoice.senderInfo.address}</p>` : ''}
        ${invoice.senderInfo.website ? `<p>${invoice.senderInfo.website}</p>` : ''}
      </div>
    </header>

    <!-- Bill To Section -->
    <div class="bill-to">
      <h2>Bill To:</h2>
      <p><strong>Name:</strong> ${invoice.recipientInfo.name}</p>
      ${invoice.recipientInfo.email ? `
        <p><strong>Email:</strong> ${invoice.recipientInfo.email}</p>
      ` : ''}
      ${invoice.recipientInfo.phone ? `
        <p><strong>Phone:</strong> ${invoice.recipientInfo.phone}</p>
      ` : ''}
      ${invoice.recipientInfo.address ? `
        <p><strong>Address:</strong> ${invoice.recipientInfo.address}</p>
      ` : ''}
    </div>

    <!-- Items Table -->
    <table>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${invoice.items.map((item) => `
          <tr>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>${getTotal(item.price, item.quantity)}</td>
          </tr>
        `)}
      </tbody>
    </table>

    <!-- Totals Section -->
    <div class="totals">
      <p><strong>Subtotal:</strong> ${Number(invoice.grandTotal.subTotal).toFixed(2)}</p>
      <p><strong>Tax ${invoice.taxInfo.taxPercentage}%:</strong> ${Number(invoice.grandTotal.taxAmount).toFixed(2)}</p>
      <p class="total-due">TOTAL DUE (AUD): <span> ${Number(invoice.grandTotal.totalDue).toFixed(2)}</span></p>
    </div>

    <!-- Footer -->
    <footer>
      Thank you for your business! If you have any questions about this invoice, please contact us at ${invoice.senderInfo.email}
    </footer>
  </div>
</body>
</html>

`;

return html

}


export const generateInvoicePDF = async (invoice: any) => {
  // On iOS/android prints the given html. On web prints the HTML from the current page.
  const { uri } = await Print.printToFileAsync({ html: generateHTML(invoice) });
  
  // const permanentUri = FileSystem.documentDirectory + 'invoice.pdf'
  // const file = await FileSystem.moveAsync({
  //   from: uri,
  //   to: permanentUri
  // });
  // console.log('File has been moved to:', permanentUri);
  console.log('File has been saved to:', uri);
  await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
};