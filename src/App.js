import axios, { all } from "axios";
import { useEffect, useState } from "react";

function App() {

  const [pepList, setPepList] = useState([]);
  const [status, setStatus] = useState('Loading...');
  const [searchStatus, setSearchStatus] = useState('');
  const [searchValue, setSearchValue] = useState('');

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
      return "";
    }
    const result = pepList.filter(person => {
      if (person.Name && person.Name.includes(event.target.value)) {
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
              <div id={index} style={{borderBottom: "1px solid #ededed", marginBottom: "1rem"}}>
                <div><p><strong>ИМЕ: </strong> {person.Name}</p></div>
                <div><p><strong>ПОЗИЦИЯ: </strong> {person.Position}</p></div>
                <div><p><strong>КАТЕГОРИЯ: </strong> {person.Category}</p></div>
                <div><p><strong>ИНСТИТУЦИЯ: </strong> {person.Institution}</p></div>
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
