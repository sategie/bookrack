import {useEffect, useState} from 'react'
import './App.module.css'
import {Book} from "./assets/types/Book.ts"
import {Route, Routes} from "react-router-dom"
import axios from "axios"
import AllBooks from "./components/AllBooks.tsx"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import BookDetails from "./components/BookDetails.tsx"
import PastReads from "./components/PastReads.tsx"
import FutureReads from "./components/FutureReads.tsx"
import NavBar from "./components/NavBar.tsx"
import HomePage from "./components/HomePage.tsx"
import {BookDTOCloud} from "./assets/types/BookDTOCloud.ts";
import AddBook from "./components/AddBook.tsx";

function App() {
    const [books, setBooks] = useState<Book[]>([])

    const [alert, setAlert] = useState<string | null>(null)

    const showAlert = (message: string) => {
        setAlert(message)
        setTimeout(() => setAlert(null), 3000)
    }


    /**
     * Loads the list of past reads from the local storage.
     *
     * @return {Book[]} - An array of the Book objects (parsed savedPastReads) if it exists,
     * otherwise it returns an empty array
     */
    const loadPastReads = (): Book[] => {
        const savedPastReads = localStorage.getItem("pastReads")
        return savedPastReads ? JSON.parse(savedPastReads) : []
    }

    const [pastReads, setPastReads] = useState<Book[]>(loadPastReads)

    /**
     * Loads the list of future reads from the local storage.
     *
     * @return {Book[]} - An array of the Book objects (parsed savedFutureReads) if it exists,
     * otherwise it returns an empty array
     */
    const loadFutureReads = (): Book[] => {
        const savedFutureReads = localStorage.getItem("futureReads")
        return savedFutureReads ? JSON.parse(savedFutureReads) : []
    }

    const [futureReads, setFutureReads] = useState<Book[]>(loadFutureReads)


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
        localStorage.setItem("pastReads", JSON.stringify(updatedPastReads))
        showAlert("Added to Past Reads")
    }

    /**
     * Adds a specific book to the list of future read books and uses localStorage to save the list on the client side
     *
     * @param book - The book object which is added to the future read list
     */
    const addToFutureReads = (book:Book)=> {
        const updatedFutureReads = [...futureReads, book]
        setFutureReads(updatedFutureReads)
        localStorage.setItem("futureReads", JSON.stringify(updatedFutureReads))
        showAlert("Added to Future Reads")
    }

    const removeFromPastReads = (bookId: string) => {
        const updatedPastReads = pastReads.filter(book => book.id !== bookId);
        setPastReads(updatedPastReads);
        localStorage.setItem("pastReads", JSON.stringify(updatedPastReads))
        showAlert("Removed from Past Reads")
    };

    const removeFromFutureReads = (bookId: string) => {
        const updatedFutureReads = futureReads.filter(book => book.id !== bookId)
        setFutureReads(updatedFutureReads);
        localStorage.setItem("futureReads", JSON.stringify(updatedFutureReads))
        showAlert("Removed from Future Reads")
    };


    const postBookData = async (bookDTOCloud: BookDTOCloud) => {
        try {
            const formData = new FormData();
            formData.append(
                "title", bookDTOCloud.title);
            formData.append(
                "author", bookDTOCloud.author);
            formData.append(
                "country", bookDTOCloud.country);
            formData.append(
                "year",bookDTOCloud.year.toString());

            formData.append("file", bookDTOCloud.imageURL);


            await axios.post("/api/books", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            showAlert("Book added successfully!");
            fetchBooksData();

        } catch (error) {
            console.error("There was an error adding the book:", error);
            showAlert("Failed to add book. Please try again.");
        }
    };


    return (
        <>
            <NavBar/>
            {alert && (
                <div className="alert alert-success" role="alert">
                    {alert}
                </div>
            )}
            <Routes>
                <Route path="/" element={<HomePage books={books.slice(0, 5)}/>}/>
                <Route path="/allbooks" element={<AllBooks books={books} />}/>
                <Route path="/allbooks/:id" element={<BookDetails books={books}
                                                                  pastReads={pastReads}
                                                                  addToPastReads={addToPastReads}
                                                                  futureReads={futureReads}
                                                                  addToFutureReads={addToFutureReads}
                                                                  showAlert={showAlert}
                                                                />}
                />
                <Route path="/pastreads" element={<PastReads books={pastReads}
                                                             removeFromPastReads={removeFromPastReads}
                                                                />}
                />
                <Route path="/futurereads" element={<FutureReads books={futureReads}
                                                                 removeFromFutureReads={removeFromFutureReads}
                                                                 />}
                />
                <Route path="/addbook" element={<AddBook postBookData={postBookData}
                                                                 />}
                />

            </Routes>


        </>

    )
}

export default App

