import * as pdfjsLib from 'pdfjs-dist';

export async function processFile(file: File): Promise<string> {
    const fileType = file.type;

    if (fileType === "application/pdf") {
        return await processPDF(file);
    } else if (fileType === "text/plain") {
        return await processTextFile(file);
    } else {
        return "Error, please upload a PDF or a text file";
    }
}

async function processPDF(file: File): Promise<string> {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDocument = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let text = '';

        for (let i = 1; i <= pdfDocument.numPages; i++) {
            const page = await pdfDocument.getPage(i);
            const pageContent = await page.getTextContent();
            text += pageContent.items.map((item: any) => item.str).join(' ');
        }

        return text;
    } catch (error) {
        console.error("Error processing PDF:", error);
        return '';
    }
}

async function processTextFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target!.result as string);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
}
