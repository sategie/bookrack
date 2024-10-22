import {Book} from "../assets/types/Book.ts";
import BookCard from "./BookCard.tsx";

export type PastReadProps={
    books:Book[]
}


export default function PastReads({books}:PastReadProps){
    console.log("PastReads: ", books)

    return(
        <>
            <div className="container">
                <h1>Past Reads</h1>
                {books.length > 0 ? (
                    <div className="row">
                        {books.map((book) => (
                            <BookCard key={book.id} book={book}/>
                        ))}
                    </div>
                ) : (
                    <p>No books in your past reads</p>
                )}
            </div>

        </>
    )
}