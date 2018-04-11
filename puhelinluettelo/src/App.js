import React from 'react';
import axios from 'axios'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
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
  componentDidMount() {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        this.setState({ persons: response.data })
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
        <h1>Puhelinluettelo</h1>
        <Filter filter = {this.state.filter} handler = {this.handleFilterChange}/>
        <h2>Lisää uusi:</h2>
        <AdderForm submitHandler={this.addPerson} values={[this.state.newName,this.state.newNumber]} changeHandlers={[this.handleNameChange, this.handleNumberChange]} />
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

const Person = ({person}) => {
  return (<tr><td>{person.name}</td><td>{person.number}</td></tr>)
}

 

export default App