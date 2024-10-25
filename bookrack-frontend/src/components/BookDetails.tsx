import { useParams } from 'react-router-dom';
import { Book } from '../assets/types/Book.ts';
import BookCard from './BookCard.tsx';
import styles from "../styles/BookDetails.module.css";


export type BookDetailsProps = {
    books:Book[]
    addToPastReads:(book:Book) => void
    addToFutureReads:(book:Book) => void
    pastReads:Book[]
    futureReads:Book[]

};

export default function BookDetails({ books, pastReads, futureReads,
                                        addToPastReads, addToFutureReads}: Readonly<BookDetailsProps>){
    const { id } = useParams<{id:string}>();

    /**
     * The find method returns the first book in the books array which matches the specified condition
     */
    const book = books.find(book => book.id === id);


    /**
     * Prevents adding duplicate entries in the Past Reads list
     *
     * Uses the "some" method to check if there is at least one book in the pastReads array that matches
     * the condition: pastReadBook => pastReadBook.id === book.id
     *
     * @param book - The book object which needs to be added to the Past Reads list
     */
    const handleAddToPastReads = (book: Book) => {
        // Check if the book is already in pastReads
        const alreadyAdded = pastReads.some(pastReadBook => pastReadBook.id === book.id);
        if (!alreadyAdded) {
            addToPastReads(book);
        } else {
            console.log("Book is already in Past Reads.");
        }
    };

    /**
     * Prevents adding duplicate entries in the Future Reads list
     *
     * Uses the "some" method to check if there is at least one book in the futureReads array that matches
     * the condition: futureReadBook => futureReadBook.id === book.id
     *
     * @param book - The book object which needs to be added to the Future Reads list
     */
    const handleAddToFutureReads = (book: Book) => {
        // Check if the book is already in pastReads
        const alreadyAdded = futureReads.some(futureReadBook => futureReadBook.id === book.id);
        if (!alreadyAdded) {
            addToFutureReads(book);
        } else {
            console.log("Book is already in Future Reads.");
        }
    };


    return (
        <div className="container">
            <h1 className={styles.detailsCard}>Book Details</h1>
            {book ? (
                <div>
                    <BookCard book={book} className={styles.detailedCard}/>
                    <button onClick={() => handleAddToPastReads(book)}>Add to Past Reads</button>
                    <button onClick={() => handleAddToFutureReads(book)}>Add to Future Reads</button>
                </div>
            ) : (
                <p>Book not found</p>
            )}


        </div>
    );
};