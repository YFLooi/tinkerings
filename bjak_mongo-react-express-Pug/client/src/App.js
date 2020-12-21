import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function App() {
  const [output, setOutput] = useState([])

  const findAll = () => {
    fetch("/api/findTwenty", {method: "GET"})  
      .then(async function(response){
        const data = await response.json();
  
        console.log("Results of test:");
        console.log(data);

        const dataDisplay = data.map((item, index, array) => {
          return [
            <div key={`output_${index}`}>
              {item[`name`]}@{item[`twitter_username`]}
            </div>
          ]
        })
        setOutput([...dataDisplay]);
    })  
    .catch(function(error){
      console.log("Request failed", error)
    })
  }
  const clearMessage = () => {
    document.getElementById("outputBox").innerHTML = "";
  }

  return (
    <div className="App">
      <header className="App-header">
        Work on data from MongoDB with Mongoose
      </header>
      <div className="body">
        <div id="outputBox">{output}</div>
        <div id="controlButtons">
          <button onClick={() =>{clearMessage();}}>Clear message</button>
          <button onClick={() =>{findAll();}}>findAll</button>
          
        </div>
      </div>
    </div>
  );
}

export default App;
