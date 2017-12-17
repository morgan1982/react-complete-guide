import React, { Component } from 'react';
import Persons from '../components/Persons/Persons';
import ErrorBountry from '../ErrorBoundary/ErrorBoundary';
import classes from './App.css';
import Cockpit from '../components/Cockpit/Cockpit';
// for use of a css class globally use the :global prefix to the class selector

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

    let persons = null;
     if (this.state.showList)
     {
      persons = <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}
          />
      }

    return (

      <div className={classes.App}>
          <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showList}
          persons={this.state.persons}
          clicked={this.listHandler}
          />
          {persons}
      </div>
    );
  
  }
}

export default App;
