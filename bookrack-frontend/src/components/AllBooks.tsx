import {Book} from "../assets/types/Book.ts";
import styles from "../styles/AllBooks.module.css";
import BookCard from "./BookCard.tsx";

export type AllBooksProps = {
    books: Book[]
}

export default function AllBooks({books}: AllBooksProps) {
    return (
        <div className="container">
            <h1 className = {styles.fixedHeader}>All Books</h1>
            {books.length > 0 ? (
                <div className={`row`}>
                    {books.map(book => (
                        <BookCard key={book.id} book={book}/>
                    ))}
                </div>
            ) : (
                <p>No books to show</p>
            )}
        </div>
    )
}