import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { domainAPI, domainClient } from "./utils/mongoDBConnect";
import { authAxios } from "./utils/axiosConnect";
import { isUserLoggedIn } from "./utils/validateUserInfo";
import axios from "axios";

function WriteBook() {
  const { bookId, chapterId } = useParams();
  const [ leftChapterValid, setLeftChapterValid ] = useState(false);
  const [ rightChapterValid, setRightChapterValid ] = useState(false);
  const [ currentChapterValid, setCurrentChapterValid ] = useState(true);

  // Button that saves the user's work
  function saveChapter() {
    isUserLoggedIn();
    authAxios.put(domainAPI + "book/chapter/update", {
      title: document.getElementById('title').value,
      authorNote: document.getElementById('authorNote').value,
      textContents: document.getElementById('textContents').value,
      bookId: bookId,
      chapterId: chapterId
    }, {crossdomain: true})
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    // Check the url and make sure it is in the right format
    axios.get(domainAPI + "book/" + bookId + "/chapter/" + chapterId + "/false", {crossdomain: true})
      .then((response) => {
        if(!response.data.chapter) {
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
    }, {crossdomain: true})
    .then((response) => {
      alert("Created a new chapter! Redirecting to it now...");
      if(!currentChapterValid) {
        window.location.assign(domainClient + "write/" + bookId + "/chapter/0/");
      }
      else {
        window.location.assign(domainClient + "write/" + bookId + "/chapter/" + (parseInt(chapterId)+1) + "/");
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
    }, {crossdomain: true})
    .then((response) => {
      if(currentChapterValid) {
        alert("Chapter deleted!");
      }
      if(!rightChapterValid && leftChapterValid) {
        window.location.assign(domainClient + "write/" + bookId + "/chapter/" + (parseInt(chapterId)-1) + "/");
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

    return (<>
        <h1 style={{display: 'none'}} id="errorHeader">Chapter isn't accessible.</h1>
        <form>
          <h1>Chapter Title: <input type="text" id="title" name="title"></input></h1>
          <h4>Author's Note: <input type="text" id="authorNote" name="authorNote"></input></h4>
          <hr></hr>
          <textarea id="textContents" name="textContents"></textarea><br/><br/>
        </form>
        <button type="button" onClick={saveChapter}>Save work</button><br/><br/>

        { !leftChapterValid || <><a href={domainClient + "write/" + bookId + "/chapter/" + (parseInt(chapterId)-1) + "/"}><button>Previous chapter</button></a><br/><br/></> }
        { !rightChapterValid || <><a href={domainClient + "write/" + bookId + "/chapter/" + (parseInt(chapterId)+1) + "/"}><button>Next chapter</button></a><br/></> }
        { !rightChapterValid && <button onClick={addChapter}>Add chapter</button>}
        <br/><br/><button type="button" onClick={deleteChapter}>Delete Chapter</button><br/><br/>
        <a href={"/edit/" + bookId}><button>Edit book data</button></a>
    </>);
}

export default WriteBook;
