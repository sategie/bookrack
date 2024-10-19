import {Book} from "../assets/types/Book.ts";
import styles from "../styles/AllBooks.module.css";

export type BookCardProps = {
    book: Book;
    onClick?: () => void; // Add onClick as an optional prop
}
export default function BookCard({ book, onClick }: BookCardProps) {
    return (
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" onClick={onClick} style={{ cursor: 'pointer' }}>
            <div className="card h-100">
                <div className="row g-0">
                    <div className="col-8">
                        <div className="card-body">
                            <h5 className={`card-title ${styles.bookTitle}`}>{book.title}</h5>
                            <p className="card-text">Author: {book.author}</p>
                            <p className="card-text">Country of Origin: {book.country}</p>
                            <p className="card-text">Year of Publication: {book.year}</p>
                        </div>
                    </div>
                    <div className="col-4">
                        <img
                            src={book.imageLink}
                            className={`img-fluid ${styles.cardImage}`}
                            alt={book.title}
                            onError={(e) =>
                                e.currentTarget.src = 'https://res.cloudinary.com/dvfxz4as6/' +
                                    'image/upload/v1729108999/books/default-book-image_dkbcbd.jpg'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}