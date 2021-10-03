import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([])
  const [dogFocus, setDogFocus] = useState([])
  const [filter, setFilter] = useState(false)
  const fetchData = () => {
    fetch(`http://localhost:3001/pups`)
    .then(resp => resp.json())
    .then(data => {
      console.log('Data: ', data)
      setData(data)
    })
  }
  useEffect(() => {
    fetchData()
  }, [])
  const changeDogFocus = (pup) => {
    console.log(pup)
    setDogFocus([pup])
    console.log(dogFocus.length)
  }
  const updateGoodDogStatus = (pup) => {
    console.log('pup', pup)
    fetch(`http://localhost:3001/pups/${pup[0].id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isGoodDog: !pup[0].isGoodDog
      })
    })
    .then(resp => resp.json())
    .then(data => {
      fetchData()
      setDogFocus([data])})
  }
  const renderPups = (pup, index) => {
    if (filter && pup.isGoodDog) {
      return <span key={index} onClick={() => changeDogFocus(pup)}>{pup.name}</span>
    } else if (!filter) {
      return <span key={index} onClick={() => changeDogFocus(pup)}>{pup.name}</span>
    } else {
      console.log('ERROR')
    }
    
  }
  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter" onClick={() => setFilter(!filter)}>{`Filter good dogs: ${filter ? 'ON': 'OFF'}`}</button>
      </div>
      <div id="dog-bar">
        {data.map((each, index) => renderPups(each, index))}
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          {
          
          dogFocus.length === 1 ? <div>
            <img src={dogFocus[0].image} />
            <h2>{dogFocus[0].name}</h2>
            <button onClick={() => updateGoodDogStatus(dogFocus)}>{dogFocus[0].isGoodDog ? "Good Dog!": "Bad Dog!"}</button>
            </div> : null}

        </div>
      </div>
    </div>
  );
}

export default App;
