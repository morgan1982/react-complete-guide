import React, { Component } from 'react';
import Person from './Person/Person';
import './App.css';

class App extends Component {
  state = {
    persons: [
      {id: '1', name: 'max', age: 28},
      {id: '2', name: 'tom', age: 32},
      {id: '3', name: 'antony', age: 29}
    ],
    showPersons: false,
    showList: false
  }

  nameChangeHandler = (e, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });
    // dont mutate the state directly (person is just a pointer!)
    const person = {
      ...this.state.persons[personIndex]
    } 
    // const person = Object.assgn({}, this.state.persons[personIndex])

    person.name = e.target.value;

    // again a copy of the state
    const persons = [...this.state.persons];
    persons[personIndex] = person; // changes the selected person object

    // update the original state
    this.setState({
      persons
    })
  }
  listHandler = () => 
  {
    let toggler;
    this.state.showList === false ? toggler = true : toggler = false;
    this.setState({
      showList: toggler
    })
  }
  deletePersonHandler = (id) =>
  {
    // const persons = this.state.persons.slice(); //or
    const persons = [...this.state.persons];
    persons.splice(id, 1); // removes an element from the array
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
          {this.state.persons.map((person, index) => {
            return <Person 
              key={person.id} 
              name={person.name} 
              age={person.age} 
              click={() => this.deletePersonHandler(index)} 
              changed={(e) => this.nameChangeHandler(e, person.id)}
              />
          })}

      </div>
    );
  }
}

export default App;
