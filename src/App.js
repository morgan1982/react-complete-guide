import React, { Component } from 'react';
import Person from './Person/Person';
import './App.css';
import Radium, { StyleRoot } from 'radium';

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
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }
    let persons = null;
     if (this.state.showList)
     {
      persons = (
        <div>
        {this.state.persons.map((person, index) => {
            return <Person
            click={() => this.deletePersonHandler(index)}
            name={person.name}
            age={person.age}
            key={person.id}
            changed={(event) => this.nameChangeHandler(event, person.id)} />
          })}
      </div>
        );
        style.backgroundColor = 'red';
        style[':hover'] = {
          backgroundColor: 'tomato',
          color: 'black'
        }
      }

      let classes = [];
      if (this.state.persons.length <= 2) 
      {
        classes.push('red');
      }
      if (this.state.persons.length <= 1)
      {
        classes.push('bold'); // classes red and bold
      }


    return (
      <StyleRoot>
      <div className="App">
        <h1>hi from react</h1>
        <p className={classes.join(' ')}>index</p>
        {/* return a function call  this can be ineficient*/}
          <button onClick={this.listHandler} style={style}>toggle list</button>
          {persons}
      </div>
      </StyleRoot>
    );
  
  }
}

export default Radium(App);
