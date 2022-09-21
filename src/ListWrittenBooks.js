import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { authAxios } from './utils/axiosConnect';
import { domainAPI } from './utils/mongoDBConnect';
import { isUserLoggedIn } from './utils/validateUserInfo';
import { activeWrite } from './utils/w3utils';

function ListWrittenBooks() {
    const [userBooks, setUserBooks] = useState([]);
    let useEffectCalled = false;

    async function loadList() {
        setUserBooks([]);
        let books = await authAxios.get(domainAPI + "user/getAllBooks", { crossdomain: true })
            .then((result) => {
                return result.data;
            })
            .catch((error) => {
                alert("Something went wrong!" + error);
                console.log(error);
            });
        for (let i = 0; i < books.length; i++) {
            axios.get(domainAPI + "book/" + books[i], { crossdomain: true })
                .then((response) => {
                    if (response.data) {
                        setUserBooks(userBooks => [...userBooks, response.data]);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    console.log("Error: cannot load books at this time.");
                });
        }
    }

    useEffect(() => {
        if(!useEffectCalled) {
            activeWrite();
            isUserLoggedIn();
            loadList();
        }
        useEffectCalled = true;
    }, []);

    return (
        <>
            <div className="w3-margin">
                <div className="w3-bar w3-margin">
                    <a className="w3-bar-item w3-hover-black w3-border w3-round-small removeTextUnderscore w3-margin-right setBackgroundWhite" href="/create-book">Start writing a new book!</a>
                </div>
                <div className="w3-row-padding">
                    {
                        userBooks.map((book, index) => {
                            return (
                                <div className="w3-third w3-container w3-margin-bottom" key={index}>
                                  <div className="w3-container w3-white w3-padding">
                                        <p>Book Title: {book.title}</p>
                                        <p>Genre:  {book.genre}</p>
                                        <p>Wordcount:  {book.wordcount}</p>
                                        <p>Views:  {book.views}</p>
                                        <div className="w3-bar">
                                            <a className="w3-bar-item w3-hover-black w3-border w3-round-small removeTextUnderscore w3-margin-right" href={"/write/" + book._id + "/chapter/" + (book.chapters.length - 1)}>Keep writing...</a>
                                            <a className="w3-bar-item w3-hover-black w3-border w3-round-small removeTextUnderscore" href={"/edit/" + book._id}>Edit book data</a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default ListWrittenBooks;
