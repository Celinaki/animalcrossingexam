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

const Home = () => {
  //Todos: Pagination, filtering
  const [searchParams, setSearchParams] = useSearchParams();

  //Array lists

  const [arrayList, setArrayList] = useState([])
  //Array lists

  const [loadingSpinner, setLoadingSpinner] = useState(false)
  const { filterQ } = useParams()



  const [theDisplayedList, setTheDisplayedList] = useState([])

  useEffect(() => {
    if (otherCriteria === false)
      getBugs()
        .then(bugsData => setTheDisplayedList(bugsData))
console.log(theDisplayedList, "bugsdata är här")


  }, [theDisplayedList])





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
        currentItems.filter(item =>
          item.name["name-USen"].toLowerCase().includes(search.toLowerCase()))
      )
    }
  }, [search, theDisplayedList])

  const searchOnQuery = (e)=>{
    console.log(e)
    setSearch(e)
  }


  const [currentItems, setCurrentItems] = useState([])
  const [pageCount, setPageCount ] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 16

  useEffect(()=>{

    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(theDisplayedList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(theDisplayedList.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, theDisplayedList]);

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
        <Categories onChosenCat={onUpdateQuery}/>
      </section>
      <SearchBar searchOnQuery={searchOnQuery}/>
      <span className={style.sortingholder}>
        <SortBy onUpdatedFilter={onUpdateFilter} fromPage={'bugPage'}/>
      </span>
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




        {/* {loadingSpinner ? (
          <Spinner> </Spinner>
        ) : search !== '' ? (
          searchArray.length > 0 ? (
            searchArray.map(bug => <BugCard bug={bug} />)
          ) : (
            <p>No results found for "{search}"</p>
          )
        ) : (
          theDisplayedList.map(bug => <BugCard bug={bug} />)
        )} */}
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