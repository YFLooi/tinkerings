import './App.css';
import OutputBox from './outputBox.tsx';
import ReducerExample from './reducerExample.tsx';
import { useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap'; 


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
  const handleInputChange = (event) => {
    if(event.target.id === "nameInputBox"){
      setName(event.target.value); 
    }
    if(event.target.id === "nameLookupBox"){
      setLookupName(event.target.value);
    }
    if(event.target.id === "updateYearBox"){ 
      //Updating obj and arrays in Hooks is a different from strings, boolean, or numbers
      //Create shallow copy
      const newUpdateYear = {...updateYear}
      newUpdateYear["year"] = event.target.value
      setUpdateYear(newUpdateYear);
    }
    if(event.target.id === "update_idBox"){
      const newUpdate_id = {...updateYear}
      newUpdate_id["_id"] = event.target.value
      setUpdateYear(newUpdate_id);
    }
    if(event.target.id === "delete_idBox"){
      setDelete_id(event.target.value);
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
      if (updateYear[`year`] == "" || updateYear[`_id`] == "" || updateYear == undefined){
        alert("Invalid year submitted")
        return null;
      } 

      fetch(`/api/updateYear/${updateYear[`year`]}/${updateYear[`_id`]}`, {method: "POST"})  
        .then(async function(response){
          const data = await response.text();
          console.log(data);
      })  
      .catch(function(error){
        console.log("Failed to send 'name'.", error)
      })
    }
    if(method === "deleteCompany"){
      //Catch to stop on invalid input
      if (delete_id == "" || delete_id == undefined){
        alert("Invalid _id submitted")
        return null;
      } 

      fetch(`/api/deleteCompany/${delete_id}`, {method: "GET"})  
        .then(async function(response){
          const data = await response.text();
          console.log(data);
      })  
      .catch(function(error){
        console.log(`Failed to delete Document of _id ${delete_id}`, error)
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
          <Button onClick={() =>{clearMessage();}}>Clear messages</Button>
          <Button onClick={() =>{findTwenty();}}>findTwenty</Button>
          <Button onClick={() =>{findTwentyWithSort("ASCENDING");}}>findTwentyWithSort - ASC</Button>
          <Button onClick={() =>{findTwentyWithSort("DESCENDING");}}>findTwentyWithSort - DESC</Button>
          
        </div>
        <div id="nameInput">
          <div>Submit company name</div>
          <div id="nameInput_input">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Company name</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="companyName"
                id="nameInputBox" type="text" placeholder="Type name..." value={name} 
                onChange={(event)=>{handleInputChange(event)}} 
              />
            </InputGroup>
          </div>
          <div id="nameInput_buttons">
            <Button onClick={() =>{handleNameSubmit("GET");}}>Submit company name with GET</Button>
            <Button onClick={() =>{handleNameSubmit("POST");}}>Submit company name with POST</Button>
          </div>
        </div>
        <div id="nameLookup">
          <div>Find first of company name</div>
          <div>
            <input 
              id="nameLookupBox" type="text" placeholder="Type name..." 
              value={lookupName} onChange={(event)=>{handleInputChange(event)}} 
            />
          </div>
          <div>
            <Button onClick={() =>{handleNameSubmit("nameLookup");}}>Submit</Button>
          </div>
        </div>
        <div id="updateYear">
          <div>Update year by company _id</div>
          <div>
            <input 
              id="updateYearBox" type="text" placeholder="Type year..." 
              value={updateYear["year"]} 
              onChange={(event)=>{handleInputChange(event)}} 
            />
            <input 
              id="update_idBox" type="text" placeholder="Type _id..." 
              value={updateYear["_id"]} 
              onChange={(event)=>{handleInputChange(event)}} 
            />
          </div>
          <div>
            <Button onClick={() =>{handleNameSubmit("updateYear");}}>Submit</Button>
          </div>
        </div>
        <div id="deleteCompany">
          <div>Delete entry by company _id</div>
          <div>
            <input id="delete_idBox" type="text" placeholder="Type _id..." value={delete_id} onChange={(event)=>{handleInputChange(event)}} />
          </div>
          <div>
            <Button onClick={() =>{handleNameSubmit("deleteCompany");}}>Submit</Button>
          </div>
        </div>
        <div id="outputBox">{output}</div>
        <OutputBox output={output}></OutputBox>
      </div>
    </div>
  );
}

export default App;
