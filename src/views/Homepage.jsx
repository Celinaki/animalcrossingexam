import {useState, useEffect, React} from "react";
import Navbar from '../components/Navbar'
import style from '../styling/Homepage.module.scss'
import Villagercard from "../components/Villagercard";
import { getVillagers } from "../api/villagers";

const Home = () => {
//Todos: Pagination, filtering

const [arrayList, setArrayList] = useState([])

const sortedArray = arrayList.sort((a, b) => {
    if (a.name["name-USen"] < b.name["name-USen"]) {
      return -1;
    }
    if (a.name["name-USen"] > b.name["name-USen"]) {
      return 1;
    }
    return 0;
  });



useEffect(()=>{
    getVillagers()
    .then(villagerData => setArrayList(villagerData))
    console.log(sortedArray,"SORTERAD")
},[])

    return(
        <>
        <Navbar/>
        <div className={style.homewrapper}>
            {arrayList.map(villager => 
            <Villagercard 
            villager={villager}> </Villagercard> 
            )}
        </div>
        </>
    
    )
}

export default Home 