import React from 'react';
import { jsPDF } from 'jspdf';
import PropTypes from 'prop-types';
import 'jspdf-autotable';
import CircularProgressBar from './CircularProgressBar';

const PDFGeneratorButton = ({ scores }) => {
  const handleClick = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(20);
    doc.text('Scores:', 10, 10);

    // Generate the first page with tables
    const tableHeaders = ['Metric', 'Value'];
    const tableData = [
      ['LCP Metric', scores?.html_analysis_results?.lcp_metric],
      ['CLS Metric', scores?.html_analysis_results?.cls_metric],
      ['FCP Metric', scores?.html_analysis_results?.fcp_metric],
      ['INP Metric', scores?.html_analysis_results?.inp_metric],
      ['TTFB Metric', scores?.html_analysis_results?.ttfb_metric],
    ];

    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: 20,
    });

    const performanceTableHeaders = ['URL', 'Response Time'];
    const performanceTableData = Object.entries(scores.performance_scores)
      .filter(([key]) => key.startsWith('Page '))
      .map(([key, value]) => [
        { content: value.href, styles: { cellWidth: 160 } },
        { content: parseFloat(value.response_time).toFixed(2) },
      ]);

    doc.autoTable({
      head: [performanceTableHeaders],
      body: performanceTableData,
      startY: doc.lastAutoTable.finalY + 10,
    });

    const tableHeaders1 = ['Element', 'Value'];
    const tableData1 = [
      ['header_elements', JSON.stringify(scores.performance_scores.header_elements)],
      ['footer_elements', JSON.stringify(scores.performance_scores.footer_elements)],
      ['total_tags', scores.performance_scores.total_tags],
      ['num_header_elements', scores.performance_scores.num_header_elements],
    ];

    doc.autoTable({
      head: [tableHeaders1],
      body: tableData1,
      startY: doc.lastAutoTable.finalY + 10,
      styles: { cellWidth: 'wrap', columnWidth: 'auto' },
      columnStyles: {
        1: {
          cellWidth: 'auto',
          columnWidth: 'wrap',
          fontStyle: 'normal',
          overflow: 'linebreak',
        },
      },
    });

    // Add a new page for circular progress bars
    doc.addPage();

    const progressBarOptions = [
      { type: 'performance_scores', label: 'Performance scores' },
      { type: 'accessibility_score', label: 'Accessibility score' },
      { type: 'best_practices_score', label: 'Best practices score' },
      { type: 'seo_score', label: 'SEO score' },
      { type: 'pwa_score', label: 'PWA score' },
    ];

    let currentY = 5;

    progressBarOptions.forEach(({ type, label }) => {
      const value = scores?.html_analysis_results?.[type];

      if (value !== undefined) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const size = 100; // Size of the circular progress bar
        const strokeWidth = 10; // Width of the progress bar stroke

        canvas.width = size;
        canvas.height = size;

        const radius = (size - strokeWidth) / 2;
        const centerX = size / 2;
        const centerY = size / 2;
        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + (2 * Math.PI * value) / 100;

        // Draw the background circle
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        context.strokeStyle = '#e4e4e4';
        context.lineWidth = strokeWidth;
        context.stroke();

        // Draw the progress bar
        context.beginPath();
        context.arc(centerX, centerY, radius, startAngle, endAngle);
        context.strokeStyle = '#3e98c7';
        context.lineWidth = strokeWidth;
        context.stroke();

        // Add the percentage text
        context.font = '12px Arial';
        context.fillStyle = '#f88';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(`${value}%`, centerX, centerY);

        const imageDataUri = canvas.toDataURL('image/jpeg');
        doc.addImage(imageDataUri, 'JPEG', 10, currentY, 50, 50);
        doc.text(label, 70, currentY + 30);

        currentY += 60;
      }
    });

    doc.save('example.pdf');
  };


  return (
    <div>
      <button onClick={handleClick}>Generate PDF</button>
    </div>
  );
};

PDFGeneratorButton.propTypes = {
  scores: PropTypes.shape({
    html_analysis_results: PropTypes.shape({
      lcp_metric: PropTypes.number,
      cls_metric: PropTypes.number,
      fcp_metric: PropTypes.number,
      inp_metric: PropTypes.number,
      ttfb_metric: PropTypes.number,
    }),
    performance_scores: PropTypes.objectOf(
      PropTypes.shape({
        href: PropTypes.string,
        response_time: PropTypes.number,
      })
    ),
    total_tags: PropTypes.number,
  }),
};

export default PDFGeneratorButton;
