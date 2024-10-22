import { useParams } from 'react-router-dom';
import { Book } from '../assets/types/Book.ts';
import BookCard from './BookCard.tsx';
import styles from "../styles/BookDetails.module.css";


export type BookDetailsProps = {
    books: Book[];
    addToPastReads:(book:Book) => void
};

export default function BookDetails({ books, addToPastReads}: BookDetailsProps){
    const { id } = useParams<{id:string}>();

    /**
     * The find method returns the first book in the books array which matches the specified condition
     */

    const book = books.find(book => book.id === id);


    return (
        <div className="container">
            <h1>Book Details</h1>
            {book ? (
                <div>
                    <BookCard book={book} className={styles.detailedCard}/>
                    <button onClick={() => addToPastReads(book)}>Add to Past Reads</button>
                </div>
            ) : (
                <p>Book not found</p>
            )}


        </div>
    );
};