// SecondTableSection.js
import React from 'react';
import PropTypes from 'prop-types';

const SecondTableSection = ({ scores }) => {
  return (
    <div>
      <table style={{ border: '1px solid black' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>URL</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Response Time</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(scores.performance_scores).map(([key, value]) => {
            if (key.startsWith('Page ')) {
              return (
                <tr key={key}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{value.href}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{value.response_time}</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
};
SecondTableSection.propTypes = {
    scores: PropTypes.shape({
      performance_scores: PropTypes.shape({
          href: PropTypes.string,
          response_time: PropTypes.number,
        }),
    }),
  };
export default SecondTableSection;
