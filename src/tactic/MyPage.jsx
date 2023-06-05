import React,{ useState,useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import { Link } from 'react-router-dom';

import 'ag-grid-community/styles/ag-theme-alpine.css';
//import axios from 'axios';
const MyPage =()=> {

   
  const defaultColDef={
    sortable:true,
    editable:true,
    flex:1,filter:true,
    floatingFilter:true
  }

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/projets')
      .then(res => res.json())
      .then(result => setRowData(result.data));
  }, []);
 // useEffect(() => {
   // const fetchData = async () => {
     // const response = await axios.get('http://127.0.0.1:8000/api/projets');
      //console.log(response.data);

      //const dataArray = Object.values(response.data);
     // if (Array.isArray(dataArray)) {
     //   console.log('Data is an array');
     // } else {
     //   console.log('Data is not an array');
     // }
      
     // setRowData(dataArray);
     // console.log(rowData);
     // console.log(setRowData());
    //};
    //fetchData();
  
  //}, []);
  const columnDefs = [
       
    { field: 'availability', headerName: 'availability'},
    { field: 'description', headerName: 'Description'},
    { field: 'enhanced', headerName: 'Enhanced'},
    { field: 'issuetracked', headerName: 'Issuetracked'},
    { field: 'name', headerName: 'name'},
    {
      headerName: 'Delete',
      cellRendererFramework: (params) => (
        <button onClick={() => handleDeleteRow(params)}>Delete</button>
      ),
      
    },
    {
      headerName: 'Update',
      cellRendererFramework: (params) => (
        <button onClick={() => handleUpdateRow(params)}>Update</button>
      ),
    },

 
  ];

  const handleDeleteRow = (params) => {
    const selectedRow = params.node;
    selectedRow.setSelected(true);
    const selectedData = selectedRow.data;
    const updatedData = rowData.filter((item) => item.id !== selectedData.id);
    setRowData(updatedData);
    fetch(`http://127.0.0.1:8000/api/projets/${selectedData.id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete row from the database.');
        }
      })
      .catch((error) => console.error(error));
  };
  const handleUpdateRow = (params) => {
    const selectedRow = params.node;
    selectedRow.setSelected(true);
    const selectedData = selectedRow.data;
    // TODO: Open a form or dialog to edit the selected data
  };

  const gridOptions = {
    pagination: true,
    paginationPageSize: 3,
    paginationPageSizes: [3, 6, 9],
  };


    return (
      <div>
      <Link to="/addprojet">
      <button style={{ marginLeft: '1380px',color:'#1D7888' ,height:'70px',width:'100px' }}>Add Project</button>
      </Link>
      <div className="ag-theme-alpine" style={{height:400,}}>
          <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          gridOptions={gridOptions}
        />
       
      </div>
      </div>
    );
  }
  export default MyPage;