import React, { Component } from 'react';
import Person from './Person/Person';
import ErrorBountry from './ErrorBoundary/ErrorBoundary';
import classes from './App.css';
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
    let btnClasses = ''
     if (this.state.showList)
     {
      btnClasses = classes.Red; // css-loader will give a string!


      persons = (
        <div>
        {this.state.persons.map((person, index) => {
            return <ErrorBountry  key={person.id}><Person
            click={() => this.deletePersonHandler(index)}
            name={person.name}
            age={person.age}
            changed={(event) => this.nameChangeHandler(event, person.id)} />
            </ErrorBountry>
          })}
      </div>
        );
      }

      let assignedClasses = [];
      if (this.state.persons.length <= 2) 
      {
        assignedClasses.push(classes.red);
      }
      if (this.state.persons.length <= 1)
      {
        assignedClasses.push(classes.bold); // classes red and bold
      }
      


    return (

      <div className={classes.App}>
        <h1>hi from react</h1>
        <p className={assignedClasses.join(' ')}>index</p>
        {/* return a function call  this can be ineficient*/}
          <button onClick={this.listHandler} className={btnClasses}>toggle list</button>
          {persons}
      </div>
    );
  
  }
}

export default App;
