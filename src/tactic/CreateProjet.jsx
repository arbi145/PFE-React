import React, { useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './file.css'
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import useAuth from './useAuth';

const CreateProjet = () => {
      const [name, setName] = useState('');
      const [prefix, setPrefix] = useState('');
      const [description, setDescription] = useState('');
      const [enhanced, setEnhanced] = useState('');
      const [issuetracked, setIssuetracked] = useState('');
      const [availability, setAvailability] = useState('');
      

      const [isChecked1, setIsChecked1] = useState(false);
      const [isChecked2, setIsChecked2] = useState(false);
      const [isChecked3, setIsChecked3] = useState(false);
      const [isChecked4, setIsChecked4] = useState(false);
      const [text, setText] = useState('');
      const [boldSelection, setBoldSelection] = useState(null);
      const [italicSelection, setItalicSelection] = useState(null);
      const [fontSizeSelection, setFontSizeSelection] = useState(null);
      const [isChecked, setIsChecked] = useState(false);
      const [isChecked30, setIsChecked30] = useState(false);
      const [isChecked40, setIsChecked40] = useState(false);

      const handleCheckbox1Change = (event) => {
    setIsChecked30(event.target.checked);
      };
      const handleCheckbox2Change = (event) => {
    setIsChecked40(event.target.checked);
      };
      const handleCheckboxChange1 = (event) => {
      setIsChecked(event.target.checked);
      };
      const handleBoldClick = () => {
        const newText = `${text.slice(0, boldSelection[0])}**${text.slice(boldSelection[0], boldSelection[1])}**${text.slice(boldSelection[1])}`;
        setText(newText);
      };
      const handleItalicClick = () => {
        const newText = `${text.slice(0, italicSelection[0])}_${text.slice(italicSelection[0], italicSelection[1])}_${text.slice(italicSelection[1])}`;
        setText(newText);
      };
      const handleFontSizeClick = () => {
        const newText = `${text.slice(0, fontSizeSelection[0])}<span style="font-size:${fontSizeSelection[1]}px;">${text.slice(fontSizeSelection[0], fontSizeSelection[1])}</span>${text.slice(fontSizeSelection[1])}`;
        setText(newText);
      };
      const handleSubmit = (event) => {
      event.preventDefault();
      const res=  axios.post('http://127.0.0.1:8000/api/projets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            name: name,
            prefix: prefix,
            description:description,
            enhanced:enhanced,
            issuetracked:issuetracked,
            availability:availability
          }
        ),
      })
        .then(response => response.json())
        .then(data => {
          // Handle successful response
        })
        .catch(error => {
          console.log(error);
        });
      console.log('Form submitted!');
      console.log('Name:', name);
      console.log('Prefix:', prefix);
      console.log('Description:', description);
      console.log(options);
      };
     
   // const handleCheckboxChange = (event) => {
   //     const target = event.target;
   //     const name = target.name;
   //     const value = target.type === 'checkbox' ? target.checked : target.value;
    
   //     switch (name) {
   //       case 'checkbox1':
   //         setIsChecked1(value);
     //       break;
    //      case 'checkbox2':
     //       setIsChecked2(value);
      //      break;
      //    case 'checkbox3':
      //      setIsChecked3(value);
      //      break;
     //     case 'checkbox4':
      //      setIsChecked4(value);
      //      break;
      //    default:
      //      break;
      //  }
     // };
      const handleKeyDown = (event) => {
        if (event.key === 'b' &&  event.key === 'i'  && event.ctrlKey ) {
          event.preventDefault();
          handleItalicClick();
        }
      };
      const handleSelectionChange = () => {
        const textarea = document.getElementById('textarea');
        const selectionStart = textarea.selectionStart;
        const selectionEnd = textarea.selectionEnd;
        if (selectionStart !== selectionEnd) {
          setBoldSelection([selectionStart, selectionEnd]);
          setItalicSelection([selectionStart, selectionEnd]);
          setFontSizeSelection([selectionStart, selectionEnd]);
        } else {
          setBoldSelection(null);
          setItalicSelection(null);
          setFontSizeSelection(null);
        }
      };
      const handleFontSizeChange = (event) => {
        const size = event.target.value;
        setFontSizeSelection([fontSizeSelection[0], size]);
      };
      const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setOptions({ ...options, [name]: checked });
      };
      const [options, setOptions] = useState({
        option1: false,
        option2: false,
        option3: false,
        option4: false
      });
      const [formData, setFormData] = useState({
     //   name: '',
     //   prefix: '',
      //  description: '',
      });
      const { isUserAuthenticated, checkAuthentication } = useAuth();

      if (!checkAuthentication()) {
        return null; // Return null to prevent rendering this component
      }
    


  return (
    <div>
       <DashboardLayout>
      <DashboardNavbar />
      <div style={{marginTop: '10px',backgroundColor:'#026773'}}>Hello gggg</div>
    <form style={{backgroundColor:'#E4f2e7'}}onSubmit={handleSubmit}>

    < fieldset style={{margin: 20,border: '1px solid black',padding: '10px'}}>

     <div className="form-group" style={{ marginTop: '10px' }}>

      <label> Name:
      <input style={{ marginTop: '10px',marginLeft:'155px',marginRight:'10px' }}
      type="text"
      value={formData.name} 
      onChange={(event) => setName(event.target.value)} />
      </label>
      </div>
      <br />
      <div className="form-group" style={{ marginTop: '10px' }}>
      <label>
        Prefix (used for Test case ID):
        <input
          type="text"
          value={formData.prefix}
          onChange={(event) => setPrefix(event.target.value)}
        />
      </label>
      </div>
      <br />
      <div style={{display: 'flex', alignItems: 'center',marginTop: '10px'}}>
         <label  style={{display: 'inline-block', marginRight: '35px'}}>
            Project description:
            </label>
            <fieldset 
            style={{margin: 20,border: '5px solid black',padding: '30px',marginLeft:'20px'}}>
                
         
        <div>
        <button disabled={!boldSelection} onClick={handleBoldClick}>
          Bold
        </button>
        <button disabled={!italicSelection} onClick={handleItalicClick}>
          Italic
        </button>
        <select disabled={!fontSizeSelection} onChange={handleFontSizeChange}>
          <option value="">Font Size</option>
          <option value="8">8</option>
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="14">14</option>
          <option value="16">16</option>
          <option value="18">18</option>
          <option value="20">20</option>
        </select>
        <button disabled={!fontSizeSelection} onClick={handleFontSizeClick}>
          Apply Font Size
        </button>
            </div>
        <textarea  id="textarea" 
        value={formData.description} 
        onSelect={handleSelectionChange} 
        rows={5} 
        cols={50}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Type your text here..."/>
        </fieldset>
      </div>
      <br />

      <div className="form-group col-md-45" style={{display: 'flex', marginTop: '10px' }}>
      <label>Enhanced features:</label>
      <label htmlFor="option1">Enable Requirements feature</label>
      <input
        type="checkbox"
        id="option1"
        name="option1"
        checked={options.option1}
        onChange={handleCheckboxChange}
      />
      <br />
      <label htmlFor="option2">Enable Testing Priority</label>
      <input
        type="checkbox"
        id="option2"
        name="option2"
        checked={options.option2}
        onChange={handleCheckboxChange}
      />
      <br />
      <label htmlFor="option3">Enable Test Automation(API keys):</label>
      <input
        type="checkbox"
        id="option3"
        name="option3"
        checked={options.option3}
        onChange={handleCheckboxChange}
      />
      <br />
      <label htmlFor="option4">Enable Inventory</label>
      <input
        type="checkbox"
        id="option4"
        name="option4"
        checked={options.option4}
        onChange={handleCheckboxChange}
      />
      <br />
     
      </div>

      <br />
      <div className="form-group col-md-45" style={{display: 'flex', marginTop: '10px' }}>
      <label>Issue Tracker Integraton: <label style={{ alignItems: 'center',marginLeft: '90px'}}>
      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange1} />active</label>
      <select style={{marginRight: '10px',marginInlineStart:'90px' }}disabled={!isChecked}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      </label>
      </div>
      <br/>
      <div className="form-group col-md-45" style={{ display: 'flex',marginTop: '10px' }}>
      <label >Availability:<label style={{ alignItems: 'center',marginLeft: '180px'}} >
      <input  type="checkbox" checked={isChecked30} onChange={handleCheckbox1Change} />Active
      </label>
      <label ><input style={{marginInlineStart:'30px' }}type="checkbox" checked={isChecked40} onChange={handleCheckbox2Change} />Public</label>
      </label>
      </div>
      </fieldset>
      <button type="submit">Submit</button>
  </form>
  </DashboardLayout>
  </div>

  );
};

export default CreateProjet;
