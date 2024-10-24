import {Book} from "../assets/types/Book.ts";
import styles from "../styles/AllBooks.module.css";
import React from "react";

export type BookCardProps = {
    book: Book;
    onClick?: () => void; // Add onClick as an optional prop
    className?: string; // Add className as an optional prop
    removeFromPastReads?: (bookId: string) => void; // Add function as an optional prop
    removeFromFutureReads?: (bookId: string) => void; // Add function as an optional prop
}
export default function BookCard({ book, onClick, className,
                                     removeFromPastReads, removeFromFutureReads}: BookCardProps) {

    /**
     * Handles the keydown event for the BookCard.
     *
     * This function provides keyboard accessibility for the BookCard component.
     *
     * It checks if the 'Enter' or 'Space' key is pressed and triggers the onClick
     * function if available. This ensures that the component can be interacted with if there is no
     * mouse.
     *
     * @param event - The keyboard event triggered when a key is pressed.
     */
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if ((event.key === "Enter" || event.key === "") && onClick) {
            onClick();
        }
    }

    return (
        <div className={`col-lg-4 col-md-6 col-sm-12 mb-4 ${className}`}
             onClick={onClick}
             onKeyDown={handleKeyDown}
             style={{ cursor: 'pointer' }}
        tabIndex={0} //Ensures the element is focusable when using a keyboard
        role="button" //Tells assistive technologies that this is an interactive element
        >
            <div className="card h-100">
                <div className="row g-0">
                    <div className="col-8">
                        <div className="card-body">
                            <h5 className={`card-title ${styles.bookTitle}`}>{book.title}</h5>
                            <p className="card-text">Author: {book.author}</p>
                            <p className="card-text">Country of Origin: {book.country}</p>
                            <p className="card-text">Year of Publication: {book.year}</p>
                            {removeFromPastReads && (
                                <button onClick={() => {
                                    removeFromPastReads(book.id) }}>
                                    Remove Book
                                </button>

                            )}
                            {removeFromFutureReads && (
                                <button onClick={() => {
                                    removeFromFutureReads(book.id)
                                }}>
                                    Remove Book
                                </button>
                            )}
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