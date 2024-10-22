import {useEffect, useState} from 'react'
import './App.module.css'
import {Book} from "./assets/types/Book.ts";
import {Route, Routes} from "react-router-dom";
import axios from "axios";
import AllBooks from "./components/AllBooks.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import BookDetails from "./components/BookDetails.tsx";
import PastReads from "./components/PastReads.tsx";

function App() {
    const [books, setBooks] = useState<Book[]>([]);

    /**
     * Loads the list of past reads from the local storage.
     *
     * @return {Book[]} - An array of the Book objects (parsed savedPastReads) if it exists,
     * otherwise it returns an empty array
     */

    const loadPastReads = (): Book[] => {
        const savedPastReads = localStorage.getItem('pastReads');
        return savedPastReads ? JSON.parse(savedPastReads) : [];
    }


    const [pastReads, setPastReads] = useState<Book[]>(loadPastReads);



    const fetchBooksData = () => {
        axios.get("/api/books")
            .then(response => setBooks(response.data))
            .catch(error=> console.error(error))
    }

    useEffect(()=> {
            fetchBooksData()
        },
        []
    )

    /**
     * Adds a specific book to the list of past read books and uses localStorage to save the list on the client side
     *
     * @param book - The book object which is added to the past read list
     */
    const addToPastReads = (book:Book) => {
        const updatedPastReads = [...pastReads, book]
        setPastReads(updatedPastReads)
        localStorage.setItem('pastReads', JSON.stringify(updatedPastReads))
        console.log("Added book to Past Reads: ", book)
    }


    return (
        <>
            <Routes>
                <Route path="/allbooks" element={<AllBooks books={books} />}/>
                <Route path="/allbooks/:id" element={<BookDetails books={books} addToPastReads={addToPastReads} />}  />
                <Route path="/pastreads" element={<PastReads books={pastReads}/>}/>

            </Routes>


        </>

    )
}

export default App
