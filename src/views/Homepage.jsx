import React, { useState, useEffect } from "react";
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
import SortBy from "../components/SortBy";
import GenderFilter from "../components/Genderfilter";
import Footer from "../components/Footer";


const Home = () => {
  const [arrayList, setArrayList] = useState([]);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [theDisplayedList, setTheDisplayedList] = useState([]);
  const [search, setSearch] = useState('');
  const [searchArray, setSearchArray] = useState([]);
  const [gendersQuery, setGenderQuery] = useState('');
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 16;

  useEffect(() => {
    if (search !== '') {
      setSearchArray(theDisplayedList.filter(item =>
        item.name["name-USen"].toLowerCase().includes(search.toLowerCase())
      ));
    } else {
      setSearchArray([]);
    }
    setItemOffset(0);
  }, [search, theDisplayedList]);

  useEffect(() => {
    setLoadingSpinner(true);
    getVillagers()
      .then(villagerData => {
        setArrayList(villagerData);
        setTheDisplayedList(villagerData);
        setLoadingSpinner(false);
      });
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(search !== '' ? searchArray.slice(itemOffset, endOffset) : theDisplayedList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil((search !== '' ? searchArray.length : theDisplayedList.length) / itemsPerPage));
  }, [itemOffset, itemsPerPage, search, searchArray, theDisplayedList]);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
    window.scrollTo({
      top: 300,
      behavior: 'smooth' 
    });
  };

  const onUpdateQuery = (q, data) => {
    setTheDisplayedList(data);
    setSearch('');
  };

  const onUpdateFilter = (data) => {
    setTheDisplayedList(data);
    setSearch('');
  };

  const searchOnQuery = (e) => {
    setSearch(e);
  };

  const assignedGenderQuery = (q) => {
    setGenderQuery(q);
  };

  useEffect(() => {
    assignedGenderQuery(gendersQuery);
  }, [gendersQuery]);

  return (
    <>
      <Navbar />
      <NavWave />
      <section style={{ display: "flex", alignItems: "center" }}>
        <Categories onChosenCat={onUpdateQuery} />
      </section>
      <SearchBar searchOnQuery={searchOnQuery} />
      <span className={style.sortingholderhome}>
        <GenderFilter onUpdatedFilter={onUpdateFilter} genderQuery={assignedGenderQuery} />
        <SortBy 
        onUpdatedFilter={onUpdateFilter} 
        fromPage={'villagerPage'}
        gender={gendersQuery} />
      </span>

      <div className={style.homewrapper}>
        {loadingSpinner ? (
          <Spinner> </Spinner>
        ) : (
          <>
            {search !== '' && currentItems.length === 0 && (
              <p>No results found for "{search}"</p>
            )}
            {currentItems.map(villager => (
              <Villagercard key={villager.id} villager={villager} />
            ))}
          </>
        )}
      </div>

      <ReactPaginate
        breakLabel=""
        breakAriaLabels={{ 
        forward: 'Jump forward 3 steps',
        backward: 'Jump backward 3 steps' 
      }}
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
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

      <Footer />
    </>
  );
};

export default Home;
