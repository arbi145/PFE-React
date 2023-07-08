import { useState, useEffect , useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import PropTypes from 'prop-types';
import PDFGeneratorButton from './PDFGeneratorButton';
import ThirdTableSection from './Tactic/ThirdTableSection';
import SecondTableSection from './Tactic/SecondTableSection';
import FirstTableSection from './Tactic/FirstTableSection';
import { useNavigate } from 'react-router-dom'; // Import useHistory

const GetProjet = () => {
  const [scores, setScores] = useState(null);
  const [selectedView, setSelectedView] = useState('progressBar');
  const [urlInput, setUrlInput] = useState('');
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsUserAuthenticated(!!token); // Set true if token exists, false otherwise
  }, []);
  const handleSubmit = () => {
    fetch('http://127.0.0.1:8000/api/get-scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: urlInput,
        run_functions: checkboxChecked // Send checkbox value to the backend
    
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setScores(data)
      });
  };

  const handleCheckboxChange = (e) => {
    setCheckboxChecked(e.target.checked);
  };

  const handleViewSelection = (view) => {
    setSelectedView(view);
  };
  const handleUrlChange = (e) => {
    setUrlInput(e.target.value);
  }

  if (!isUserAuthenticated) {
    navigate('/authentication/sign-in'); // Redirect to login page
    return null; // Return null to prevent rendering this component
  }

  return (
    <div>
      <DashboardLayout>
        <DashboardNavbar />
        <div style={{ marginTop: '20px' }}>
        <input 
        type="text" 
        value={urlInput} 
        onChange={handleUrlChange} placeholder="Enter URL" 
        style={{ marginRight: '10px', padding: '5px' }}
      />
      <label>
            <input
              type="checkbox"
              checked={checkboxChecked}
              onChange={handleCheckboxChange}
            />
            Run Functions
          </label>
      <button onClick={handleSubmit}>Send Request</button>



    </div>
        <ul style={{ display: 'flex', listStyle: 'none', padding: 0, backgroundColor: '#f3f3f3', borderRadius: '4px', marginTop: '30px' }}>
      <li
        style={{
          marginRight: '2px',
          padding: '10px',
          backgroundColor: selectedView === 'progressBar' ? '#3c53e7' : '#f3f3f3',
          color: selectedView === 'progressBar' ? 'white' : 'initial',
          fontWeight: 'bold',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={() => handleViewSelection('progressBar')}
      >
        Progress Bar
      </li>
      <li
        style={{
          marginRight: '2px',
          padding: '10px',
          backgroundColor: selectedView === 'firstTable' ? '#3c53e7' : '#f3f3f3',
          color: selectedView === 'firstTable' ? 'white' : 'initial',
          fontWeight: 'bold',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={() => handleViewSelection('firstTable')}
      >
        First Table
      </li>
      <li
        style={{
          marginRight: '2px',
          padding: '10px',
          backgroundColor: selectedView === 'secondTable' ? '#3c53e7' : '#f3f3f3',
          color: selectedView === 'secondTable' ? 'white' : 'initial',
          fontWeight: 'bold',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={() => handleViewSelection('secondTable')}
      >
        Second Table
      </li>
      <li
        style={{
          marginRight: '2px',
          padding: '10px',
          backgroundColor: selectedView === 'thirdTable' ? '#3c53e7' : '#f3f3f3',
          color: selectedView === 'thirdTable' ? 'white' : 'initial',
          fontWeight: 'bold',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={() => handleViewSelection('thirdTable')}
      >
        Third Table
      </li>
    </ul>

        {selectedView === 'progressBar' && scores && (
        <div>
        {[
          { type: 'performance_scoress', label: 'Performance scoress' },
          { type: 'accessibility_score', label: 'Accessibility score' },
          { type: 'best_practices_score', label: 'Best practices score' },
          { type: 'seo_score', label: 'SEO score' },
          { type: 'pwa_score', label: 'PWA score' },
        ].map(({ type, label }) => (
          <div key={type} className="score-item" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', width: 350, height: 300 }}>
            <p>{label}:</p>
            {scores && scores.html_analysis_results && scores.html_analysis_results[type] !== null ? (
              <CircularProgressbar
                value={scores.html_analysis_results[type]}
                text={`${scores.html_analysis_results[type]}%`}
                styles={buildStyles({
                  textSize: '12px',
                  pathColor: `rgba(62, 152, 199, ${scores.html_analysis_results[type] / 100})`,
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
        ))}
      </div>
      
        
            )}
            <br/>
            {selectedView === 'firstTable' && scores && (
              <FirstTableSection scores={scores} />
            )}
            {selectedView === 'secondTable' && scores &&  (
              <SecondTableSection scores={scores} />
              )}
            {selectedView === 'thirdTable' && scores &&  (
              <ThirdTableSection scores={scores} />
        )}
           <h1>My Component</h1>
           <PDFGeneratorButton scores={scores}/>
          
         
      </DashboardLayout>
    </div>
  );
}

export default GetProjet;

