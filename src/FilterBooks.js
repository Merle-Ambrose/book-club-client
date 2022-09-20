import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { domainAPI } from './utils/mongoDBConnect';
import { activeRead } from './utils/w3utils';

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
    activeRead();
    loadList();
  }, [currPage, totalNumOfPages]);

  return (
    <>
      {/* Filtering books */}
      <div className="w3-card w3-margin">
        <div className="w3-container w3-padding">
          <h4>Filter Books</h4>
        </div>
        <ul className="w3-ul w3-hoverable w3-white">
          <li className="w3-padding-16">
            <span className="w3-large">Books Per Page</span><br />
            <select id="booksPerPage" name="booksPerPage">
              <option value="10">10</option>
              <option value="10">20</option>
              <option value="30">30</option>
            </select>
          </li>
          <li className="w3-padding-16">
            <span className="w3-large">Genre</span><br />
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
            </select>
          </li>
          <li className="w3-padding-16">
            <span className="w3-large">Language</span><br />
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
            </select>
          </li>
          <li className="w3-padding-16 w3-hide-medium w3-hide-small">
            <span className="w3-large">Views</span><br />
            <select id="views" name="views">
              <option value="">N/A</option>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </li>
          <li className="w3-padding-16 w3-hide-medium w3-hide-small">
            <span className="w3-large">Word Count</span><br />
            <select id="wordcount" name="wordcount">
              <option value="">N/A</option>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </li>
          <li className="w3-padding-16 w3-hide-medium w3-hide-small">
            <span><button onClick={(e) => submitQuery(e)}>Filter</button></span>
          </li>
        </ul>
      </div>

      {/* Display Grid */}
      <div className="w3-row-padding">
        {listBooksOnPage.map((book, index) => {
          return (
            <div className="w3-third w3-container w3-margin-bottom" key={index}>
              <div className="w3-container w3-white">
                <div>
                  <p className="bookTitle"><b>Title: <a className="bookLink" href={"/book/" + book._id + "/chapter/0"}>{book.title}</a></b></p>
                  <p><b>Summary:</b></p>
                  <p>{book.summary && book.summary.trim() ? book.summary : "N/A"}</p>
                  <hr />
                  <p><b>Genre:</b> {book.genre}</p>
                  <p><b>Trigger Warnings:</b> {book.tws.join(", ")}</p>
                  <p><b>Fandoms:</b> {book.fandoms.join(", ")}</p>
                  <p><b>Characters:</b> {book.characters.join(", ")}</p>
                  <p><b>Tags:</b> {book.tags.join(", ")}</p>
                  <p><b>Language:</b> {book.language}</p>
                  <p><b>Wordcount:</b> {book.wordcount}</p>
                  <p><b>Views:</b> {book.views}</p>
                  <p><b>Chapters:</b> {book.chapters.length}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w3-center w3-padding-32">
        <div className="w3-bar">
          <button className="w3-bar-item w3-button-black w3-hover-w3 w3-border w3-round-small" onClick={firstPage}>««</button>
          <button className="w3-bar-item w3-button w3-hover-w3 w3-border w3-round-small" onClick={prevPage}>Prev</button>
          <button className="w3-bar-item w3-button w3-hover-w3 w3-border w3-round-small" onClick={nextPage}>Next</button>
          <button className="w3-bar-item w3-button-black w3-hover-w3 w3-border w3-round-small" onClick={lastPage}>»»</button>
        </div>
      </div>
      <div className="w3-center w3-padding-32"></div>
    </>
  );
}

export default FilterBooks;
