import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import Users from "./data.json";
import axios from 'axios'

function App (){ 
  const [data, setData] = useState([]);
  const [query , setQuery] = useState("");

  const [users, setUsers] = useState(Users);

  useEffect(() => {
    setUsers(users.filter(item => item.departments.includes(query)));
  }, [query]);
  
  console.log(query)

  useEffect(() => {
    const fetchdata = async () => {
      const result = await axios(
        'https://geo.api.gouv.fr/departements',
      );

      setData(result.data);
    };
    fetchdata();
  },[]);
  
  return(      
    <div className="app-container">
      <Fragment>
          <select name="departement" id="departement-select" onChange={(e) => setQuery(e.target.value) }>
            {data.map(departement => (
              <option value={departement.code}>{departement.nom}</option>
            ))}
          </select>            
      </Fragment>  
        <table>
          <thead>
            <tr> Prenom </tr> 
          </thead>
          <tbody>
          {
            (users || []).map( user => {
              return(   
                <tr key={user.id}>  
                  <td>{user.name}</td>
                </tr>        
            )})} 
            </tbody>
      </table>
    </div>
  ); 
};

export default App;
