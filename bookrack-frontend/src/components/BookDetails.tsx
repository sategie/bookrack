import { useParams } from 'react-router-dom';
import { Book } from '../assets/types/Book.ts';
import BookCard from './BookCard.tsx';

export type BookDetailsProps = {
    books: Book[];
};

export default function BookDetails({ books }: BookDetailsProps){
    const { id } = useParams<{id:string}>();

    /**
     * The find method returns the first book in the books array which matches the specified condition
     */

    const book = books.find(book => book.id === id);


    return (
        <div className="container">
            <h1>Book Details</h1>
            {book ? <BookCard book={book}/> : <p>Book not found</p>}


        </div>
    );
};