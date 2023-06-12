import React from 'react';
import { jsPDF } from 'jspdf';
import PropTypes from 'prop-types';
import 'jspdf-autotable';
const PDFGeneratorButton = ({ scores }) => {
  const handleClick = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(20);
    doc.text('Scores:', 10, 10);
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

  // Generate the second table
  const performanceTableHeaders = ['URL', 'Response Time'];
  const performanceTableData = Object.entries(scores.performance_scores)
    .filter(([key]) => key.startsWith('Page '))
    .map(([key, value]) => [value.href, value.response_time]);

  doc.autoTable({
    head: [performanceTableHeaders],
    body: performanceTableData,
    startY: doc.lastAutoTable.finalY + 10, // Position below the previous table
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
      1: { cellWidth: 'auto', columnWidth: 'wrap', fontStyle: 'normal', overflow: 'linebreak' },
    },
  });

  // Save the PDF
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
