import React, { useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './file.css'
import Menu from './Menu';

const AddProjet = () => {
      const navigate = useNavigate();
      const [name, setName] = useState('');
      const [prefix, setPrefix] = useState('');
      const [description, setDescription] = useState('');
      const [enhanced, setEnhanced] = useState('');
      const [issuetracked, setIssuetracked] = useState('');
      const [availability, setAvailability] = useState('');
      const [text, setText] = useState('');
      const [boldSelection, setBoldSelection] = useState(null);
      const [italicSelection, setItalicSelection] = useState(null);
      const [fontSizeSelection, setFontSizeSelection] = useState(null);
      const [isChecked, setIsChecked] = useState(false);
      const [isChecked30, setIsChecked30] = useState(false);
      const [isChecked40, setIsChecked40] = useState(false);

    
      const handleSubmit =  (event) => {
      event.preventDefault();
      fetch('http://127.0.0.1:8000/api/projets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            name: name,
            prefix: prefix,
            description:description,
            enhanced:selectedValue,
            issuetracked:issuetracked,
            availability:selectedsValue
          }
        ),
      })
        .then(response => response.json())
        .then(data => {
         
        })
        .catch(error => {
          console.log(error);
        });
      console.log('Form submitted!');
      console.log('Name:', name);
      console.log('Prefix:', prefix);
      console.log('Description:', description);
      console.log('Enhanced:', enhanced);
      console.log('Issuetracked:', issuetracked);
      console.log('Availability:', availability);
      navigate('/dashboard');
      };

      const [isChecked1, setIsChecked1] = useState(false);
      const [isChecked2, setIsChecked2] = useState(false);
      const [isChecked3, setIsChecked3] = useState(false);
      const [isChecked4, setIsChecked4] = useState(false);
      const [selectedValue, setSelectedValue] = useState('');
      const [isCheckeds1, setIsCheckeds1] = useState(false);
      const [isCheckeds2, setIsCheckeds2] = useState(false);
      const [selectedsValue, setSelectedsValue] = useState('');
    
      function handleCheckbox1Change(event) {
        setIsChecked1(event.target.checked);
        if (event.target.checked) {
          setSelectedValue('Enable Requirements feature');
        } else {
          setSelectedValue('');
        }
      }
    
      function handleCheckbox2Change(event) {
        setIsChecked2(event.target.checked);
        if (event.target.checked) {
          setSelectedValue('Enable Testing Priority');
        } else {
          setSelectedValue('');
        }
      }
    
      function handleCheckbox3Change(event) {
        setIsChecked3(event.target.checked);
        if (event.target.checked) {
          setSelectedValue('Enable Test Automation (API Keys)');
        } else {
          setSelectedValue('');
        }
      }
      function handleCheckbox4Change(event) {
        setIsChecked4(event.target.checked);
        if (event.target.checked) {
          setSelectedsValue('Enable Inventory');
        } else {
          setSelectedsValue('');
        }
      }

      function handleCheckbox1Changes(event) {
        setIsCheckeds1(event.target.checked);
        if (event.target.checked) {
          setSelectedsValue('Active');
        } else {
          setSelectedsValue('');
        }
      }
    
      function handleCheckbox2Changes(event) {
        setIsCheckeds2(event.target.checked);
        if (event.target.checked) {
          setSelectedsValue('Public');
        } else {
          setSelectedsValue('');
        }
      }



  return (
    <div>
      <Menu/>
      <form  className="form-container"style={{backgroundColor:'#E4f2e7'}}onSubmit={handleSubmit}>
      <fieldset fieldset style={{margin: 20,border: '1px solid black',padding: '10px'}}>
  
     <div class="form-group" style={{ marginTop: '10px' }}>
      <label> Name:
        <input 
        style={{ marginTop: '10px',marginLeft:'155px',marginRight:'10px' }}
        type="text"value={name} onChange={(event) => setName(event.target.value)} /></label>
      </div>
      <br />
      <div class="form-group" style={{ marginTop: '10px' }}>
      <label>Prefix (used for Test case ID):<input type="text" value={prefix} onChange={(event) => setPrefix(event.target.value)}/>
      </label>
      </div>
      <br />
      <div class="form-group" style={{ marginTop: '10px' }}>
       <label style={{display: 'inline-block', marginRight: '35px'}}> description:
   
      <textarea style={{ marginTop: '10px',marginLeft:'155px',marginRight:'10px' }}type="text"value={description}  onChange={(event) => setDescription(event.target.value)}placeholder="Type your text here..." />
    </label>
</div>
<br />
<div class="form-group col-md-55" style={{ display: 'flex',marginTop: '20px' }}>
<label>enhanced :
<input style={{marginInlineStart:'78px' }} type="checkbox" checked={isChecked1} onChange={handleCheckbox1Change}/>Enable Requirements feature
</label>
    <br />
      <label tyle={{ alignItems: 'center',marginLeft: '200px'}}>
        <input  style={{marginInlineStart:'78px' }} type="checkbox"checked={isChecked2} onChange={handleCheckbox2Change}/>Enable Testing Priority
      </label>
      
      <label>
        <input style={{marginInlineStart:'78px' }} type="checkbox" checked={isChecked3} onChange={handleCheckbox3Change}/>Enable Test Automation (API Keys)
      </label>

      <label>
        <input style={{marginInlineStart:'78px' }} type="checkbox" checked={isChecked4} onChange={handleCheckbox4Change}/>Enable Inventory
      </label>
</div>
<br />
<div class="form-group" style={{ marginTop: '10px' }}>
<label> issuetracked:<input 
style={{ marginTop: '10px',marginLeft:'155px',marginRight:'10px' }}
 type="text" value={issuetracked} onChange={(event) => setIssuetracked(event.target.value)} />
</label>
</div>
<br />
<div class="form-group col-md-55" style={{ display: 'flex',marginTop: '20px' }}>
<label> availability:

      <label tyle={{ alignItems: 'center',marginLeft: '200px'}}>
        <input style={{marginInlineStart:'78px' }}
          type="checkbox"
          checked={isCheckeds1}
          onChange={handleCheckbox1Changes}
        />
        Active
      </label>
      
      <label>
        <input style={{marginInlineStart:'78px' }}
          type="checkbox"
          checked={isCheckeds2}
          onChange={handleCheckbox2Changes}
        />
        Public
</label>
</label>
</div>
<br />
</fieldset>
      <button type="submit">Submit</button>
  </form>
  </div>

  );
};

export default AddProjet;
