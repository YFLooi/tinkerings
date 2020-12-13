import React from 'react';
import logo from './logo.svg';
import './App.css'

class App extends React.Component {
  constructor(props){
      super(props);

     /**Placing all states in single parent page allows for easier manipulation with Redux later*/
     this.state = {
        //For the est
        cards: [],
    }
    this.stateUpdater = this.stateUpdater.bind(this);
    this.renderData = this.renderData.bind(this);
  }
  componentDidMount(){
    const that = this;
    fetch('/NewArrivals', {method:"GET"})
    //Here we chain 2 promise functions: The first fetches data (response), the second examines text in response (data)
    .then(function(response){
        return response.json()
        //Examines data in response
        .then(function(data){
            console.log(data)
            that.renderData(data)
        })
    }).catch(function(error){
        console.log('Request failed', error)
    })  
  }  
  stateUpdater(name,data){
    /* [] allows an external variable to define object property "name". In this case, 
    it's parameter "name".*/
    this.setState({
        [name]: data
    })
  }
  renderData(data){ 
    this.state.cards.splice(0, this.state.cards.length);
    let newCards = [];
    newCards.splice(0, newCards.length);

    for(let i=0; i<4; i++){
      let card = [
        <div key={`card.${i}`} style={{width: '100%', height: 'auto', border:'1px solid white'}}>
            {data[i].title}
        </div>
      ]
      newCards = [...newCards, ...card]
    }
    this.setState({
      cards: [...newCards]
    }) 
  }
  render(){
    return (
      <React.Fragment>
        <div className="App">
          <header className="App-header">
            <div>
              Titles available:
              {this.state.cards}
            </div>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
