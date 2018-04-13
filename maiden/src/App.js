import React from 'react';
import axios from 'axios'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: '',
      selected: ''
    }
  }
  
  handleFilterChange = (event) => {
    console.log(event.target.value)
    this.setState({ filter: event.target.value })
    this.setState({selected: ''})
  }

  handleSelectedChange = (event) => {
    console.log(event)
    this.setState({ selected: event})
  }
  
  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  render() {
    const matches = (x) => {
      const low = x.name.toLowerCase()
      const filter = this.state.filter.toLowerCase()
      return (low.indexOf(filter) !== -1)
    }
    const countriesToShow = 
      this.state.filter ?
        this.state.countries.filter(matches) :
        this.state.countries
    
    return (
      <div>
        <Filter filter = {this.state.filter} handler = {this.handleFilterChange}/>
        <Countries countries = {countriesToShow} selectHandler = {this.handleSelectedChange} selected ={this.state.selected} />
      </div>
    )
  }
}

const Countries = ({countries, selectHandler, selected}) => {
  if (countries.length === 1) {
    return <Country country = {countries[0]} selectHandler = {selectHandler} selected ={countries[0].name} />
  } else if (countries.length <= 10) {
    return(
      <div>{countries.map((country)=><Country key = {country.name} country={country} selectHandler = {selectHandler} selected ={selected}/>)}</div>
    ) 
  } else {
    return (<p>too many matches, specify another filter</p>)
  }
}

const Filter = ({filter, handler}) => {
  return(<div>
    Find countries: <input value={filter} onChange={handler}/>
  </div>)
}

const Country = ({country, selectHandler, selected}) => {
  if (selected !== country.name) {
    return <div onClick={(event)=>selectHandler(country.name)}>{country.name}</div>
  } else {
    return (
      <div>
        <h1>{country.name} {country.nativeName}</h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <img src={country.flag} alt='Here should be a the flag' height={200} width = {300}/>
      </div>
    )
  }
}

export default App