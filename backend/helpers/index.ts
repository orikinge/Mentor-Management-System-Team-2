import PDFDocument from 'pdfkit'

async function generatePdfFile(response: any, report: any, task: any, mentor: any) {
  const doc = new PDFDocument()
  response.attachment(`TaskReport_${report.id}.pdf`, 'application/pdf')
  doc.pipe(response.response)

  doc.fontSize(16).text(`Task Report #${report.id}`)
  doc.moveDown()
  doc.fontSize(14).text(`Task: ${task.title}`)
  doc.moveDown()
  doc.fontSize(12).text(`Achievement: ${report.achievement}`)
  doc.moveDown()
  doc.fontSize(12).text(`Blocker: ${report.blocker}`)
  doc.moveDown()
  doc.fontSize(12).text(`Recommendation: ${report.recommendation}`)
  doc.moveDown()
  doc.fontSize(10).text(`Mentor: ${mentor.firstName} ${mentor.lastName}`)
  doc.end()

  return response.response
}

export default generatePdfFile
