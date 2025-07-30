const fs = require('fs');
const PDFDocument = require('pdfkit');
const { Document, Packer, Paragraph } = require('docx');

function generateFile(content, format, filename) {
  if (!fs.existsSync('./outputs')) {
    fs.mkdirSync('./outputs');
  }

  if (format === 'md') {
    const markdown = Object.entries(content)
      .map(([title, text]) => `# ${title}\n\n${text}`)
      .join('\n\n');
    fs.writeFileSync(`./outputs/${filename}.md`, markdown);
  } else if (format === 'txt') {
    const text = Object.entries(content)
      .map(([title, text]) => `${title}\n${text}`)
      .join('\n\n');
    fs.writeFileSync(`./outputs/${filename}.txt`, text);
  } else if (format === 'pdf') {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(`./outputs/${filename}.pdf`);
    doc.pipe(stream);
    Object.entries(content).forEach(([title, text]) => {
      doc.fontSize(16).text(title, { underline: true });
      doc.fontSize(12).text(text, { align: 'left' });
      doc.moveDown();
    });
    doc.end();
  } else if (format === 'docx') {
    const doc = new Document({
      sections: [{
        children: Object.entries(content).map(([title, text]) => [
          new Paragraph({ text: title, heading: 'Heading1' }),
          new Paragraph({ text })
        ]).flat()
      }]
    });
    Packer.toBuffer(doc).then(buffer => {
      fs.writeFileSync(`./outputs/${filename}.docx`, buffer);
    });
  }
}

module.exports = { generateFile };