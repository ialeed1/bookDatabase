import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from "react"
import axios from "axios"

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const goToBook = () => {
        navigate('/book')
    }
    const goToAuthor = () => {
        navigate('/author')
    }
    return(
        <div className="container">
            <h2>This be homepage</h2>        
            <button onClick={goToAuthor}>
                AUTHOR
            </button>
            <button onClick={goToBook}>
                BOOK
            </button>
        </div>
    )
}