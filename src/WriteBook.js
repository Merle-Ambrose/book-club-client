import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { domainAPI, domainClient } from "./utils/mongoDBConnect";
import { authAxios } from "./utils/axiosConnect";
import { isUserLoggedIn } from "./utils/validateUserInfo";
import axios from "axios";
import { activeWrite } from "./utils/w3utils";

function WriteBook() {
  const { bookId, chapterId } = useParams();
  const [leftChapterValid, setLeftChapterValid] = useState(false);
  const [rightChapterValid, setRightChapterValid] = useState(false);
  const [currentChapterValid, setCurrentChapterValid] = useState(true);

  // Button that saves the user's work
  function saveChapter() {
    isUserLoggedIn();
    authAxios.put(domainAPI + "book/chapter/update", {
      title: document.getElementById('title').value,
      authorNote: document.getElementById('authorNote').value,
      textContents: document.getElementById('textContents').value,
      bookId: bookId,
      chapterId: chapterId
    }, { crossdomain: true })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    activeWrite();
    // Check the url and make sure it is in the right format
    axios.get(domainAPI + "book/" + bookId + "/chapter/" + chapterId + "/false", { crossdomain: true })
      .then((response) => {
        if (!response.data.chapter) {
          setLeftChapterValid(false);
          setRightChapterValid(false);
          setCurrentChapterValid(false);
          document.getElementById("errorHeader").style.display = "block";
          console.log("No book with that id/url found.");
        }
        else {
          document.getElementById('title').value = response.data.chapter.title;
          document.getElementById('authorNote').value = response.data.chapter.authorNote;
          document.getElementById('textContents').value = response.data.chapter.textContents;
          setLeftChapterValid(response.data.leftChapterValid);
          setRightChapterValid(response.data.rightChapterValid);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("Internal server error fetching the data.");
        document.getElementById('textContents').value = "Error fetching book data. This book/chapter does not exist.";
      });
  }, [bookId, chapterId, leftChapterValid, rightChapterValid, currentChapterValid]);


  function addChapter() {
    isUserLoggedIn();
    authAxios.post(domainAPI + "book/chapter/createEmpty", {
      bookId: bookId
    }, { crossdomain: true })
      .then((response) => {
        alert("Created a new chapter! Redirecting to it now...");
        if (!currentChapterValid) {
          window.location.assign(domainClient + "write/" + bookId + "/chapter/0/");
        }
        else {
          window.location.assign(domainClient + "write/" + bookId + "/chapter/" + (parseInt(chapterId) + 1) + "/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }


  // Button that deletes the current chapter
  function deleteChapter() {
    isUserLoggedIn();
    authAxios.post(domainAPI + "book/chapter/delete", {
      bookId: bookId,
      chapterIndex: chapterId
    }, { crossdomain: true })
      .then((response) => {
        if (currentChapterValid) {
          alert("Chapter deleted!");
        }
        if (!rightChapterValid && leftChapterValid) {
          window.location.assign(domainClient + "write/" + bookId + "/chapter/" + (parseInt(chapterId) - 1) + "/");
        }
        else {
          window.location.reload();
        }
      })
      .catch((error) => {
        alert("Chapter cannot be deleted at this time.");
        console.log(error);
      });
  }

  return (
    <>
      <div className="w3-margin">
        <h1 style={{ display: 'none' }} id="errorHeader">Chapter isn't accessible.</h1>
        <form>
          <h1><input type="text" id="title" name="title" className="chapterTitle" placeholder="Chapter Title"></input></h1>
          <h4><input type="text" id="authorNote" name="authorNote" placeholder="Author's Note"></input></h4>
          <hr></hr>
          <textarea id="textContents" name="textContents" placeholder="Text for chapter goes here..."></textarea><br /><br />
        </form>
        <div className="w3-bar">
          <button className="w3-btn w3-white w3-border w3-border-black w3-round w3-margin-top" type="button" onClick={saveChapter}>Save work</button><br /><br />
          {!leftChapterValid || <><a className="w3-bar-item w3-white w3-border w3-border-black w3-round w3-hover-black w3-border w3-round-small removeTextUnderscore w3-margin-right" href={domainClient + "write/" + bookId + "/chapter/" + (parseInt(chapterId) - 1) + "/"}>Previous chapter</a></>}
          {!rightChapterValid || <><a className="w3-bar-item w3-white w3-border w3-border-black w3-round w3-hover-black w3-border w3-round-small removeTextUnderscore" href={domainClient + "write/" + bookId + "/chapter/" + (parseInt(chapterId) + 1) + "/"}>Next chapter</a><br /></>}
          {!rightChapterValid && <><br /><br /><button className="w3-btn w3-white w3-border w3-border-black w3-round w3-margin-top" onClick={addChapter}>Add chapter</button></>}
          <br /><button type="button" className="w3-btn w3-red w3-border w3-border-black w3-round w3-margin-top" onClick={deleteChapter}>Delete Chapter</button><br /><br />
          <a className="w3-bar-item w3-black w3-border w3-border-black w3-round w3-hover-black w3-border w3-round-small removeTextUnderscore" href={"/edit/" + bookId}>Edit book data</a>
        </div>
      </div>
    </>
  );
}

export default WriteBook;
