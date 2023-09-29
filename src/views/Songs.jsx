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
import SearchBar from "../components/Searchbar";
import ReactPaginate from "react-paginate";
import globalStyle from '../App.css'
import Footer from "../components/Footer";
import Fab from "../components/fab";
import singleSong from "../assets/mjk_China.mp3"
import singleCover from "../assets/mjk_China.png"

const Songs = () => {

  const [loadingSpinner, setLoadingSpinner] = useState(false)
  const [theDisplayedList, setTheDisplayedList] = useState([])

  const [currentItems, setCurrentItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 16

  const [search, setSearch] = useState('')
  const [searchArray, setSearchArray] = useState([])

  const theSong= [
     {
      "id": 14,
      "file-name": "mjk_China",
      "name": {
        "name-USen": "Imperial K.K.",
      },
      "buy-price": 3200,
      "sell-price": 800,
      "isOrderable": true,
      "music_uri": singleSong,
      "image_uri":singleCover
    }
  ]

  // useEffect(() => {
  //   getSongs()
  //     .then((songData) => {
  //       setTheDisplayedList(songData)
  //       console.log(theDisplayedList)
  //     })
  //   setTimeout(() => {
  //     setLoadingSpinner(false)
  //   }, 1300)
  //   setLoadingSpinner(true)
  // }, [])

  // useEffect(() => {
  //   const filteredList = theDisplayedList.filter(item =>
  //     item.name["name-USen"].toLowerCase().includes(search.toLowerCase())
  //   );
  //   setSearchArray(search !== '' ? filteredList : []);
  //   setItemOffset(0);
  // }, [search, theDisplayedList]);

  
  useEffect(() => {
        setTheDisplayedList(theSong)
        console.log(theDisplayedList)
    setTimeout(() => {
      setLoadingSpinner(false)
    }, 1300)
    setLoadingSpinner(true)
  }, [])

  useEffect(() => {
    const filteredList = theDisplayedList.filter(item =>
      item.name["name-USen"].toLowerCase().includes(search.toLowerCase())
    );
    setSearchArray(search !== '' ? filteredList : []);
    setItemOffset(0);
  }, [search, theDisplayedList]);

  const searchOnQuery = (e) => {
    console.log(e)
    setSearch(e)
  }


  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(search !== '' ? searchArray.slice(itemOffset, endOffset) : theDisplayedList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil((search !== '' ? searchArray.length : theDisplayedList.length) / itemsPerPage));
  }, [itemOffset, itemsPerPage, search, searchArray, theDisplayedList]);


  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % theDisplayedList.length;
    setItemOffset(newOffset)
    window.scrollTo({
      top: 300,
      behavior: 'smooth'
    });
  }

  return (
    <>
      <Navbar />
      <NavWave />
      <section style={{ display: "flex", alignItems: "center" }}>
        <Categories
         />
      </section> 
       <SearchBar searchOnQuery={searchOnQuery} />
       {search !== '' ? (
        <>
          <p style={{textAlign:"center", fontFamily:'Poppins', fontSize:"0.9em"}}>
            Search result for <b>{search}</b>
          </p>
        </>
      ) : '' }
      <div className={style.homewrapper}>

        {loadingSpinner ? (
          <Spinner> </Spinner>
        ) : search !== '' ? (
          searchArray.length > 0 ? (
            searchArray.map(song => <Songcard  key={song.id} song={song} />)
          ) : (
            <p>No results found for "{search}"</p>
          )
        ) : (
          currentItems.map(song => <Songcard  key={song.id} song={song} />)
        )}
        <Fab/>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName=""
        nextLinkClassName=""
        activeLinkClassName="page-active"

      />
      <Footer/>
    </>

  )
}

export default Songs 