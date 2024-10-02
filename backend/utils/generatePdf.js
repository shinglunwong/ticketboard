
const PDFDocument = require('pdfkit');

const generatePdf = (invoiceConfig, clientDetail, paymentDetail, res) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice_${paymentDetail.title.replace(/\s+/g, '_')}.pdf`);

    // Pipe the PDF into the response
    doc.pipe(res);

    // Company Information
    doc
        .fontSize(20)
        .text(invoiceConfig.name, 150, 45, { align: 'right' })
        .fontSize(10)
        .text(`Phone: ${invoiceConfig.phone}`, 400, 65, { align: 'right' })
        .text(`Email: ${invoiceConfig.email}`, 400, 75, { align: 'right' })
        .moveDown();

    // Invoice Title
    doc
        .fontSize(25)
        .text('INVOICE', 50, 150)
        .moveDown();

    // Billing Information
    doc
        .fontSize(12)
        .text('Bill To:', 50, 200)
        .font('Helvetica-Bold')
        .text(clientDetail.username, 50, 215)
        .font('Helvetica')
        .text(`Phone: ${clientDetail.phone}`, 50, 230)
        .text(`Email: ${clientDetail.email}`, 50, 245)
        .moveDown();

    // Invoice Details
    doc
        .fontSize(12)
        .text(`Invoice Date: ${new Date().toLocaleDateString()}`, 400, 200, { align: 'right' })
        .text(`Due Date: ${new Date(paymentDetail.dueDate).toLocaleDateString()}`, 400, 215, { align: 'right' })
        .moveDown();

    // Invoice Table Header
    const tableTop = 300;
    const itemCodeX = 50;
    const descriptionX = 150;
    const amountX = 400;

    doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .text('Item', itemCodeX, tableTop)
        .text('Description', descriptionX, tableTop)
        .text('Amount', amountX, tableTop, { align: 'right' })
        .moveDown();

    // Draw a line below the header
    doc
        .moveTo(50, tableTop + 15)
        .lineTo(550, tableTop + 15)
        .stroke();

    // Invoice Table Content
    const items = [
        {
            item: paymentDetail.title,
            description: paymentDetail.description,
            amount: `$${Number(paymentDetail.amount).toFixed(2)}`
        }
    ];

    let positionY = tableTop + 25;

    doc.font('Helvetica');

    items.forEach(item => {
        doc
            .fontSize(12)
            .text(item.item, itemCodeX, positionY)
            .text(item.description, descriptionX, positionY)
            .text(item.amount, amountX, positionY, { align: 'right' });
        positionY += 20;

        // Draw a line after each item
        doc
            .moveTo(50, positionY)
            .lineTo(550, positionY)
            .stroke();
        positionY += 5;
    });

    // Total Amount
    doc
        .font('Helvetica-Bold')
        .text('Total:', descriptionX, positionY + 10)
        .text(`$${Number(paymentDetail.amount).toFixed(2)}`, amountX, positionY + 10, { align: 'right' });

    // Footer Remarks
    doc
        .font('Helvetica')
        .fontSize(10)
        .text('Thank you for your business!', 50, 700, { align: 'center' });

    // Finalize PDF file
    doc.end();
};

module.exports = generatePdf;