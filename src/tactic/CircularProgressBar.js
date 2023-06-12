import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PropTypes from 'prop-types';

const CircularProgressBar = ({ type, label, value }) => {
  return (
    <div
      className="score-item"
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
        width: 350,
        height: 300,
      }}
    >
      <p>{label}:</p>
      {value !== null ? (
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          styles={buildStyles({
            textSize: '12px',
            pathColor: `rgba(62, 152, 199, ${value / 100})`,
            textColor: '#f88',
            trailColor: '#d6d6d6',
            strokeLinecap: 'round',
            strokeWidth: 8,
          })}
        />
      ) : (
        <CircularProgressbar value={0} text="N/A" styles={buildStyles({ textSize: '12px' })} />
      )}
    </div>
  );
};
CircularProgressBar.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.number,
  };

export default CircularProgressBar;
