import { useState, useEffect, React } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from '../components/Navbar'
import style from '../styling/Homepage.module.scss'
import Villagercard from "../components/Villagercard";
import { getVillagers } from "../api/villagers";
import { getSongs } from "../api/songs";
import Categories from "../components/Categories";
import Filtering from "../modals/Filtering";
import { useParams } from "react-router-dom";
import Spinner from '../components/Spinner.jsx';
import Songcard from "../components/Songcard";
import NavWave from "../components/NavWave";

const Songs = () => {
  //Todos: Pagination, filtering
  const [searchParams, setSearchParams] = useSearchParams();

  //Array lists
  //Array lists

  const [loadingSpinner, setLoadingSpinner] = useState(false)
  const [theDisplayedList, setTheDisplayedList] = useState([])

  useEffect(() => {
    getSongs()
    .then((songData) => {
    setTheDisplayedList(songData) 
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
useEffect(()=>{
if(search && typeof search === 'string'){
  setSearchArray(
    theDisplayedList.filter(item =>
    item.name["name-USen"].toLowerCase().includes(search.toLowerCase()))
  )
}
},[search, theDisplayedList])

  return (
    <>
      <Navbar />
      <NavWave />
      <section style={{ display: "flex", alignItems: "center" }}>
        <Filtering onUpdatedFilter={onUpdateFilter} fromPage={'songPage'} />
        <Categories onChosenCat={onUpdateQuery} />
      </section>
      <input type="text" onChange={(e)=> setSearch(e.target.value)} />
      <div className={style.homewrapper}>
      {loadingSpinner ? (
  <Spinner> </Spinner>
) : search !== '' ? (
  searchArray.length > 0 ? (
    searchArray.map(song => <Songcard song={song} />)
  ) : (
    <p>No results found for "{search}"</p>
  )
) : (
  theDisplayedList.map(song => <Songcard song={song} />)
)}
      </div>
    </>

  )
}

export default Songs 