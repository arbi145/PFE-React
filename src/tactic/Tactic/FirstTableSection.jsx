import React from 'react';
import PropTypes from 'prop-types';

const FirstTableSection = ({ scores }) => {
  return (
    <div>
            <table style={{ border: '1px solid black' }}>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>Lcp Metric</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Cls Metric</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Fcp Metric</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Interaction to Next Paint (INP)</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Fcp Metric</th>
              </tr>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>{scores?.html_analysis_results?.lcp_metric}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{scores?.html_analysis_results?.cls_metric}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{scores?.html_analysis_results?.fcp_metric}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{scores?.html_analysis_results?.inp_metric}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{scores?.html_analysis_results?.ttfb_metric}</td>
             </tr>
            </table>
            </div>
    );
};
FirstTableSection.propTypes = {
    scores: PropTypes.shape({
      html_analysis_results: PropTypes.shape({
        lcp_metric: PropTypes.number,
        cls_metric: PropTypes.number,
        fcp_metric: PropTypes.number,
        inp_metric: PropTypes.number,
        ttfb_metric: PropTypes.number,
      }),
    }),
  };

export default FirstTableSection;