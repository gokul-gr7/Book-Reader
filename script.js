$(document).ready(function() {
    console.log("working");

    const pdfFiles = [
      { name: 'javascript', url: './asset/JavaScript.pdf' },
      { name: 'html', url: './asset/html.pdf' },
      { name: 'java', url: './asset/java.pdf' },
      { name: 'python', url: './asset/python.pdf' },
      { name: 'BootStrap', url: './asset/bootstrap_tutorial.pdf' },
    ];

    console.log("hello");

    function displayPDFList() {
      const pdfList = $('#pdfList');

      pdfFiles.forEach(file => {
        const listItem = $('<li></li>');
        const link = $('<a href="#">' + file.name + '</a>');

        link.on('click', function () {
          openFile(file.url);
        });

        listItem.append(link);
        pdfList.append(listItem);
      });
    }
    let currentPdf = null;

    async function openFile(url) {
      const pdfUrl = url;
      const container = $('#pdfContainer');

      if (currentPdf) {
        currentPdf.destroy();
        currentPdf = null;
        container.empty();
      }

      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
      currentPdf = pdf;
      const numPages = pdf.numPages;

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);

        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        const canvas = $('<canvas></canvas>');
        canvas.attr('width', viewport.width);
        canvas.attr('height', viewport.height);
        container.append(canvas);

        const context = canvas.get(0).getContext('2d');
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };

        await page.render(renderContext).promise;
      }
    }

    function clearContainer(container) {
      container.empty();
    }

    window.onload = displayPDFList;
  });
