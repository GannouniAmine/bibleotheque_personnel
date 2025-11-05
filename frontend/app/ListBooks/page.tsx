'use client'


import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ModalAddBooks from "./ModalAddBooks";
import BookCard from "./BookCard";
import Filterbook from "./Filterbook";
import { Book } from "../../model/Book.entity";
import {getBooks , deleteBook} from "../../api/booksapi"

export default function ListBooks() {

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    getBooks(setBooks)
  }, [])
  function toggleDropdown (){
    setOpen(!open);
  }


  async function handleDeleteBook(id : number) {
    await deleteBook(id , setBooks )
  }

  const filteredBooks = books.filter(book => {
    const genreMatch = selectedGenres.length === 0 || selectedGenres.includes(book.genre);
    const statusMatch = selectedStatus.length === 0 || selectedStatus.includes(book.status);
    const titleMatch = searchTerm === '' || book.titre.toLowerCase().includes(searchTerm.toLowerCase());
    const authorMatch = searchTerm === '' || book.auteur.toLowerCase().includes(searchTerm.toLowerCase());
    return genreMatch && statusMatch && (titleMatch || authorMatch);
  });

  async function handleSearchChange(event : any){
    setSearchTerm(event.target.value);
  }
  
 


  return(
    <section className="bg-white-50 dark:bg-white-900 min-h-screen p-5 antialiased">
      <div className="mx-auto max-w-screen-2xl">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-3 md:space-y-0">
          <h5 className="text-gray-700 dark:text-gray-200 text-lg font-medium">
            All Books: <span className="font-bold">{books.length}</span>
          </h5>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <button
              onClick={() => setShowModalAdd(true)}
              className="inline-flex items-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
            >
              Add Book
            </button>
            {showModalAdd && createPortal(
              <ModalAddBooks closeModal={() => setShowModalAdd(false)}  upadateList = {getBooks(setBooks)} />, document.body

            )}
            <div className="relative">
                  <button
                    id="filterDropdownButton"
                    className="w-full md:w-auto flex items-center justify-between py-2 px-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    type="button"
                    onClick={toggleDropdown}
                  >
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="h-4 w-4 mr-2 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Filter
                    </span>
                    <svg
                      className={`w-5 h-5 ml-2 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      />
                    </svg>
                  </button>
                  {open && (
                    <div className="absolute right-0 mt-2 w-50 bg-white border border-gray-200 rounded-lg shadow-lg z-50 dark:bg-gray-800 dark:border-gray-700">
                      <Filterbook 
                        selectedGenres={selectedGenres}
                        setSelectedGenres={setSelectedGenres}
                        selectedStatus={selectedStatus}
                        setSelectedStatus={setSelectedStatus}/>
                    </div>
                  )}
            </div>
          </div>
        </div>

        <div className="mb-6 w-full md:w-1/2">
          <input
            type="text"
            placeholder="🔍  Search books by title or by author..."
            onChange={handleSearchChange}
            className="w-full p-2 pl-10 rounded-lg border border-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book, index) => (
          <BookCard
            key={index}
            id={book.id}
            titre={book.titre}
            auteur={book.auteur}
            isbn={book.isbn}
            date_publication={book.date_publication}
            genre={book.genre}
            couverture_url={book.couverture_url}
            status = {book.status}
            date_debut_lecture = {book.date_debut_lecture}
            date_fin_lecture = {book.date_fin_lecture}
            note = {book.note}
            notes_personnelles = {book.notes_personnelles}
            onDelete={handleDeleteBook}
          />
        ))}
      </div>

      </div>
    </section>
  )
}