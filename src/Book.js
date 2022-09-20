import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { domainAPI, domainClient } from "./utils/mongoDBConnect";
import axios from "axios";

function Book() {
  const { bookId, chapterId } = useParams();
  const [ chapterTitle, setChapterTitle ] = useState('Chapter Title');
  const [ authorNote, setAuthorNote ] = useState('Author Note');
  const [ textContents, setTextContents ] = useState('Error, cannot find this url!');
  const [ leftChapterValid, setLeftChapterValid ] = useState(false);
  const [ rightChapterValid, setRightChapterValid ] = useState(false);

  useEffect(() => {
    // Check the url and make sure it is in the right format
    axios.get(domainAPI + "book/" + bookId + "/chapter/" + chapterId + "/true", {crossdomain: true})
      .then((response) => {
        console.log(response.data);
        if(!response.data.chapter) {
            setLeftChapterValid(false);
            setRightChapterValid(false);
            console.log("No book with that id/url found.");
        }
        else {
            console.log(response.data.chapter);
            setChapterTitle(response.data.chapter.title);
            setAuthorNote(response.data.chapter.authorNote);
            setTextContents(response.data.chapter.textContents);
            setLeftChapterValid(response.data.leftChapterValid);
            setRightChapterValid(response.data.rightChapterValid);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("Internal server error fetching the data.");
      });
  }, [bookId, chapterId]);

    return (<>
        <h1>{chapterTitle}</h1>
        <h4>Author's Note: {authorNote}</h4>
        <hr></hr>
        <p>{textContents}</p>
        { !leftChapterValid || <a href={domainClient + "book/" + bookId + "/chapter/" + (parseInt(chapterId)-1) + "/"}><button>Previous chapter</button></a> }
        { !rightChapterValid || <a href={domainClient + "book/" + bookId + "/chapter/" + (parseInt(chapterId)+1) + "/"}><button>Next chapter</button></a> }
    </>);
}

export default Book;
