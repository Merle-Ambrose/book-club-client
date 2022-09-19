import React from 'react';
import { authAxios } from './utils/axiosConnect';
import { domainAPI } from './utils/mongoDBConnect';

function CreateBook() {
    function createBook(e) {
        e.preventDefault();

        // Check if required fields are filled in
        let title = document.getElementById('title').value;
        let warningFlag = false;
        if(!title || title.trim() === "") {
            document.getElementById('titleLabel').style.color = 'red';
            warningFlag = true;
        }
        else {
            document.getElementById('titleLabel').style.color = 'black';
        }

        if(!warningFlag) {
            // Grab all the elements in the form
            let summary = document.getElementById('summary').value;
            let genre = document.getElementById('genre').value;
            let language = document.getElementById('language').value;
            let tws = document.getElementById('tws').value.split(",");
            let fandoms = document.getElementById('fandoms').value.split(",");
            let characters = document.getElementById('characters').value.split(",");
            let tags = document.getElementById('tags').value.split(",");
            if(tws.length === 1 && tws[0] === "") tws = [];
            if(fandoms.length === 1 && fandoms[0] === "") fandoms = [];
            if(characters.length === 1 && characters[0] === "") characters = [];
            if(tags.length === 1 && tags[0] === "") tags = [];

            authAxios.post(domainAPI + "bookCreate", {
                title: title,
                summary: summary,
                tws: tws,
                genre: genre,
                fandoms: fandoms,
                characters: characters,
                tags: tags,
                language: language
            }, { crossdomain: true })
                .then((response) => {
                    window.location.assign("/write/" + response.data.bookId +"/chapter/0");
                })
                .catch((error) => {
                    alert(error);
                    console.log(error);
                });
        }
    }

  return (
    <form onSubmit={(e) => {createBook(e)}}>
        <label htmlFor="title" id="titleLabel">Title* </label><br/>
        <input type="text" id="title" name="title"></input><br/>
        <label htmlFor="summary">Summary </label><br/>
        <input type="text" id="summary" name="summary"></input><br/>
        <label htmlFor="tws">Trigger warnings (please separate with commas) </label><br/>
        <input type="text" id="tws" name="tws"></input><br/>
        <label htmlFor="genre">Genre* </label><br/>
        <select id="genre" name="genre">
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
        <label htmlFor="fandoms">Fandoms (please separate with commas) </label><br/>
        <input type="text"  id="fandoms" name="fandoms"></input><br/>
        <label htmlFor="characters">Characters (please separate with commas) </label><br/>
        <input type="text" id="characters" name="characters"></input><br/>
        <label htmlFor="tags">Tags (please separate with commas) </label><br/>
        <input type="text" id="tags" name="tags"></input><br/>
        <label htmlFor="language">Language* </label><br/>
        <select id="language" name="language">
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
        <br/><button type="submit">Create Book</button>
    </form>
  );
}

export default CreateBook;
