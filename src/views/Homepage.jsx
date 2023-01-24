import {useState, useEffect, React} from "react";
import Navbar from '../components/Navbar'
import style from '../styling/Homepage.module.scss'
import Villagercard from "../components/Villagercard";
import { getVillagers } from "../api/villagers";
import Categories from "../components/Categories";
import Filtering from "../modals/Filtering";
import { useParams } from "react-router-dom";
import Spinner from '../components/Spinner.jsx'

const Home = () => {
//Todos: Pagination, filtering

//Array lists
const [alphVillagersList, setAlphVillagersList ] = useState([])
const [genVillagersList, setGenVillagersList] = useState([])
const [arrayList, setArrayList] = useState([])
const [narrayList, setnArrayList] = useState([])
const villagerList = arrayList;
//Array lists

const [loadingSpinner, setLoadingSpinner] = useState(false)

//Query from categories
const [query, setQuery] = useState('')
const onUpdateQuery = (q) =>{
setQuery(q)
console.log(query, "här e query")
}
//Query from categories


const [filterQuery, setFilterQuery] = useState('')
const handleFiltering= (f) => {
setFilterQuery(f)
console.log(filterQuery, "detta e filter query")
  if(f === 'alph'){
 return alphVillagersList
  }
  else if (f === 'gender'){

  }
  else return 

}
const [villagerPage, setVillagerPage]= useState(false)
const [displayedVillagers, setDisplayedVillagers] = useState([])
const {filterQ} = useParams()
const {villagers} = useParams()

useEffect(()=>{
  console.log(villagers, "villagers params är false?")
  if(villagers){
    setVillagerPage(true)
    setTimeout(()=>{
      setLoadingSpinner(false)
  }, 2300)
setLoadingSpinner(true)

  }
  if(filterQ === 'alph'){
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
     setTimeout(()=>{
      setLoadingSpinner(false)
  }, 2300)
setLoadingSpinner(true)
  }

else if(filterQ ==='Female' || filterQ === 'Male'){
setDisplayedVillagers(narrayList.filter(villager=> villager.gender === filterQ))
setTimeout(()=>{
  setLoadingSpinner(false)
}, 2300)
setLoadingSpinner(true)
}
  else 
   setDisplayedVillagers(narrayList)
   setTimeout(()=>{
    setLoadingSpinner(false)
}, 2300)
setLoadingSpinner(true)
},[filterQ, narrayList, villagers])


useEffect(()=>{
    getVillagers()
    .then(villagerData => setnArrayList(villagerData))
    getVillagers()
    .then(alphvillagerData => setAlphVillagersList(alphvillagerData))
},[])

    return(
        <>
        <Navbar/>
        <section style={{display:"flex", alignItems:"center"}}>
        <Filtering filterQuery={handleFiltering}/>
        <Categories onChosenQuery={onUpdateQuery}/>
        </section>
        <div className={style.homewrapper}>
  { villagers || filterQ ? 
  loadingSpinner ?
     <Spinner /> :
      displayedVillagers.map(villager => <Villagercard 
        
        villager={villager}> </Villagercard>)
    
 : '' }



        </div>
        </>
    
    )
}

export default Home 