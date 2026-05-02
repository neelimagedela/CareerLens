import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

// ⚠️ WORKER DISABLE (important)
pdfjsLib.GlobalWorkerOptions.workerSrc = null;

export const extractTextFromFile = async (file) => {

  // PDF case
  if (file.type === "application/pdf") {

    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
      disableWorker: true
    }).promise;

    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      const strings = content.items.map(item => item.str);
      text += strings.join(" ");
    }

    return text.toLowerCase();
  }

  // DOCX fallback
  const text = await file.text();
  return text.toLowerCase();
};