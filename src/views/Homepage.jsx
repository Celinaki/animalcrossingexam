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




  const [filterQuery, setFilterQuery] = useState('')
  const handleFiltering = (f) => {
    setFilterQuery(f)
    console.log(filterQuery, "detta e filter query")
    if (f === 'alph') {
      return alphVillagersList
    }
    else if (f === 'gender') {

    }
    else return
  }

  const [villagerPage, setVillagerPage] = useState(false)
  const [displayedVillagers, setDisplayedVillagers] = useState([])
  const { filterQ } = useParams()
  const { villagers } = useParams()
  //const {songs} = useParams()

  useEffect(() => {
    console.log(villagers, "villagers params är false?")
    if (villagers) {
      setVillagerPage(true)
      setTimeout(() => {
        setLoadingSpinner(false)
      }, 1300)
      setLoadingSpinner(true)

    }
    if (filterQ === 'alph') {
      console.log(villagerList, "här är villagerslist")
      const sortedArray = alphVillagersList.sort((a, b) => {
        if (a.name["name-USen"] < b.name["name-USen"]) {
          return -1;
        }
        if (a.name["name-USen"] > b.name["name-USen"]) {
          return 1;
        }
        return 0;
      });
      setDisplayedVillagers(sortedArray)
      setTimeout(() => {
        setLoadingSpinner(false)
      }, 1300)
      setLoadingSpinner(true)
    }

    else if (filterQ === 'Female' || filterQ === 'Male') {
      setDisplayedVillagers(narrayList.filter(villager => villager.gender === filterQ))
      setTimeout(() => {
        setLoadingSpinner(false)
      }, 1300)
      setLoadingSpinner(true)
    }
    else
      setDisplayedVillagers(narrayList)
    setTimeout(() => {
      setLoadingSpinner(false)
    }, 1300)
    setLoadingSpinner(true)
  }, [filterQ, narrayList, villagers])

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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <defs>
          <linearGradient id="myGradient" gradientTransform="rotate(90)">
            <stop offset="0%" stop-color="#0CADE0" />
            <stop offset="100%" stop-color="#FFF3E8" />
          </linearGradient>
        </defs>
        <path fill="url(#myGradient)" fill-opacity="1" d="M0,256L24,240C48,224,96,192,144,186.7C192,181,240,203,288,218.7C336,235,384,245,432,224C480,203,528,149,576,149.3C624,149,672,203,720,197.3C768,192,816,128,864,122.7C912,117,960,171,1008,208C1056,245,1104,267,1152,261.3C1200,256,1248,224,1296,213.3C1344,203,1392,213,1416,218.7L1440,224L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"></path>
      </svg>
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