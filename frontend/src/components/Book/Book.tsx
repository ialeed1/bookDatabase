import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from "react"
import axios from "axios"

export const Book: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [isbn, setISBN] = useState<any>();
    const [book, setBook] = useState({
        title: "",
        genre: "",
        price: 0,
        authorID: 0
    })
    const [genre, setGenre] = useState<string>('');
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const [price, setPrice] = useState({
        price: 0
    })
    const [books, setBooks] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState<number | null>(null);
    const [averagePrice, setAveragePrice] = useState<number | null>(null);

    const calculateStatistics = (books: any[]) => {
        if (books.length > 0) {
            const total = books.reduce((acc, book) => acc + book.price, 0);
            const average = total / books.length;
            setTotalPrice(total);
            setAveragePrice(average);
        } else {
            setTotalPrice(null);
            setAveragePrice(null);
        }
    };

    const storeValuesUpdate = (input: any) => {
        if (input.target.name === "price") {
            setPrice((price) => ({...price, price:input.target.value}))
        }
    }

    const fetchAllBooks = async() => {
        const response = await axios.get("http://localhost:8080/books")
        .then(response => {
            setBooks(response.data)
        })
        .catch(error => 
            alert("Fetching all books failed! Error message: " + error.message)
        )

    }

    const fetchFilteredBooks = async () => {
            const params: any = {};
            if (genre) params.genre = genre;
            if (minPrice) params.minPrice = minPrice;
            if (maxPrice) params.maxPrice = maxPrice;

            const response = await axios.get("http://localhost:8080/books/filter", { params })
            .then(response => {
                setBooks(response.data);
                calculateStatistics(response.data);
            })
            .catch (error => 
                alert("Fetching filtered books failed! Error message: " + error.message)
            ) 
    }

    const getFilteredPriceStats = async () => {
        const response = await axios.get(`http://localhost:8080/books/filtered-price-stats`, {
            params: {
                genre: genre || null,
                minPrice: minPrice || null,
                maxPrice: maxPrice || null,
            }
        })
        .then(response => {
            setTotalPrice(response.data.totalPrice);
            setAveragePrice(response.data.averagePrice);
        })
        .catch(error =>
            alert("Fetching filtered price stats failed! Error message: " + error.message)
        )
    }

    const storeValues = (input: any) => {
        if (input.target.name === "title") {
            setBook((book) => ({...book, title:input.target.value}))
        }
        if (input.target.name === "genre") {
            setBook((book) => ({...book, genre:input.target.value}))
        }
        if (input.target.name === "price") {
            setBook((book) => ({...book, price:input.target.value}))
        }
        if (input.target.name === "authorID") {
            setBook((book) => ({...book, authorID:input.target.value}))
        }
    }
    const goHome = () => {
        navigate('/')
    }

    const getBook = async () => {
        const response = await axios.get(`http://localhost:8080/books/${title}`)
        .then((response) => {
            console.log(response.data)
            alert(`Book Found: ${response.data[0].title}`);
        })
        .catch((error) => {
            alert("Get failed! Error message: " + error.message)
        })
    }


    const addBook = async () => {
        const response = await axios.post(`http://localhost:8080/books`, book)
        .then((response) => {
            console.log(response.data)
            alert(`Book added: ${response.data.isbn}`);
        }) 
        .catch((error) => {
            alert("Adding book failed! (POST) Error message: " + error.message)
        })
    }

    const deleteBook = async() => {
        const response = await axios.delete(`http://localhost:8080/books/${isbn}`)
        .then((response) => {
            console.log(response.data)
            alert(`Book Deleted successfully!`);
        })
        .catch((error) => {
            alert("Deleting book failed! Error message: " + error.message)
        })
    }

    const updateBookPrice = async() => {
        const response = await axios.patch(`http://localhost:8080/books/${isbn}`, price.price, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log(response.data)
            alert(`Book price updated successfully!`);
        })
        .catch((error) => {
            alert("Updating Book price failed! Error Message: " + error.message)
        })
    }

 

    return(
        <div className="container">
            <h2>View Books</h2>
            <div>
                <input type='text' placeholder='Enter Title' name='title' onChange={(e) => setTitle(e.target.value)}/>   
                <button className='Get-Book' onClick={getBook}>
                    Get Book
                </button>
            </div>

            <br></br>

            <div>
                <input type='text' placeholder='Title' name='title' onChange={storeValues}/>
                <input type='text' placeholder='Genre' name='genre' onChange={storeValues}/>
                <input type='text' placeholder='Price' name='price' onChange={storeValues}/>
                <input type='text' placeholder='Author ID' name='authorID' onChange={storeValues}/>
                <button className='Add-Book' onClick={addBook}>
                    Add Book
                </button>
            </div>

            <br></br>

            <div>
                <input type='text' placeholder='Enter Book ISBN' name='isbn' onChange={(e) => setISBN(e.target.value)}/>
                <button className='Delete-Book' onClick={deleteBook}>
                    Delete Book
                </button>
            </div>

            <br></br>

            <div>
                <input type='text' placeholder='Enter Book ISBN' name='isbn' onChange={(e) => setISBN(e.target.value)}/>
                <input type='text' placeholder='Enter New Price' name='price' onChange={storeValuesUpdate}/>
                <button className='Update-Price' onClick={updateBookPrice}>
                    Set New Price
                </button>

            </div>

            <br></br>
            

            <div>
                <input type="text" placeholder='Enter Book Genre' name='genre' onChange={(e) => setGenre(e.target.value)}/>
                <input type="text" placeholder='Enter Min Price' name='minPrice' onChange={(e) => setMinPrice(e.target.value)}/>
                <input type="text" placeholder='Enter Max Price' name='maxPrice' onChange={(e) => setMaxPrice(e.target.value)}/>

                <button className='Get-Book-By-Price-Range' onClick={fetchFilteredBooks}>
                    Filter
                </button>
            </div>

            <br></br>

            <div>
                <button className='Return-Home' onClick={goHome}>
                    Go Home
                </button>
            </div>

            <br></br>

            <div>
                <button className='Fetch-All-Books' onClick={fetchAllBooks}>
                    Fetch All Books
                </button>
            </div>

            <br></br>


            <div>
                <p>Total Price: {totalPrice !== null ? `$${totalPrice.toFixed(2)}` : "N/A"}</p>
                <p>Average Price: {averagePrice !== null ? `$${averagePrice.toFixed(2)}` : "N/A"}</p>
            </div>

            <div>
                <h3>Book List</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ISBN</th>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Price</th>
                            <th>AuthorID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key ={book.isbn}>
                                <td>{book.isbn}</td>
                                <td>{book.title}</td>
                                <td>{book.genre}</td>
                                <td>{book.price}</td>
                                <td>{book.author?.authorID}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}