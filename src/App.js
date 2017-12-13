import React, { Component } from 'react';
import Person from './Person/Person';
import './App.css';

class App extends Component {
  state = {
    persons: [
      {name: 'max', age: 28},
      {name: 'tom', age: 32},
      {name: 'antony', age: 29}
    ],
    showPersons: false,
    showList: false
  }

  nameHandler = (name) => {
    this.setState({
      persons: [
        {name: name, age: 50},
        {name: 'tom', age: 30},
        {name: 'julia', age: 34}
      ]
    })
  }

  nameChangeHandler = (e) => {
    this.setState({
      persons: [
        {name: "michael", age: 20},
        {name: e.target.value, age: 30},
        {name: 'julia', age: 34}
      ] 
    })
  }
  listHandler = () => 
  {
    let toggler;
    this.state.showList == false ? toggler = true : toggler = false;
    this.setState({
      showList: toggler
    })
  }
  deletePersonHandler = (id) =>
  {
    const persons = this.state.persons;
    console.log(persons)
    persons.splice(id, 1); // removes an element from the array
    console.log(persons);
    this.setState({
      persons
    })
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }
    let items = null;
     if (this.state.showList)
     {
      items = <ul>
         <li>chickens</li>
         <li>dog</li>
         <li>cat</li>
       </ul>
     };
    return (
      <div className="App">
        <h1>hi from react</h1>
        {/* return a function call  this can be ineficient*/}
          <button onClick={this.listHandler}>toggle list</button>
          {items}
          {this.state.persons.map((person, id) => {
            return <Person 
              key={id} 
              name={person.name} 
              age={person.age} 
              click={() => this.deletePersonHandler(id)} 
              changed={this.nameChangeHandler}
              />
          })}

      </div>
    );
  }
}

export default App;
