import {useEffect, useState} from 'react'
import './App.module.css'
import {Book} from "./assets/types/Book.ts";
import {Route, Routes} from "react-router-dom";
import axios from "axios";
import AllBooks from "./components/AllBooks.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import BookDetails from "./components/BookDetails.tsx";

function App() {
  const [books, setBooks] = useState<Book[]>([])

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

  return (
      <>

          <Routes>
              <Route path="/allbooks" element={<AllBooks books={books} />}/>
              <Route path="/allbooks/:id" element={<BookDetails books={books} />}  />

          </Routes>


      </>

  )
}

export default App
