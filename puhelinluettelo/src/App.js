import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number:'040-123456' }
      ],
      newName: '',
      newNumber:''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    const names = this.state.persons.map((x)=>x.name)
    if (!names.includes(personObject.name)) {
      const persons = this.state.persons.concat(personObject)
      this.setState({
        persons: persons,
        newName: '',
        newNumber: ''
      })
    } else {
      alert('Saman niminen henkilö on jo listalla')
      this.setState({
        persons: this.state.persons,
        newName: '',
        newNumber: ''
      })
    }
    
  }

  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameChange}/>
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleNumberChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <table>
          <tbody>
            {this.state.persons.map((person)=><Person key={person.name} person={person}/>)}
          </tbody>
        </table>
      </div>
    )
  }
}
const Person = ({person}) => {
  return (<tr><td>{person.name}</td><td>{person.number}</td></tr>)
}
export default App