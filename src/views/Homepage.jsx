import {useState, useEffect, React} from "react";
import Navbar from '../components/Navbar'
import style from '../styling/Homepage.module.scss'
import Villagercard from "../components/Villagercard";
import { getVillagers } from "../api/villagers";
import Categories from "../components/Categories";
import Filtering from "../modals/Filtering";

const Home = () => {
//Todos: Pagination, filtering

//Array lists
const [alphVillagersList, setAlphVillagersList ] = useState([])
const [genVillagersList, setGenVillagersList] = useState([])
const [arrayList, setArrayList] = useState([])
const [narrayList, setnArrayList] = useState([])
const villagerList = arrayList;

//Function for sorting by abc
const sortedArray = villagerList.sort((a, b) => {
    if (a.name["name-USen"] < b.name["name-USen"]) {
      return -1;
    }
    if (a.name["name-USen"] > b.name["name-USen"]) {
      return 1;
    }
    return 0;
  });
//Function for sorting by abc

//Function for sorting by gender
const sortedByGender = ()=>{
setGenVillagersList = narrayList.filter(villager=> villager.gender === filterQuery)
console.log(genVillagersList)
}
//Function for sorting by gender



//Array lists

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


useEffect(()=>{
    getVillagers()
    .then(villagerData => setnArrayList(villagerData))
    console.log(sortedArray,"SORTERAD")
    getVillagers()
    .then(alphvillagerData => setAlphVillagersList(alphvillagerData))
    console.log(sortedArray,"SORTERAD")

},[])

    return(
        <>
        <Navbar/>
        <section style={{display:"flex", alignItems:"center"}}>
        <Filtering filterQuery={handleFiltering}/>
        <Categories onChosenQuery={onUpdateQuery}/>
        </section>
        <div className={style.homewrapper}>
            {narrayList.map(villager => 
            <Villagercard 
            villager={villager}> </Villagercard> 
            )}
        </div>
        </>
    
    )
}

export default Home 