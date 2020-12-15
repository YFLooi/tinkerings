import logo from './logo.svg';
import './App.css';


function App() {
  const findAll = () => {
    fetch("/api/findAll", {method: "GET"})  
      .then(async function(response){
        const data = await response.json();
  
        console.log("Results of test:");
        console.log(data);
        document.getElementById("outputBox").innerHTML = data;
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
        <div id="outputBox"></div>
        <div id="controlButtons">
          <button onClick={() =>{clearMessage();}}>Clear message</button>
          <button onClick={() =>{findAll();}}>findAll</button>
          
        </div>
      </div>
    </div>
  );
}

export default App;
