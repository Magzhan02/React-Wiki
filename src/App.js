import React from 'react';
import axios from 'axios'
import ResultBlock from './components/ResultBlock';

function App() {
  const [search, setSearch] = React.useState('');
  const [result, setResult] = React.useState([]);
  const [totalResult, setTotalResult] = React.useState('');
  const [page, setPage] = React.useState(40);

  const getResult = async () =>{
    if(search.length <= 0) return;
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&
    prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=${page}&srsearch=${search}`
    const {data} = await axios(endpoint);

    setResult([...new Set([...data.query.search])]);
    
    setTotalResult(data.query.searchinfo.totalhits);
  }
  const getMore = () =>{
    setPage((prev => prev + 10));
    getResult();
  }

  return (
   <div className='app'>
     <header>
       <h1>React-Wiki<span>.en</span></h1>
       <input type='text' placeholder='Search...' value={search} onChange={e => setSearch(e.target.value)}/>
        <button onClick={getResult}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path
               d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z"
               stroke="black" strokeWidth="1" strokeLinecap="round" />
        </svg>
        </button>
     </header>
    <div className='count'>
      {totalResult ? <h2>Results: {totalResult}</h2>:''}
    </div>
     {
       result.map((obj,index) =>(
        <ResultBlock key={index} {...obj}/>
       ))
     }
     {totalResult ?<button className='more' onClick={getMore}>Load more...</button>:''}
   
   </div>
  );
}

export default App;
