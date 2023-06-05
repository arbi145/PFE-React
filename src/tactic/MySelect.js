import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './file.css'
function MySelect() {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/data')
      .then(response => {
        const data = response.data;
        const options = data.map(item => (
          <option key={item.id} value={item.id}>{item.name}</option>
        ));
        setOptions(options);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <select className="my-select">
      {options}
    </select>
  );
}
export default MySelect;
