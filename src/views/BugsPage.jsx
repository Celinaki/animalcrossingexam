import { useState, useEffect, React } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from '../components/Navbar'
import style from '../styling/Homepage.module.scss'
import { getBugs } from "../api/bugs";
import Categories from "../components/Categories";
import Filtering from "../modals/Filtering";
import { useParams } from "react-router-dom";
import Spinner from '../components/Spinner.jsx';
import NavWave from "../components/NavWave";
import SearchBar from "../components/Searchbar";
import BugCard from "../components/Bugcard";
import ReactPaginate from "react-paginate";
import globalStyle from '../App.css'
import SortBy from "../components/SortBy";
import Footer from "../components/Footer";
import Fab from "../components/fab";

const Home = () => {
  const [arrayList, setArrayList] = useState([])

  const [loadingSpinner, setLoadingSpinner] = useState(false)
  const [theDisplayedList, setTheDisplayedList] = useState([])

  const [currentItems, setCurrentItems] = useState([])
  const [pageCount, setPageCount ] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 16

  const [search, setSearch] = useState('')
  const [searchArray, setSearchArray] = useState([])

  useEffect(() => {
    if (otherCriteria === false)
      getBugs()
        .then(bugsData => setTheDisplayedList(bugsData))
  }, [theDisplayedList])


  //Query from categories
  const [query, setQuery] = useState('')
  const [otherCriteria, setOtherCriteria] = useState(false)

  // const onUpdateQuery = (q, data) => {
  //   setTheDisplayedList(data)

  // }
  //Query from categories

  //Query from filter
  const onUpdateFilter = (data) => {
    setOtherCriteria(true)
    setTheDisplayedList(data)

  }
  //Query from filter

  //ORIGINAL
  // useEffect(() => {
  //   const filteredList = theDisplayedList.filter(item =>
  //     item.name["name-USen"].toLowerCase().includes(search.toLowerCase())
  //   );

  //   setSearchArray(search !== '' ? filteredList : []);
  //   setItemOffset(0);
  // }, [search, theDisplayedList]);
  //ORIGINAL

    useEffect(() => {
    const filteredList = theDisplayedList.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    setSearchArray(search !== '' ? filteredList : []);
    setItemOffset(0);
  }, [search, theDisplayedList]);

  const searchOnQuery = (e)=>{
    console.log(e)
    setSearch(e)
  }

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(search !== '' ? searchArray.slice(itemOffset, endOffset) : theDisplayedList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil((search !== '' ? searchArray.length : theDisplayedList.length) / itemsPerPage));
  }, [itemOffset, itemsPerPage, search, searchArray, theDisplayedList]);

  const handlePageClick = (event) =>{
    const newOffset = (event.selected * itemsPerPage) %  theDisplayedList.length;
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
        //onChosenCat={onUpdateQuery}
        />
      </section>
      <SearchBar searchOnQuery={searchOnQuery}/>
      <span className={style.sortingholder}>
        <SortBy onUpdatedFilter={onUpdateFilter} fromPage={'bugPage'}/>
      </span>
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
            searchArray.map(bug => <BugCard bug={bug} />)
          ) : (
            <p>No results found for "{search}"</p>
          )
        ) : (
          currentItems.map(bug => <BugCard bug={bug} />)
        )} 
        <Fab/>
      </div>
      <ReactPaginate
  breakLabel="..."
  nextLabel="Next"
  onPageChange={handlePageClick}
  pageRangeDisplayed={3}
  pageCount={pageCount}
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

export default Home 