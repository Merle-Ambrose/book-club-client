import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { authAxios } from './utils/axiosConnect';
import { domainAPI } from './utils/mongoDBConnect';
import { isUserLoggedIn } from './utils/validateUserInfo';
import { activeWrite } from './utils/w3utils';

function EditBook() {
    const { bookId } = useParams();

    function setNoAccessStatus() {
        document.getElementById("title").value = "";
        document.getElementById("summary").value = "";
        document.getElementById("genre").value = "";
        document.getElementById("language").value = "";
        document.getElementById("tws").value = "";
        document.getElementById("fandoms").value = "";
        document.getElementById("characters").value = "";
        document.getElementById("tags").value = "";
        document.getElementById("keepWritingHyperlink").href = "#";
        document.getElementById("errorHeading").style.display = "block";
    }

    function deleteBook() {
        isUserLoggedIn();
        setNoAccessStatus();
        authAxios.post(domainAPI + "book/delete", {
            bookId: bookId
        }, { crossdomain: true })
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function updateBook(e) {
        e.preventDefault();
        isUserLoggedIn();

        // Check if required fields are filled in
        let title = document.getElementById('title').value;
        let warningFlag = false;
        if (!title || title.trim() === "") {
            document.getElementById('titleLabel').style.color = 'red';
            warningFlag = true;
        }
        else {
            document.getElementById('titleLabel').style.color = 'black';
        }

        if (!warningFlag) {
            // Grab all the elements in the form
            let summary = document.getElementById('summary').value;
            let genre = document.getElementById('genre').value;
            let language = document.getElementById('language').value;
            let tws = document.getElementById('tws').value.split(",");
            let fandoms = document.getElementById('fandoms').value.split(",");
            let characters = document.getElementById('characters').value.split(",");
            let tags = document.getElementById('tags').value.split(",");
            if (tws.length === 1 && tws[0] === "") tws = [];
            if (fandoms.length === 1 && fandoms[0] === "") fandoms = [];
            if (characters.length === 1 && characters[0] === "") characters = [];
            if (tags.length === 1 && tags[0] === "") tags = [];

            authAxios.put(domainAPI + "book/update", {
                title: title,
                summary: summary,
                tws: tws,
                genre: genre,
                fandoms: fandoms,
                characters: characters,
                tags: tags,
                language: language,
                bookId: bookId
            }, { crossdomain: true })
                .then((response) => {
                    alert("Book updated!");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    useEffect(() => {
        activeWrite();
        axios.get(domainAPI + "book/" + bookId, { crossdomain: true })
            .then((response) => {
                if (response.data) {
                    document.getElementById("title").value = response.data.title;
                    document.getElementById("summary").value = response.data.summary;
                    document.getElementById("genre").value = response.data.genre;
                    document.getElementById("language").value = response.data.language;
                    document.getElementById("tws").value = response.data.tws.join(",");
                    document.getElementById("fandoms").value = response.data.fandoms.join(",");
                    document.getElementById("characters").value = response.data.characters.join(",");
                    document.getElementById("tags").value = response.data.tags.join(",");
                    document.getElementById("keepWritingHyperlink").href = "/write/" + response.data._id + "/chapter/" + (response.data.chapters.length - 1);
                }
                else {
                    setNoAccessStatus();
                }
            })
            .catch((error) => {
                setNoAccessStatus();
                console.log(error);
            });
    }, [bookId]);

    return (
        <>
            <div className="w3-margin">
                <div className="w3-bar">
                    <a className="w3-bar-item w3-white w3-border w3-border-black w3-round w3-hover-black w3-border w3-round-small removeTextUnderscore" href="/dashboard">Go to the writing dashboard...</a><br /><br /><br />
                </div>
                <form id="bookForm" onSubmit={(e) => { updateBook(e) }}>
                    <h1 id="errorHeading" style={{ display: 'none' }}>This book is not accessible at this time.</h1>
                    <label htmlFor="title" id="titleLabel">Title* </label><br />
                    <input type="text" id="title" name="title"></input><br />
                    <label htmlFor="summary">Summary </label><br />
                    <input type="text" id="summary" name="summary"></input><br />
                    <label htmlFor="tws">Trigger warnings (please separate with commas) </label><br />
                    <input type="text" id="tws" name="tws"></input><br />
                    <label htmlFor="genre">Genre* </label><br />
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
                    </select><br />
                    <label htmlFor="fandoms">Fandoms (please separate with commas) </label><br />
                    <input type="text" id="fandoms" name="fandoms"></input><br />
                    <label htmlFor="characters">Characters (please separate with commas) </label><br />
                    <input type="text" id="characters" name="characters"></input><br />
                    <label htmlFor="tags">Tags (please separate with commas) </label><br />
                    <input type="text" id="tags" name="tags"></input><br />
                    <label htmlFor="language">Language* </label><br />
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
                    </select><br />
                    <button className="w3-btn w3-white w3-border w3-border-black w3-round w3-margin-top" type="submit">Save Updated Information</button><br /><br />
                </form>
                <div className="w3-bar">
                    <br /><a className="w3-bar-item w3-white w3-border w3-border-black w3-round w3-hover-black w3-border w3-round-small removeTextUnderscore" href="" id="keepWritingHyperlink">Continue Writing This Book...</a><br />
                    <br /><button className="w3-btn w3-red w3-border w3-border-black w3-round w3-margin-top" onClick={deleteBook}>Delete Book</button><br />
                </div>
            </div>
        </>
    );
}

export default EditBook;
