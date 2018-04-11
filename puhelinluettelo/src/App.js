import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
      { name: 'Martti Tienari', number: '040-123456' },
      { name: 'Arto Järvinen', number: '040-123456' },
      { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber:'',
      filter: ''
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

  handleFilterChange = (event) => {
    console.log(event.target.value)
    this.setState({ filter: event.target.value })
  }

  render() {
    const matches = (x) => {
      const low = x.name.toLowerCase()
      const filter = this.state.filter.toLowerCase()
      return (low.indexOf(filter) !== -1)
    }
    const personsToShow = 
      this.state.filter ?
        this.state.persons.filter(matches) :
        this.state.persons
    
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <div>
            rajaa näytettäviä: <input value={this.state.filter} onChange={this.handleFilterChange}/>
        </div>
        <h2>Lisää uusi:</h2>
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
            {personsToShow.map((person)=><Person key={person.name} person={person}/>)}
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