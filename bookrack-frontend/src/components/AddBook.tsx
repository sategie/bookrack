import {BookDTOCloud} from "../assets/types/BookDTOCloud.ts";
import React, {useState} from "react";
import styles from "../styles/Form.module.css"

export type AddBookProps= {
    postBookData: (bookDTOCloud: BookDTOCloud) => void;
}

export default function AddBook({postBookData}: Readonly<AddBookProps>) {
    const [bookData, setBookData] = useState<BookDTOCloud>({
        title: '',
        author: '',
        country: '',
        year: new Date().getFullYear(),
        imageURL: new File([], ''),
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setBookData(bookData => ({...bookData, [name]: value}));
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : new File([], '');
        setBookData(bookData => ({
            ...bookData,
            imageURL: file,
        }));

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        postBookData(bookData);
    }


    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.formGroup}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={bookData.title || ""}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div className={styles.formGroup}>
                <label>
                    Author:
                    <input
                        type="text"
                        name="author"
                        value={bookData.author || ""}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div className={styles.formGroup}>
                <label>
                    Country:
                    <input
                        type="text"
                        name="country"
                        value={bookData.country || ""}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div className={styles.formGroup}>
                <label>
                    Year:
                    <input
                        type="number"
                        name="year"
                        value={bookData.year || ""}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div className={styles.formGroup}>
                <label>
                    Image:
                    <input
                        type="file"
                        name="imageURL"
                        onChange={handleFileChange}
                    />
                    {imagePreview && (
                        <img src={imagePreview} alt="Image Preview"
                             style={{ width: '10rem', height: 'auto', marginTop: '1rem' }} />
                    )}
                </label>
            </div>
            <button type="submit" className={styles.button}>Add Book</button>
        </form>
    )
}