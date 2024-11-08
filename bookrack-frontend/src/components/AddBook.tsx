import {BookDTOCloud} from "../assets/types/BookDTOCloud.ts";
import React, {useState} from "react";

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
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        postBookData(bookData);
    }


    return(
            <form onSubmit={handleSubmit}>
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
                <label>
                    Image:
                    <input
                        type="file"
                        name="imageURL"
                        onChange={handleFileChange}
                    />
                </label>
                <button type="submit">Add Book</button>
            </form>
    )
}