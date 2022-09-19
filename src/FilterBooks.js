import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { domainAPI } from './utils/mongoDBConnect';

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
    const result = await axios.get(domainAPI + "bookFilter/" + genre + "/" + language + "/" + views + "/" + wordcount + "/" +  numberPerPage + "/" + currPage, {crossdomain: true})
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
    if(currPage > 0) setCurrPage(currPage-1);
    window.scrollTo(0, 0);
  }
  function nextPage() {
    if(currPage < totalNumOfPages-1) setCurrPage(currPage+1);
    window.scrollTo(0, 0);
  }
  function lastPage() {
    setCurrPage(totalNumOfPages-1);
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
      <h1>Filter List</h1>
      <label htmlFor="booksPerPage">Books Per Page </label><br/>
      <select id="booksPerPage" name="booksPerPage">
          <option value="10">10</option>
          <option value="10">20</option>
          <option value="30">30</option>
      </select><br/>
      <label htmlFor="genre">Genre</label><br/>
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
      </select><br/>
      <label htmlFor="language">Language </label><br/>
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
      </select><br/>
      <label htmlFor="views">Views </label><br/>
      <select id="views" name="views">
          <option value="">N/A</option>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
      </select><br/>
      <label htmlFor="wordcount">Word Count </label><br/>
      <select id="wordcount" name="wordcount">
          <option value="">N/A</option>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
      </select><br/>
      <br/><button onClick={(e) => submitQuery(e)}>Filter</button><br/><br/>

      {listBooksOnPage.map((book, index) => {
        return (<div key={index}>
          <hr />
          <h1>Title: <a href={"/book/" + book._id + "/chapter/0"}>{book.title}</a></h1>
          <p>Summary: {book.summary}</p>
          <p>Genre: {book.genre}</p>
          <p>Trigger Warnings: {book.tws.join(", ")}</p>
          <p>Fandoms: {book.fandoms.join(", ")}</p>
          <p>Characters: {book.characters.join(", ")}</p>
          <p>Tags: {book.tags.join(", ")}</p>
          <p>Language: {book.language}</p>
          <p>Wordcount: {book.wordcount}</p>
          <p>Views: {book.views}</p>
          <p>Chapters: {book.characters.length}</p>
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
