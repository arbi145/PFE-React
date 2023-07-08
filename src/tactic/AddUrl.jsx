import React, { useState } from 'react';
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import './file.css'
import useAuth from './useAuth';

const AddUrl = () => {
    const [values, setValues] = useState({ url: '', value1: '', value2: '', value3: '', value4: '' });
    const { isUserAuthenticated, checkAuthentication } = useAuth();

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setValues({ ...values, [name]: value });
    };
    const handleSubmit = async (event) => {
      event.preventDefault();
    
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      };
    
      const response = await fetch('http://127.0.0.1:8000/api/hello', requestOptions);
      const data = await response.json();
    
      console.log(data.output);
      console.log('Request data sent to Laravel:', JSON.stringify(values));
    };
    if (!checkAuthentication()) {
      return null; // Return null to prevent rendering this component
    }


  return (
    <div>
      <DashboardLayout>
      <DashboardNavbar />
    <form className="form-container" onSubmit={handleSubmit}>
    <input type="url" name="url" value={values.url} onChange={handleChange} placeholder='Enter URL' style={{ marginBottom: "2rem",width:"420px", height:"40px" }} /><br/>
    <fieldset >
    <legend>Login</legend>

    <div className="form-outline mb-5">

          <label className="form-label" htmlFor="password">IDEmail:</label>
      <input type="text" name="value3" value={values.value3} onChange={handleChange} placeholder='Enter IDEmail' />
      <label className="form-label" htmlFor="password">IDPassword:</label>
      <input type="text" name="value4" value={values.value4} onChange={handleChange} placeholder='Enter IDPassword'/>
      </div>
    <div className="form-outline mb-5">
          <label className="form-label" htmlFor="password">Email:</label>
      <input type="text" name="value1" value={values.value1} onChange={handleChange} placeholder='Enter Email' />
      <label className="form-label" htmlFor="password">Password:</label>
      <input type="password" name="value2" value={values.value2} onChange={handleChange} placeholder='Enter Password'/>
      </div>
      </fieldset>
      <button type="submit">Run Python</button>
    </form>
    </DashboardLayout>
    </div>
  );
};

export default AddUrl;
