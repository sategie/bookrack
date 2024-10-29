import styles from "../styles/HomePage.module.css";
import {Book} from "../assets/types/Book.ts";
import {useEffect, useState} from "react";

export type HomePageProps = {
    books: Book[];
}

export default function HomePage({books}:Readonly<HomePageProps>) {
    const [currentIndex, setCurrentIndex] = useState<number>(0)



    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % books.length);
        }, 5000)

        return () => clearInterval(timer)

    }, [books])

    const currentBook = books[currentIndex]

    return (
        <div className={`container-fluid ${styles.homePage}`}>
            <h1 className={styles.title}>
                Welcome to the BookRack App!
            </h1>
            <blockquote className={styles.quote}>
                "A room without books is like a body without a soul." - Cicero
            </blockquote>
            <p>Bookrack is a virtual bookshelf where you can store books you have read in the past and books
                you would like to read in the future.</p>
            <div className={styles.callToAction}>
                <button onClick={() => window.location.href = '/allbooks'}>
                    Explore All Books
                </button>
            </div>
            <section className={styles.slideshowSection}>
                <h2 className={styles.featuredBooks}>Featured Books</h2>
                {books.length > 0 && (
                    <div className={styles.slideshow}>
                        <img src={currentBook.imageLink}
                             alt={currentBook.title}
                             onError={(e) => {
                                 e.currentTarget.src = 'https://res.cloudinary.com/dvfxz4as6/image/upload/' +
                                     'v1729108999/' +
                                     'books/default-book-image_dkbcbd.jpg';
                             }}/>
                        <h3>{currentBook.title}</h3>
                        <p>by {currentBook.author}</p>
                    </div>
                )}
            </section>
        </div>
    );
}