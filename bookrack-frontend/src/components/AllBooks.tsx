import {Book} from "../assets/types/Book.ts";

export type AllBooksProps = {
    books:Book[]
}


export default function AllBooks({books}: AllBooksProps){

    return(
       <div>
           <h1>All Books</h1>
           {books.length > 0 ?
               (<ul>
                   {books.map(book =>(
                       <li key={book.id}>
                           <h2>{book.title}</h2>
                           <p>Author: {book.author}</p>
                           <p>Country of Origin: {book.country}</p>
                           <p>Year of Publication: {book.year}</p>
                           <p>{book.imageLink}</p>
                       </li>
                   ))}
               </ul>
               ): (
                   <p>No books to show</p>
               )
           }

       </div>

    )
}