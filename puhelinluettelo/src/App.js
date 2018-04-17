import React from 'react';
import './index.css';
import personService from './services/persons'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber:'',
      filter: '',
      message: null
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    event.persist()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    const names = this.state.persons.map((x)=>x.name)
    if (!names.includes(personObject.name)) {
      personService.create(personObject)
        .then(response => {
          const newPerson = {name: this.state.newName, number: this.state.newNumber, id: response.id}
          const persons = this.state.persons.concat(newPerson)
          this.setState({
            persons: persons,
            newName: '',
            newNumber: ''
          })
          console.log(response)
      }).then(()=>this.handleMessageChange('Lisättiin ' + personObject.name)) 
      
    } else {
      if(window.confirm(personObject.name + ' on jo luettelossa, korvataanko vanha numero uudella?')) {
        const toBeUpdatedPerson = this.state.persons.find(person=>person.name === personObject.name)
        console.log(toBeUpdatedPerson)
        const updatedPerson = {name: toBeUpdatedPerson.name, number: this.state.newNumber, id:toBeUpdatedPerson.id}
        console.log(updatedPerson)
        personService.update(updatedPerson.id, updatedPerson)
          .then(response => {
            console.log(response)
            const updatedPersons = this.state.persons.map(person=>person.id !== updatedPerson.id ? person : updatedPerson)
            this.setState({
              persons: updatedPersons,
              newName: '',
              newNumber: ''
            })
          })
          .then(()=>this.handleMessageChange('Korvattiin henkilön ' + personObject.name + ' puhelinnumero uudella'))
          .catch(error=>{
            const persons = this.state.persons.filter(person => person.id !== updatedPerson.id)
            this.setState({
              persons:persons,
              newName:updatedPerson.name,
              newNumber:updatedPerson.number
            })
            this.addPerson(event)
          })
        
      }
    }
    
  }

  handleMessageChange = (text) => {
    this.setState({message:text})
    setTimeout(() => {
      this.setState({message: null})
    }, 5000)
  }

  removePerson = (toBeRemoved) => {
    if(window.confirm('poistetaanko ' + toBeRemoved.name + '?')) {
      personService.remove(toBeRemoved.id)
        .then(response =>{
          console.log(response)
          const persons = this.state.persons.filter(person => person.id !== toBeRemoved.id)
          this.setState({persons:persons})
      }).then(()=>this.handleMessageChange('Poistettiin ' + toBeRemoved.name))
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

  componentDidMount() {
    personService.getAll()
      .then(persons => {
        this.setState({persons})
      })
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
        <Notification message={this.state.message}/>
        <h1>Puhelinluettelo</h1>
        <Filter filter = {this.state.filter} handler = {this.handleFilterChange}/>
        <h2>Lisää uusi:</h2>
        <AdderForm submitHandler={this.addPerson} values={[this.state.newName,this.state.newNumber]} changeHandlers={[this.handleNameChange, this.handleNumberChange]} />
        <h2>Numerot</h2>
        <table>
          <tbody>
            {personsToShow.map((person)=><Person key={person.id} person={person} deleteHandler={()=>this.removePerson(person)} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

const AdderForm = ({submitHandler, values, changeHandlers}) => {
  return(<form onSubmit={submitHandler}>
    <div>
      nimi: <input value={values[0]} onChange={changeHandlers[0]} />
    </div>
    <div>
      numero: <input value={values[1]} onChange={changeHandlers[1]} />
    </div>
    <div>
      <button type="submit">lisää</button>
    </div>
  </form>)
}

const Filter = ({filter, handler}) => {
  return(<div>
    rajaa näytettäviä: <input value={filter} onChange={handler}/>
  </div>)
}

const Person = ({person, deleteHandler}) => {
  return (<tr><td>{person.name}</td><td>{person.number}</td><td>{person.id}</td>{<td><button onClick={deleteHandler}>poista</button></td> }</tr>)
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="success">
      {message}
    </div>
  )
}

export default App