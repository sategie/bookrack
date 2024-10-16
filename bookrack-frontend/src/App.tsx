import {useEffect, useState} from 'react'
import './App.css'
import {Book} from "./assets/types/Book.ts";
import {Route, Routes} from "react-router-dom";
import axios from "axios";
import AllBooks from "./components/AllBooks.tsx";

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
              <Route path={"/allbooks"} element={<AllBooks books={books} />}/>
          </Routes>


      </>

  )
}

export default App
