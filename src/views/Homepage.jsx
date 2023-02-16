import { useState, useEffect, React } from "react";
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

const Home = () => {
  //Todos: Pagination, filtering

  //Array lists
  const [alphVillagersList, setAlphVillagersList] = useState([])
  const [genVillagersList, setGenVillagersList] = useState([])
  const [arrayList, setArrayList] = useState([])
  const [narrayList, setnArrayList] = useState([])
  const villagerList = arrayList;
  //Array lists

  const [loadingSpinner, setLoadingSpinner] = useState(false)




  // const [filterQuery, setFilterQuery] = useState('')
  // const handleFiltering = (f) => {
  //   setFilterQuery(f)
  //   console.log(filterQuery, "detta e filter query")
  //   if (f === 'alph') {
  //     return alphVillagersList
  //   }
  //   else if (f === 'gender') {

  //   }
  //   else return
  // }

  const [villagerPage, setVillagerPage] = useState(false)
  const [displayedVillagers, setDisplayedVillagers] = useState([])
  const { filterQ } = useParams()
  const { villagers } = useParams()
  //const {songs} = useParams()

  // useEffect(() => {
  //   console.log(villagers, "villagers params är false?")
  //   if (villagers) {
  //     setVillagerPage(true)
  //     setTimeout(() => {
  //       setLoadingSpinner(false)
  //     }, 1300)
  //     setLoadingSpinner(true)

  //   }
  //   if (filterQ === 'alph') {
  //     console.log(villagerList, "här är villagerslist")
  //     const sortedArray = alphVillagersList.sort((a, b) => {
  //       if (a.name["name-USen"] < b.name["name-USen"]) {
  //         return -1;
  //       }
  //       if (a.name["name-USen"] > b.name["name-USen"]) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //     setDisplayedVillagers(sortedArray)
  //     setTimeout(() => {
  //       setLoadingSpinner(false)
  //     }, 1300)
  //     setLoadingSpinner(true)
  //   }

  //   else if (filterQ === 'Female' || filterQ === 'Male') {
  //     setDisplayedVillagers(narrayList.filter(villager => villager.gender === filterQ))
  //     setTimeout(() => {
  //       setLoadingSpinner(false)
  //     }, 1300)
  //     setLoadingSpinner(true)
  //   }
  //   else
  //     setDisplayedVillagers(narrayList)
  //   setTimeout(() => {
  //     setLoadingSpinner(false)
  //   }, 1300)
  //   setLoadingSpinner(true)
  // }, [filterQ, narrayList, villagers])

  const [currentPage, setCurrentPage] = useState('villagers')

  const [songList, setSongList] = useState([])

  useEffect(() => {
    if(otherCriteria === false )
    getVillagers()
      .then(villagerData => setTheDisplayedList(villagerData))
    // getVillagers()
    //   .then(alphvillagerData => setAlphVillagersList(alphvillagerData))
    // getSongs()
    //   .then(songData => setSongList(songData))
    // console.log(songList, "här e songdata ny")

  }, [])

  const [theDisplayedList, setTheDisplayedList] = useState([])
  //Query from categories
  const [query, setQuery] = useState('')
  const [otherCriteria, setOtherCriteria] = useState(false)
  const onUpdateQuery = (q, data) => {
    setOtherCriteria(true)
    setQuery(q)
    setCurrentPage(q)
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

  return (
    <>
      <Navbar />
      <NavWave />
      <section style={{ display: "flex", alignItems: "center" }}>
        <Filtering onUpdatedFilter={onUpdateFilter} />
        <Categories onChosenCat={onUpdateQuery} />
      </section>
      <div className={style.homewrapper}>
        {/* { villagers || filterQ ? 
  loadingSpinner ?
     <Spinner /> :
      displayedVillagers.map(villager => <Villagercard 
        
        villager={villager}> </Villagercard>)
    
 : '' } */}

        {currentPage === 'villagers' ?
          loadingSpinner ?
            <Spinner /> :
            theDisplayedList.map(villager => <Villagercard
              villager={villager}> </Villagercard>)
          : ''
        }

        {currentPage === 'songs' ?
          loadingSpinner ?
            <Spinner /> :
            theDisplayedList.map(song => <Songcard
              song={song}> </Songcard>)
          : ''
        }

      </div>
    </>

  )
}

export default Home 