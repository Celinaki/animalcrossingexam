import { useState, useEffect, React } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from '../components/Navbar'
import style from '../styling/Homepage.module.scss'
import { getSeacreatures } from "../api/seacreatures";
import Categories from "../components/Categories";
import Filtering from "../modals/Filtering";
import { useParams } from "react-router-dom";
import Spinner from '../components/Spinner.jsx';
import Songcard from "../components/Songcard";
import NavWave from "../components/NavWave";
import SeacreatureCard from "../components/SeacreatureCard";
import SearchBar from "../components/Searchbar";

const SeacreaturesPage = () => {
  //Todos: Pagination, filtering
  const [searchParams, setSearchParams] = useSearchParams();

  //Array lists
  //Array lists

  const [loadingSpinner, setLoadingSpinner] = useState(false)
  const [theDisplayedList, setTheDisplayedList] = useState([])

  useEffect(() => {
    getSeacreatures()
    .then((data) => {
    setTheDisplayedList(data) 
    console.log(theDisplayedList)
    })
    setTimeout(() => {
        setLoadingSpinner(false)
      }, 1300)
      setLoadingSpinner(true)


  }, [])





  //Query from categories
  const [query, setQuery] = useState('')
  const [otherCriteria, setOtherCriteria] = useState(false)
  const onUpdateQuery = (q, data) => {
    setOtherCriteria(true)
    setQuery(q)
    setTheDisplayedList(data)
    setTimeout(() => {
      setLoadingSpinner(false)
    }, 1300)
    setLoadingSpinner(true)
  }
  //Query from categories

  //Query from filter

  const onUpdateFilter = (data) => {
    setOtherCriteria(true)
    console.log(data, "här är data från home")
    setTheDisplayedList(data)
    setTimeout(() => {
      setLoadingSpinner(false)
    }, 1300)
    setLoadingSpinner(true)
  }
  
  //Query from filter

  const [search, setSearch] = useState('')
  const [searchArray, setSearchArray] = useState([])
  useEffect(() => {
    if (search && typeof search === 'string') {
      setSearchArray(
        theDisplayedList.filter(item =>
          item.name["name-USen"].toLowerCase().includes(search.toLowerCase()))
      )
    }
  }, [search, theDisplayedList])

  const searchOnQuery = (e)=>{
    console.log(e)
    setSearch(e)
  }
 
  return (
    <>
      <Navbar />
      <NavWave />
      <SearchBar searchOnQuery={searchOnQuery}/>

      <section style={{ display: "flex", alignItems: "center" }}>
        
        <Filtering onUpdatedFilter={onUpdateFilter} fromPage={'seacreatures'} />
        <Categories onChosenCat={onUpdateQuery} />
      </section>
      {/* <input type="text" onChange={(e) => setSearch(e.target.value)} /> */}
      <div className={style.homewrapper}>
        {loadingSpinner ? (
          <Spinner> </Spinner>
        ) : search !== '' ? (
          searchArray.length > 0 ? (
            searchArray.map(creature => <SeacreatureCard creature={creature} />)
          ) : (
            <p>No results found for "{search}"</p>
          )
        ) : (
          theDisplayedList.map(creature => <SeacreatureCard creature={creature} />)
        )}
      </div>
    </>

  )
}

export default SeacreaturesPage 