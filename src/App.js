import axios, { all } from "axios";
import { useEffect, useState } from "react";

function App() {

  const [pepList, setPepList] = useState([]);
  const [status, setStatus] = useState('Loading...');
  const [searchStatus, setSearchStatus] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/pep').then(response => {
      if (response.data.success === true) {
        setPepList(response.data.data);
        console.log(response.data.data);
        setStatus('Ready!')
      }
    }).catch(error => {
      console.error(error);
    })
  }, []);

  const getPerson = (event) => {
    if (!event.target.value) {
      setSearchStatus("");
      return "";
    }
    const result = pepList.filter(person => {
      if (person.name && person.name.includes(event.target.value)) {
        return person;
      }

      return "";
    });

    setSearchStatus(result);
  }

  return (
    <div className="App">
      <header className="App-header" style={{
        textAlign: "center"
      }}>
        <h1>Due Diligence</h1>
        <p>Hello, please type bellow the name of the person that you want to check</p>
        <p><strong>STATUS:</strong> { status }</p>
        <input onChange={getPerson} />
        {searchStatus ? (() => {
          if (searchStatus) {
            const allResults = [];
            let index = 0;
            for(const person of searchStatus) {
              allResults.push(
              <div id={index} style={{borderBottom: "1px solid black", margin: "1rem", paddingBlockEnd: "1rem"}}>
                <div><h2><strong>ИМЕ: </strong> {person.name}</h2></div>
                <div style={{display: "grid", gap: "50px", gridTemplateColumns: "1fr 1fr 1fr 1fr"}}>
                { (() => {
                  const jobInformation = [];
                  let index = 0;
                  for (const job of person.history) {
                    jobInformation.push(<div id={index} style={{border: "1px solid red", display: "flex", flexFlow: "column"}}>
                      <p><strong>ГОДИНА: { job.year }</strong></p>
                      <p><strong>ЗАЕМАНА ПОЗИЦИЯ: { job.position }</strong></p>
                      <p><strong>КАТЕГОРИЯ НА ПОЗИЦИЯТА: { job.category }</strong></p>
                      <p><strong>ИНСТИТУЦИЯ НА РАБОТА: { job.institution }</strong></p>
                    </div>)
                  }

                  return jobInformation;
                })()}
                </div>
              </div>)

              index++;
            }

            return allResults;
          }
        })() : searchStatus}
      </header>
    </div>
  );
}

export default App;
