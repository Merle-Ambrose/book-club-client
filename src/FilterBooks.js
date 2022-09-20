import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { domainAPI } from './utils/mongoDBConnect';
import { w3_close, w3_open } from './utils/w3utils';

function FilterBooks() {
  const [currPage, setCurrPage] = useState(0);
  const [listBooksOnPage, setListBooksOnPage] = useState([]);
  const [totalNumOfPages, setTotalNumOfPages] = useState(0);
  const [numberPerPage, setNumberPerPage] = useState(0);

  // Get the list of books by their filters and update the webpage accordingly
  async function loadList() {
    let genre = document.getElementById("genre").value || ' ';
    let language = document.getElementById("language").value || ' ';
    let views = document.getElementById("views").value || ' ';
    let wordcount = document.getElementById("wordcount").value || ' ';
    setNumberPerPage(parseInt(document.getElementById("booksPerPage").value));

    // Get the total number of books (for computing pages)
    // AND the current page's book list information
    const result = await axios.get(domainAPI + "book/filter/" + genre + "/" + language + "/" + views + "/" + wordcount + "/" + numberPerPage + "/" + currPage, { crossdomain: true })
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
    setListBooksOnPage([...result.books]);
    setTotalNumOfPages(Math.ceil(result.documentCount / numberPerPage));
  }
  function firstPage() {
    setCurrPage(0);
    window.scrollTo(0, 0);
  }
  function prevPage() {
    if (currPage > 0) setCurrPage(currPage - 1);
    window.scrollTo(0, 0);
  }
  function nextPage() {
    if (currPage < totalNumOfPages - 1) setCurrPage(currPage + 1);
    window.scrollTo(0, 0);
  }
  function lastPage() {
    setCurrPage(totalNumOfPages - 1);
    window.scrollTo(0, 0);
  }

  function submitQuery(e) {
    e.preventDefault();
    setCurrPage(0);
    loadList();
  }

  useEffect(() => {
    console.log("Total number of pages: " + totalNumOfPages);
    console.log("Current page: " + currPage);
    loadList();
  }, [currPage, totalNumOfPages]);

  return (
    <>
      {/* Filtering books */}
      <header id="portfolio">
        <div class="w3-container">
          <div class="w3-section w3-padding-16">
            <span class="w3-margin-right">Filter:</span>
            <button class="w3-button w3-black">ALL</button>
            <button class="w3-button w3-white"><i class="fa fa-diamond w3-margin-right"></i>Design</button>
            <button class="w3-button w3-white w3-hide-small"><i class="fa fa-photo w3-margin-right"></i>Photos</button>
            <button class="w3-button w3-white w3-hide-small"><i class="fa fa-map-pin w3-margin-right"></i>Art</button>
          </div>
        </div>
      </header>

      <h1>Filter List</h1>
      <label htmlFor="booksPerPage">Books Per Page </label><br />
      <select id="booksPerPage" name="booksPerPage">
        <option value="10">10</option>
        <option value="10">20</option>
        <option value="30">30</option>
      </select><br />
      <label htmlFor="genre">Genre</label><br />
      <select id="genre" name="genre">
        <option value="">N/A</option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Comedy">Comedy</option>
        <option value="Crime">Crime</option>
        <option value="Mystery">Mystery</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Historical">Historical</option>
        <option value="Horror">Horror</option>
        <option value="Romance">Romance</option>
        <option value="Satire">Satire</option>
        <option value="Science Fiction">Science Fiction</option>
        <option value="Speculative">Speculative</option>
        <option value="Thriller">Thriller</option>
        <option value="Western">Western</option>
      </select><br />
      <label htmlFor="language">Language </label><br />
      <select id="language" name="language">
        <option value="">N/A</option>
        <option value="English">English</option>
        <option value="Mandarin Chinese">Mandarin Chinese</option>
        <option value="Hindi">Hindi</option>
        <option value="Spanish">Spanish</option>
        <option value="French">French</option>
        <option value="Arabic">Arabic</option>
        <option value="Bengali">Bengali</option>
        <option value="Russian">Russian</option>
        <option value="Portugese">Portugese</option>
        <option value="Urdu">Urdu</option>
        <option value="Indonesian">Indonesian</option>
        <option value="German">German</option>
        <option value="Japanese">Japanese</option>
        <option value="Nigerian Pidgin">Nigerian Pidgin</option>
        <option value="Marathi">Marathi</option>
        <option value="Telugu">Telugu</option>
        <option value="Turkish">Turkish</option>
        <option value="Tamil">Tamil</option>
        <option value="Vietnamese">Vietnamese</option>
        <option value="Tagalog">Tagalog</option>
        <option value="Korean">Korean</option>
        <option value="Farsi">Farsi</option>
        <option value="Italian">Italian</option>
        <option value="Thai">Thai</option>
      </select><br />
      <label htmlFor="views">Views </label><br />
      <select id="views" name="views">
        <option value="">N/A</option>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select><br />
      <label htmlFor="wordcount">Word Count </label><br />
      <select id="wordcount" name="wordcount">
        <option value="">N/A</option>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select><br />
      <br /><button onClick={(e) => submitQuery(e)}>Filter</button><br /><br />

      
      {/* Display Grid */}
      <div class="w3-row-padding">
        <div class="w3-third w3-container w3-margin-bottom">
          <div class="w3-container w3-white">
            <p><b>Lorem Ipsum</b></p>
            <p>Praesent tincidunt sed tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.</p>
          </div>
        </div>
        <div class="w3-third w3-container w3-margin-bottom">
          <div class="w3-container w3-white">
            <p><b>Lorem Ipsum</b></p>
            <p>Praesent tincidunt sed tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.</p>
          </div>
        </div>
        <div class="w3-third w3-container">
          <div class="w3-container w3-white">
            <p><b>Lorem Ipsum</b></p>
            <p>Praesent tincidunt sed tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.</p>
          </div>
        </div>
      </div>

      {listBooksOnPage.map((book, index) => {
        return (<div key={index}>
          <hr />
          <h1>Title: <a class="bookLink" href={"/book/" + book._id + "/chapter/0"}>{book.title}</a></h1>
          <p><b>Summary:</b> {book.summary}</p>
          <p><b>Genre:</b> {book.genre}</p>
          <p><b>Trigger Warnings:</b> {book.tws.join(", ")}</p>
          <p><b>Fandoms:</b> {book.fandoms.join(", ")}</p>
          <p><b>Characters:</b> {book.characters.join(", ")}</p>
          <p><b>Tags:</b> {book.tags.join(", ")}</p>
          <p><b>Language:</b> {book.language}</p>
          <p><b>Wordcount:</b> {book.wordcount}</p>
          <p><b>Views:</b> {book.views}</p>
          <p><b>Chapters:</b> {book.characters.length}</p>
          <hr />
        </div>);
      })}
      <button onClick={firstPage}>First page</button>
      <button onClick={prevPage}>Previous page</button>
      <button onClick={nextPage}>Next page</button>
      <button onClick={lastPage}>Last page</button>
    </>
  );
}

export default FilterBooks;
