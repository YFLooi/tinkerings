import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function App() {
  const [output, setOutput] = useState([]);
  const [name, setName] = useState("");
  const [lookupName, setLookupName] = useState("");
  const [updateYear, setUpdateYear] = useState({year: "", _id: ""});
  const [delete_id, setDelete_id] = useState("");

  const findTwenty = () => {
    fetch("/api/findTwenty", {method: "GET"})  
      .then(async function(response){
        const data = await response.json();
  
        console.log("Results of request by findTwenty:");
        console.log(data);

        const dataDisplay = data.map((item, index, array) => {
          return [
            <div key={`output_${index}`}>
              {item[`name`]}, founded in Year: {item[`founded_year`]}. _id:{item[`_id`]}
            </div>
          ]
        })
        setOutput([...dataDisplay]);
    })  
    .catch(function(error){
      console.log("Request failed", error)
    })
  }
  const findTwentyWithSort = (order) => {
    fetch(`/api/findTwentyWithSort/${order}`, {method: "GET"})  
      .then(async function(response){
        const data = await response.json();
  
        console.log("Results of request by findTwentyWithSort:");
        console.log(data);

        const dataDisplay = data.map((item, index, array) => {
          return [
            <div key={`output_${index}`}>
              {item[`name`]}, founded in Year: {item[`founded_year`]}. _id:{item[`_id`]}
            </div>
          ]
        })
        setOutput([...dataDisplay]);
    })  
    .catch(function(error){
      console.log("Request failed", error)
    })
  }
  const handleNameChange = (event) => {
    if(event.target.id === "nameInputBox"){
      setName(event.target.value); 
    }
    if(event.target.id === "nameLookupBox"){
      setLookupName(event.target.value);
    }
  }
  const handleNameSubmit = (method) => {
    if(method === "GET"){
      //Catch to stop on invalid input
      if (name == "" || name == undefined){
        alert("No name submitted")
        return null;
      } 

      fetch(`/api/save-with-GET/${name}`, {method: "GET"})  
        .then(async function(response){
          const data = await response.text();
          console.log(data);
      })  
      .catch(function(error){
        console.log("Failed to send 'name'.", error)
      })
    }
    if(method === "POST"){
      //Catch to stop on invalid input
      if (name == "" || name == undefined){
        alert("No name submitted")
        return null;
      } 
      
      fetch(`/api/save-with-POST/${name}`, {method: "POST"})  
        .then(async function(response){
          const data = await response.text();
          console.log(data);
      })  
      .catch(function(error){
        console.log("Failed to send 'name'.", error)
      })
    }
    if(method === "nameLookup"){
      //Catch to stop on invalid input
      if (lookupName == "" || lookupName == undefined){
        alert("No name submitted")
        return null;
      } 

      fetch(`/api/findFirst/${lookupName}`, {method: "GET"})  
        .then(async function(response){
          const data = await response.json();
          
          console.log("Results of request by nameLookup:");
          console.log(data);
  
          const displayData = [data]
          const dataDisplay = displayData.map((item, index, array) => {
            return [
              <div key={`output_${index}`}>
                {item[`name`]}, founded in Year: {item[`founded_year`]}. _id:{item[`_id`]}
              </div>
            ]
          })
          setOutput([...dataDisplay]);
      })  
      .catch(function(error){
        console.log("Failed to send 'name'.", error)
      })
    }
    if(method === "updateYear"){
      //Catch to stop on invalid input
      if (updateYear == "" || updateYear == undefined || typeof (updateYear) != "number"){
        alert("Invalid year submitted")
        return null;
      } 

      fetch(`/api/updateYear/${updateYear[`year`]}/${updateYear[`_id`]}`, {method: "GET"})  
        .then(async function(response){
          const data = await response.text();
          
          console.log("Results of request by nameLookup:");
          console.log(data);
      })  
      .catch(function(error){
        console.log("Failed to send 'name'.", error)
      })
    }
    if(method === "deleteCompany"){
      //Catch to stop on invalid input
      if (updateYear == "" || updateYear == undefined || typeof (updateYear) != "number"){
        alert("No name submitted")
        return null;
      } 

      fetch(`/api/updateYear/${updateYear[`year`]}/${updateYear[`_id`]}`, {method: "GET"})  
        .then(async function(response){
          const data = await response.text();
          
          console.log("Results of request by nameLookup:");
          console.log(data);
      })  
      .catch(function(error){
        console.log("Failed to send 'name'.", error)
      })
    }
  }
  const clearMessage = () => {
    setOutput([]);
    //document.getElementById("outputBox").innerHTML = "";
  }

  return (
    <div className="App">
      <header className="App-header">
        Work on data from MongoDB with Mongoose
      </header>
      <div className="body">
        <div id="controlButtons">
          <button onClick={() =>{clearMessage();}}>Clear messages</button>
          <button onClick={() =>{findTwenty();}}>findTwenty</button>
          <button onClick={() =>{findTwentyWithSort("ASCENDING");}}>findTwentyWithSort - ASC</button>
          <button onClick={() =>{findTwentyWithSort("DESCENDING");}}>findTwentyWithSort - DESC</button>
          
        </div>
        <div id="nameInput">
          <div>Submit company name</div>
          <div>
            <input id="nameInputBox" type="text" placeholder="Type name..." value={name} onChange={(event)=>{handleNameChange(event)}} />
          </div>
          <div>
            <button onClick={() =>{handleNameSubmit("GET");}}>Submit company name with GET</button>
            <button onClick={() =>{handleNameSubmit("POST");}}>Submit company name with POST</button>
          </div>
        </div>
        <div id="nameLookup">
          <div>Find first of company name</div>
          <div>
            <input id="nameLookupBox" type="text" placeholder="Type name..." value={lookupName} onChange={(event)=>{handleNameChange(event)}} />
          </div>
          <div>
            <button onClick={() =>{handleNameSubmit("nameLookup");}}>Submit</button>
          </div>
        </div>
        <div id="updateYear">
          <div>Update year by company _id</div>
          <div>
            <input id="updateYearBox" type="text" placeholder="Type year..." value={updateYear} onChange={(event)=>{handleNameChange(event)}} />
            <input id="update_idBox" type="text" placeholder="Type _id..." value={updateYear} onChange={(event)=>{handleNameChange(event)}} />
          </div>
          <div>
            <button onClick={() =>{handleNameSubmit("updateYear");}}>Submit</button>
          </div>
        </div>
        <div id="deleteCompany">
          <div>Delete entry by company _id</div>
          <div>
            <input id="delete_idBox" type="text" placeholder="Type _id..." value={updateYear} onChange={(event)=>{handleNameChange(event)}} />
          </div>
          <div>
            <button onClick={() =>{handleNameSubmit("deleteCompany");}}>Submit</button>
          </div>
        </div>
        <div id="outputBox">{output}</div>
      </div>
    </div>
  );
}

export default App;
