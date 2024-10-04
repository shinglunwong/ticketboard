
const PDFDocument = require('pdfkit');
const dayjs = require('dayjs');

const generatePdf = (details, res) => {

    const { invoiceConfig, client, payment, project } = details;
    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice_${payment.title.replace(/\s+/g, '_')}.pdf`);

    // Pipe the PDF into the response
    doc.pipe(res);

    const bgBlue = '#008aff';
    const textBlue = '#2682f2';
    const textDark = '#4f4f4f';
    const lightGrey = '#f3f3f3';

    // Company Information
    doc
        .fontSize(20)
        .fillColor(textBlue)
        .text(invoiceConfig.name, 150, 45, { align: 'right' })
        .fontSize(10)
        .fillColor(textDark)
        .text(`Phone: ${invoiceConfig.phone}`, 350, 67, { align: 'right' })
        .text(`Email: ${invoiceConfig.email}`, 350, 78, { align: 'right' })
        .moveDown();

    const invoiceTitle = payment.status === 'paid' ? 'RECEIPT' : payment.status === 'due' ? 'INVOICE' : '???';
    // Invoice Title
    doc
        .fontSize(25)
        .fillColor(textBlue)
        .text(`${invoiceTitle} ${payment.long_id}`, 50, 120)
        .moveDown();


    let billingY = 195;
    // Billing Information
    doc
        .fontSize(12)
        .fillColor(textDark)
        .text('Bill To:', 50, 170)
        .font('Helvetica-Bold')
        .text(project.bill_to_name || client.username, 50, billingY)
        .font('Helvetica');
    billingY += 20;

    if (project.bill_to_address) {
        doc
            .text(`${project.bill_to_address}`, 50, billingY, { width: 220 }).moveDown(0.2);
    }

    doc
        .text(`${project.bill_to_phone || client.phone}`, 50)
        .moveDown(0.2);
    doc.text(`${project.bill_to_email || client.email}`, 50)
        .moveDown();

    // Invoice Details
    const invoiceDate = dayjs(payment.due_date).subtract(14, 'days').format('YYYY-MM-DD');
    const dueDate = dayjs(payment.due_date).format('YYYY-MM-DD');
    doc
        .fontSize(12)
        .text(`Invoice Date: ${invoiceDate}`, 400, billingY, { align: 'right' })
        .moveDown(0.2);
    doc.text(`Due Date: ${dueDate}`, 400, null, { align: 'right' })
        .moveDown();

    // Invoice Table Header
    const tableTop = 300;
    const itemCodeX = 50;
    const descriptionX = 160;
    const amountX = 400;

    doc.rect(46, 295, 504, 20).fill(bgBlue); // this line
    doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .fillColor('white')
        .text('Item', itemCodeX, tableTop)
        .text('Description', descriptionX, tableTop)
        .text('Amount', amountX, tableTop, { align: 'right' })
        .moveDown();

    // Invoice Table Content
    const items = [
        {
            item: payment.title,
            description: payment.description,
            amount: `$${Number(payment.amount).toFixed(2)}`
        }
    ];

    let positionY = tableTop + 25;

    doc.font('Helvetica');

    items.forEach(item => {
        doc
            .fontSize(12)
            .fillColor(textDark)
            .text(item.item, itemCodeX, positionY)
            .text(item.description, descriptionX, positionY)
            .text(item.amount, amountX, positionY, { align: 'right' });
        positionY += 20;
    });
    for (let i = 0; i < 4; i++) {
        doc.rect(46, positionY, 504, 25).fill(lightGrey);
        positionY += 50;
    }

    // Total Amount
    doc
        .font('Helvetica-Bold')
        .fillColor(textDark)
        .text('Total:', 360, positionY + 10)
        .text(`$${Number(payment.amount).toFixed(2)}`, amountX, positionY + 10, { align: 'right' });


    // Remarks
    doc
        .font('Helvetica')
        .fontSize(12)
        .text('Remarks:', 50, positionY + 100)
        .text(invoiceConfig.remarks || '-', 50, positionY + 120)


    // Footer Remarks
    doc
        .font('Helvetica')
        .fontSize(10)
        .text('Thank you for your business!', 50, 750, { align: 'center' });

    // Finalize PDF file
    doc.end();
};

module.exports = generatePdf;