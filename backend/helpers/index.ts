import PDFDocument from 'pdfkit'

async function generatePdfFile(
  response: any,
  report: any,
  title: any,
  mentorManager: any,
  { name }
) {
  const doc = new PDFDocument()
  response.attachment(`Report_${report.id}.pdf`, 'application/pdf')
  doc.pipe(response.response)

  doc.fontSize(16).text(`Report #${report.id}`)
  doc.moveDown()
  doc.fontSize(14).text(`${name.name}: ${title}`)
  doc.moveDown()
  doc.fontSize(12).text(`Achievement: ${report.achievement}`)
  doc.moveDown()
  doc.fontSize(12).text(`Blocker: ${report.blocker}`)
  doc.moveDown()
  doc.fontSize(12).text(`Recommendation: ${report.recommendation}`)
  doc.moveDown()
  doc.fontSize(10).text(`MentorManager: ${mentorManager.firstName} ${mentorManager.lastName}`)
  doc.end()

  return response.response
}

export default generatePdfFile
