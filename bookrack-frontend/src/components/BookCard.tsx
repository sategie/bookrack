import {Book} from "../assets/types/Book.ts"
import styles from "../styles/BookCard.module.css"
import React from "react"


export type BookCardProps = {
    book: Book
    onClick?: () => void
    className?: string
    removeFromPastReads?: (bookId: string) => void
    removeFromFutureReads?: (bookId: string) => void
}
export default function BookCard({ book, onClick, className,
                                     removeFromPastReads, removeFromFutureReads}: Readonly<BookCardProps>) {

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
            onClick()
        }
    }

    return (
        <div className={`col-lg-4 col-md-6 col-sm-12 mb-4 ${className}`}
             onClick={onClick}
             onKeyDown={handleKeyDown}
             style={onClick ? { cursor: 'pointer' } : {cursor: 'default'}}
             tabIndex={0}
             role="button"
        >
            <div className="card h-100">
                <div className="row g-0">
                    <div className="col-8">
                        <div className="card-body">
                            <h5 className={`card-title ${styles.cardTitle}`}>{book.title}</h5>
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
                            onError={(e) => {
                                e.currentTarget.src = 'https://res.cloudinary.com/dvfxz4as6/image/upload/' +
                                    'v1730376417/books/default_book_image_ydprpr.webp';
                                e.currentTarget.className = ` ${styles.defaultBookImage}`
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}