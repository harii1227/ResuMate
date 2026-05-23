import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Capture an element on screen and download as a high-fidelity PDF.
 * Handles resizing to A4 dimensions and paginates if the height exceeds A4 aspect ratio.
 */
export const downloadAsPDF = async (elementId: string, filename = 'document') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found.`);
    return;
  }

  try {
    // Hide visual boundaries or editor indicators during render if needed
    // Create canvas representation with 2x scale for sharp text rendering
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    
    // A4 dimensions in mm: 210 x 297
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calculate image dimensions to fit PDF A4 page width
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;

    // Loop to handle content overflowing into extra pages
    while (heightLeft > 0) {
      position = heightLeft - imgHeight; // slide image upwards
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
    }

    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error compiling PDF:', error);
    throw error;
  }
};

/**
 * Capture an element on screen and download as PNG image.
 */
export const downloadAsPNG = async (elementId: string, filename = 'document') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found.`);
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgURI = canvas.toDataURL('image/png');
    
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = imgURI;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error compiling PNG:', error);
    throw error;
  }
};
