import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { authAxios } from './utils/axiosConnect';
import { domainAPI } from './utils/mongoDBConnect';

function ListWrittenBooks() {
    const [userBooks, setUserBooks] = useState([]);

    useEffect(() => {
        authAxios.get(domainAPI + "getAllUserBooks", { crossdomain: true })
            .then((result) => {
                let books = result.data;
                for(let i = 0; i < books.length; i++) {
                    axios.get(domainAPI + "book/" + books[i], { crossdomain: true })
                        .then((response) => {
                            if(response.data) {
                                setUserBooks(userBooks => [...userBooks, response.data]);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            console.log("Error: cannot load books at this time.");
                        });
                }
            })
            .catch((error) => {
                alert("Something went wrong!" + error);
                console.log(error);
            });
    }, []);

    return (
        <>
            <a href="/create-book"><button>Write new book</button></a>
            {
            userBooks.map((book, index) => {
                return(
                    <div key={index}>
                        <hr/>
                        <p>Book Title: {book.title}</p>
                        <p>Genre:  {book.genre}</p>
                        <p>Wordcount:  {book.wordcount}</p>
                        <p>Views:  {book.views}</p>
                        <a href={"/write/" + book._id + "/chapter/" + (book.chapters.length-1)}><button>Keep writing...</button></a><br/><br/>
                        <a href={"/edit/" + book._id}><button>Edit book data</button></a>
                        <hr/>
                    </div>
                );
            })
            }
        </>
    );
}

export default ListWrittenBooks;
