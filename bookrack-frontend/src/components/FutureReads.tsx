import {Book} from "../assets/types/Book.ts";
import BookCard from "./BookCard.tsx";
import styles from "../styles/AllBooks.module.css";

export type FutureReadsProps = {
    books:Book[]
    removeFromFutureReads?: (bookId: string) => void;
}


export default function FutureReads({books, removeFromFutureReads}: Readonly<FutureReadsProps>){
    console.log("FutureReads: ", books)

    return(
        <>
            <div className="container">
                <h1 className = {styles.fixedHeader}>Future Reads</h1>
                {books.length > 0 ? (
                    <div className="row">
                        {books.map((book) => (
                            <BookCard key={book.id} book={book} removeFromFutureReads={removeFromFutureReads}/>
                        ))}
                    </div>
                ) : (
                    <p>No books in your Future Reads</p>
                )}
            </div>
        </>
    )
}