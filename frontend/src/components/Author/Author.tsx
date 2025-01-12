import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from "react"
import axios from "axios"
import { error } from 'console';

export const Author: React.FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [author, setAuthor] = useState({
        firstName: "",
        lastName: ""
    })
    const [authorID, setAuthorID] = useState<any>();
    const [authors, setAuthors] = useState<any[]>([]);

    const fetchAllAuthors = async() => {
        const response = await axios.get("http://localhost:8080/author")
        .then(response => {
            setAuthors(response.data)
        })
        .catch(error =>
            alert("Fetching all authors failed! Error message: " + error.message)
        )
    }

    const navigate = useNavigate();
    const storeValues = (input: any) => {
        if (input.target.name === "firstName") {
            setAuthor((author) => ({...author, firstName:input.target.value}))
        }
        if (input.target.name === "lastName") {
            setAuthor((author) => ({...author, lastName:input.target.value}))
        }
    }
    const goHome = () => {
        navigate('/')
    }
    
    const getAuthor = async () => {
        const response = await axios.get(`http://localhost:8080/author/${firstName}/${lastName}`)
        .then((response) => {
            console.log(response.data)
            alert(`Author Found: ${response.data.firstName} ${response.data.lastName}`);
        })
        .catch((error) => {
            alert("Get failed! Error message: " + error.message)
        })
        
    }

    const addAuthor = async () => {
        const response = await axios.post(`http://localhost:8080/author`, author)
        .then((response) => {
            console.log(response.data)
            alert(`Author added: ${response.data.authorID}`);
        })
        .catch((error) => {
            alert("Adding author failed! (POST) Error message: " + error.message)
        })
    }

    const deleteAuthor = async() => {
        const response = await axios.delete(`http://localhost:8080/author/${authorID}`)
        .then((response) => {
            console.log(response.data)
            alert(`Author Deleted successfully!`);
        })
        .catch((error) => {
            alert("Deleting author failed! Error message: " + error.message)
        })
    }

    return(
        <div className="container">
            <h2>View Authors</h2>  
            <div>   
                <input type='text' placeholder='Enter First Name' name='firstName' onChange={(e) => setFirstName(e.target.value)}/>
                <input type='text' placeholder='Enter Last Name' name='lastName' onChange={(e) => setLastName(e.target.value)}/>
            
                <button className='Get-Author' onClick={getAuthor}>
                    Get Author
                </button>
            </div>

            <br></br>

            <div>
                <input type='text' placeholder='First Name' name='firstName' onChange={storeValues}/>
                <input type='text' placeholder='Last Name' name='lastName' onChange={storeValues}/>
                <button className='Add-Author' onClick={addAuthor}>
                    Add Author
                </button>
            </div>

            <br></br>

            <div>
                <input type='text' placeholder='Enter Author ID' name='authorID' onChange={(e) => setAuthorID(e.target.value)}/>
                <button className='Delete-Author' onClick={deleteAuthor}>
                    Delete Author
                </button>
            </div>

            <br></br>

            <div>
                <button className='Return-Home' onClick={goHome}>
                    Go Home
                </button>
            </div>
            <div>
                <button className='Fetch-All-Authors' onClick={fetchAllAuthors}>
                    Fetch All Authors
                </button>
            </div>
            <div>
                <h3>Author List</h3>
                <table>
                    <thead>
                        <tr>
                            <th>AuthorID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authors.map(author => (
                            <tr key = {author.authorID}>
                                <td>{author.authorID}</td>
                                <td>{author.firstName}</td>
                                <td>{author.lastName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}