import { useState, useEffect, React } from "react";
import Navbar from '../components/Navbar'
import style from '../styling/Homepage.module.scss'
import Villagercard from "../components/Villagercard";
import { getVillagers } from "../api/villagers";
import Categories from "../components/Categories";
import Spinner from '../components/Spinner.jsx';
import NavWave from "../components/NavWave";
import SearchBar from "../components/Searchbar";
import ReactPaginate from "react-paginate";
import globalStyle from '../App.css'
import { forwardRef } from "react";
import SortBy from "../components/SortBy";
import GenderFilter from "../components/Genderfilter";
import Footer from "../components/Footer";


const Home = () => {

  const [arrayList, setArrayList] = useState([])
  const villagerList = arrayList;
  const [loadingSpinner, setLoadingSpinner] = useState(false)


  useEffect(() => {
    if (otherCriteria === false)
      getVillagers()
        .then(villagerData => setTheDisplayedList(villagerData))

  }, [])
  //Needed


  const [theDisplayedList, setTheDisplayedList] = useState([])

  //Query from categories

  const [otherCriteria, setOtherCriteria] = useState(false)

  const onUpdateQuery = (q, data) => {
    // setOtherCriteria(true)
    // setTheDisplayedList(data)
    // setTimeout(() => {
    //   setLoadingSpinner(false)
    // }, 1300)
    // setLoadingSpinner(true)
  }
  //Query from categories

  //Query from filter
  const onUpdateFilter = (data) => {

    //setOtherCriteria(true)
    // console.log(data, "här är data från home")
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

  const searchOnQuery = (e) => {
    console.log(e)
    setSearch(e)
  }


  const [currentItems, setCurrentItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 16

  useEffect(() => {

    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(theDisplayedList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(theDisplayedList.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, theDisplayedList]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % theDisplayedList.length;
    setItemOffset(newOffset)
  }
  return (
    <>
      <Navbar />
      <NavWave />
      <section style={{ display: "flex", alignItems: "center" }}>
        <Categories onChosenCat={onUpdateQuery} />
      </section>
      <SearchBar searchOnQuery={searchOnQuery} />
      <span className={style.sortingholderhome}>
        <GenderFilter onUpdatedFilter={onUpdateFilter} />

        <SortBy onUpdatedFilter={onUpdateFilter} fromPage={'villagerPage'} />
      </span>

      <div className={style.homewrapper}>
        {loadingSpinner ? (
          <Spinner> </Spinner>
        ) : search !== '' ? (
          searchArray.length > 0 ? (
            searchArray.map(villager => <Villagercard villager={villager} />)
          ) : (
            <p>No results found for "{search}"</p>
          )
        ) : (
          currentItems.map(villager => <Villagercard villager={villager} />)
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        breakAriaLabels={{ forward: 'Jump forward 3 steps', backward: 'Jump backward 3 steps' }}
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName=""
        nextLinkClassName=""
        activeLinkClassName="page-active"
      />
<Footer>
  
</Footer>
    </>

  )
}

export default Home 