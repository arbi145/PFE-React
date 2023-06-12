import React from 'react';
import PropTypes from 'prop-types';

const ThirdTableSection = ({ scores }) => {
  return (
    <div>
      <table style={{ border: '1px solid black' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Element</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>header_elements</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{JSON.stringify(scores.performance_scores.header_elements)}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>footer_elements</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{JSON.stringify(scores.performance_scores.footer_elements)}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>total_tags</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{scores.performance_scores.total_tags}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>num_header_elements</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{scores.performance_scores.num_header_elements}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
ThirdTableSection.propTypes = {
    scores: PropTypes.shape({
      performance_scores: PropTypes.shape({
        header_elements: PropTypes.array,
        footer_elements: PropTypes.array,
        total_tags: PropTypes.number,
        num_header_elements: PropTypes.number,
      }),
    }),
  };

export default ThirdTableSection;
