console.log("working");

const pdfFiles = [
    { name: 'javascript', url: './asset/JavaScript.pdf' },
    { name: 'html', url: './asset/html.pdf' },
    { name: 'java', url: './asset/java.pdf' },
    { name: 'python', url: './asset/python.pdf' },
    { name: 'BootStrap', url: './bootstrap_tutorial.pdf' },
  // Add more PDF files here
];

console.log("hello");

window.onload = displayPDFList;

function displayPDFList() {
  const pdfList = document.getElementById('pdfList');

  pdfFiles.forEach(file => {
    const listele = document.createElement('li');
    const link = document.createElement('a');

    link.href = "#";
    link.textContent = file.name;
    link.addEventListener('click', function () {
      openFile(file.url);
    });

    listele.appendChild(link);
    pdfList.appendChild(listele);
  });
}

let currentPdf = null;

async function openFile(url) {
  const pdfUrl = url;
  const container = document.getElementById('pdfContainer');
  
  // Clear the current PDF if any
  if (currentPdf) {
    currentPdf.destroy();
    currentPdf = null;
    clearContainer(container);
  }

  // Asynchronous function to load and render the PDF
  const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
  currentPdf = pdf;
  const numPages = pdf.numPages;

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);

    const scale = 1.5; // Adjust the scale as needed
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    container.appendChild(canvas);

    const context = canvas.getContext('2d');
    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    await page.render(renderContext).promise;
  }
}

function clearContainer(container) {
  while (container.firstChild) {
    container.firstChild.remove();
  }
}