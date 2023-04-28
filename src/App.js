import styles from './App.module.css';
import { useEffect, useState } from 'react';
import Card from './components/Card';
const App = () => {
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([]);
  const [searchedData, setSearchedData] = useState([])
  const [search, setSearch] = useState("");
  const [searchBtn, setSearchBtn] = useState("")
  const [url] = useState(`https://anime-db.p.rapidapi.com/anime?page=1&size=2`)


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': '76cb420dbbmsh48a7fd99d00b02ep1e3905jsn9da1a362b25b',
          'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
        }
      });

      const result = await response.json()
      console.log("result", result);
      return setData(result.data);
    }

    fetchData();

  }, [])
  useEffect(() => {
    setFilterData(data.filter(word => word.title.toLowerCase().includes(search.toLowerCase())))
  }, [search])

  useEffect(() => {
    // b3ceb850ecmshcd89d23fc593b10p1025e1jsne83300f2c770 EU
    // 76cb420dbbmsh48a7fd99d00b02ep1e3905jsn9da1a362b25b EDI
    // ed55e878d0msh0aa1cf2b4e0e701p1b9c40jsn1ae176818d78 ANDREI
    const fetchData = async () => {
      console.log(`${url}&search=${searchBtn}`)
      const response = await fetch(`${url}&search=${searchBtn}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': '76cb420dbbmsh48a7fd99d00b02ep1e3905jsn9da1a362b25b',
          'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
        }
      });

      const result = await response.json();
      console.log("date la btn" , result)
      return setSearchedData(result.data);
    }

    fetchData();
  }, [searchBtn])

  return (
    <div className={styles.App}>
      <div className={styles.search}>
        <input type="search" placeholder='Search for an Anime' value={search} className={styles.mySearch}
          onChange={(e) => setSearch(e.target.value)}
        />
        {filterData.length === 0 ? <button className={styles.btnSearch} onClick={() => {
          setSearchBtn(search)
        }}>Search</button> : ""}
      </div>
      <div className={styles.container}>
        {filterData.length > 0 ?

          filterData.map((item, index) => {
            return (
              <Card props={item} key={index} />
            )
          })

           : filterData.length === 0 && search.length>1 ?
           
           "Anime was not found, please search for" :

           searchedData.length> 0 ? searchedData.map((item, index) => {
            return (
              <Card props={item} key={index} />
            )
          }) :

          
           data.map((item, index) => {
            return (
              <Card props={item} key={index} />
            )
          })
           }
      </div>

    </div>
  );
}

export default App;
