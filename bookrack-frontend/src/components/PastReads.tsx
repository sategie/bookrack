import {Book} from "../assets/types/Book.ts"
import BookCard from "./BookCard.tsx"
import styles from "../styles/AllBooks.module.css"

export type PastReadProps={
    books:Book[]
    removeFromPastReads:(bookId:string) => void
}


export default function PastReads({books, removeFromPastReads}:Readonly<PastReadProps>){


    return(
        <>
            <div className="container-fluid">
                <h1 className = {styles.fixedHeader}>Past Reads</h1>
                {books.length > 0 ? (
                    <div className="row">
                        {books.map((book) => (
                            <BookCard key={book.id} book={book} removeFromPastReads={removeFromPastReads}/>
                        ))}
                    </div>
                ) : (
                    <p>No books in your Past Reads</p>
                )}
            </div>

        </>
    )
}