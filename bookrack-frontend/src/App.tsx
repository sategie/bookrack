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
  const [pastReads, setPastReads] = useState<Book[]>([]);

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

    const addToPastReads = (book:Book) => {
        setPastReads([...pastReads, book]);
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
