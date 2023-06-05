import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import PropTypes from 'prop-types';


const GetProjet = () => {
  const [scores, setScores] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/get-scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: 'https://www.linkedin.com/'
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setScores(data)});
  }, []);

  return (
    <div>
      <DashboardLayout>
        <DashboardNavbar />
        {scores ? (
          <div>
           <div className="score-item" style={{display: 'flex', justifyContent: 'center', marginTop: '10px', width: 350, height: 300 }}>
             <p>Performance score:</p>
             <CircularProgressbar
              value={scores.html_analysis_results.performance_scoress}
              text={`${scores.html_analysis_results.performance_scoress}%`}
              styles={buildStyles({
                textSize: '12px',
                pathColor:`rgba(62, 152, 199, ${scores.html_analysis_results.performance_scoress / 100})`,
                textColor: '#f88',
                trailColor: '#d6d6d6',
                strokeLinecap: 'round',
                strokeWidth: 8
                })}
                 />
             </div>
            <div className="score-item" style={{display: 'flex', justifyContent: 'center', marginTop: '10px' , width: 350, height: 300 }}>
              <p>Accessibility score:</p>
              <CircularProgressbar
                value={scores.html_analysis_results.accessibility_score}
                text={`${scores.html_analysis_results.accessibility_score}%`}
                styles={buildStyles({
                  textSize: '12px',
                  pathColor: `rgba(62, 152, 199, ${scores.html_analysis_results.accessibility_score / 100})`,
                  textColor: '#f88',
                  trailColor: '#d6d6d6',
                  strokeLinecap: 'round',
                  strokeWidth: 8,
                })}
              />
            </div>
            <div className="score-item" style={{display: 'flex', justifyContent: 'center', marginTop: '10px' , width: 350, height: 300 }}>
              <p>Best practices score:</p>
              <CircularProgressbar
                value={scores.html_analysis_results.best_practices_score}
                text={`${scores.html_analysis_results.best_practices_score}%`}
                styles={buildStyles({
                  textSize: '12px',
                  pathColor: `rgba(62, 152, 199, ${scores.html_analysis_results.best_practices_score / 100})`,
                  textColor: '#f88',
                  trailColor: '#d6d6d6',
                  strokeLinecap: 'round',
                  strokeWidth: 8,
                })}
              />
            </div>
            <div className="score-item" style={{display: 'flex', justifyContent: 'center', marginTop: '10px' , width: 350, height: 300 }}>
              <p>SEO score:</p>
              <CircularProgressbar
                value={scores.html_analysis_results.seo_score}
                text={`${scores.html_analysis_results.seo_score}%`}
                styles={buildStyles({
                  textSize: '12px',
                  pathColor: `rgba(62, 152, 199, ${scores.html_analysis_results.seo_score / 100})`,
                  textColor: '#f88',
                  trailColor: '#d6d6d6',
                  strokeLinecap: 'round',
                  strokeWidth: 8,
                })}
              />
            </div>
            <div className="score-item" style={{display: 'flex', justifyContent: 'center', marginTop: '10px' , width: 350, height: 300 }}>
              <p>PWA score:</p>
              <CircularProgressbar
                value={scores.html_analysis_results.pwa_score}
                text={`${scores.html_analysis_results.pwa_score}%`}
                styles={buildStyles({
                  textSize: '12px',
                  pathColor: `rgba(62, 152, 199, ${scores.html_analysis_results.pwa_score / 100})`,
                  textColor: '#f88',
                  trailColor: '#d6d6d6',
                  strokeLinecap: 'round',
                  strokeWidth: 8,
                })}
              />
            </div>
            <br/>
            <table style={{ border: '1px solid black' }}>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>Lcp Metric</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Cls Metric</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Fcp Metric</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Interaction to Next Paint (INP)</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Fcp Metric</th>
              </tr>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>{scores.html_analysis_results.lcp_metric}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{scores.html_analysis_results.cls_metric}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{scores.html_analysis_results.fcp_metric}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{scores.html_analysis_results.inp_metric}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{scores.html_analysis_results.ttfb_metric}</td>
              </tr>
            </table>
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
        ) : (
          <p>Loading...</p>
        )}
      </DashboardLayout>
    </div>
  );
}

export default GetProjet;

