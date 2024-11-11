import styles from "../styles/HomePage.module.css"
import {Book} from "../assets/types/Book.ts"
import {useEffect, useState} from "react"
import BookCard from "./BookCard.tsx"
import {useNavigate} from "react-router-dom"

export type HomePageProps = {
    books: Book[]
}

export default function HomePage({books}:Readonly<HomePageProps>) {
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const navigate = useNavigate()



    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % books.length)
        }, 5000)

        return () => clearInterval(timer)

    }, [books])

    const currentBook = books[currentIndex]

    return (
        <div className={`container-fluid ${styles.homePage}`}>
            <h1>
                Welcome to the BookRack App!
            </h1>
            <blockquote className={styles.quote}>
                "A room without books is like a body without a soul." - Cicero
            </blockquote>
            <p className={styles.text}>Bookrack is a virtual bookshelf where you can store books
                you have read in the past and books
                you would like to read in the future.</p>
            <div className={styles.explore}>
                <button className={styles.btn} onClick={() => navigate('/allbooks')}>
                    Explore All Books
                </button>
            </div>
            <section>
                <h2 className={styles.featuredBooks}>Featured Books</h2>
                {books.length > 0 && (
                    <div className={styles.slideshow}>
                        <BookCard
                            book={currentBook}
                        />
                    </div>
                )}
            </section>
        </div>
    )
}