'use client'
import React, { useState } from "react"
import { addBook } from "../../api/booksapi"
import { genres } from "../../const"
import { Book } from "@/model/Book.entity"
import Input from "@/sharedComponent/Input"


export default function ModalAddBooks({ closeModal, upadateList }: any) {
  const [book, setBook] = useState<Book>({
    id: 0,
    titre: "",
    auteur: "",
    isbn: "",
    date_publication: new Date(),
    genre: "",
    couverture_url: "",
    status: "TO READ",
    date_debut_lecture: new Date(),
    date_fin_lecture: new Date(),
    note: 0,
    notes_personnelles: "",
    created_at: new Date(),
    updated_at: new Date(),
    user_id: 0
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await addBook(book, upadateList);
    closeModal();
  }

  return (
    <>
      <div
        onClick={closeModal}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity cursor-pointer z-10"
      ></div>

      <div className="fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-full max-w-lg bg-white dark:bg-gray-800 shadow-2xl rounded-2xl
                      p-8 border border-gray-200 dark:border-gray-700 transition-all">
        
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-red-500 hover:bg-red-600
                     text-white rounded-full flex justify-center items-center text-sm font-bold shadow-md transition"
          onClick={closeModal}
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          Add a New Book
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            label="Title"
            name="titre"
            value={book.titre}
            onChange={handleChange}
            placeholder="Enter title..."
            required
          />

          <Input
            label="Author"
            name="auteur"
            value={book.auteur}
            onChange={handleChange}
            placeholder="Enter author..."
            required
          />

          <Input
            label="ISBN"
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            placeholder="Enter ISBN..."
            required
          />

          <Input
            label="Cover URL"
            name="couverture_url"
            value={book.couverture_url}
            onChange={handleChange}
            placeholder="Enter cover URL..."
            required
          />

          <div>
            <label htmlFor="genre" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Genre
            </label>
            <select
              id="genre"
              name="genre"
              value={book.genre}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 
                         rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                         transition"
              required
            >
              <option value="">-- Select a Genre --</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          <Input
            label="Publication Date"
            name="date_publication"
            type="date"
            value={book.date_publication?.toString().split("T")[0]}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium
                       rounded-lg transition-colors shadow-md"
          >
            Add Book
          </button>
        </form>
      </div>
    </>
  );
}
