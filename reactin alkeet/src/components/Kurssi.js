import React from 'react'

const Otsikko = (props) => {
  return (
    <div>
      <h1>{props.kurssi}</h1>
    </div>
    )
}

const Sisalto = ({osat}) => {
  return (
    <div>
      {osat.map((osa)=><Osa key={osa.nimi} osa={osa}/>)} 
    </div>
    )
}

const Yhteensa = ({osat}) => {
  return (
    <div>
      <p>yhteensä {osat.map((x)=>x.tehtavia).reduce((x,y)=>x+y)} tehtävää</p>
    </div>
  )
}

const Osa = (props) => {
  return (
    <p>{props.osa.nimi} {props.osa.tehtavia}</p>
  )
}

const Kurssi = ({kurssi}) => {
  return (<div>
      <Otsikko kurssi = {kurssi.nimi}/>
      <Sisalto osat={kurssi.osat} />
      <Yhteensa  osat={kurssi.osat}/>
    </div>)
  
  }

export default Kurssi