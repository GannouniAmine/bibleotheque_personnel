'use client'

import { useEffect, useState } from 'react'
import { Book } from '../../model/Book.entity'
import Reading from './reading'
import BookList from './bookList'
import { getBooks } from '../../api/booksapi'

export default function Dashboard() {
  const [data, setData] = useState<Book[]>([])
  const [bestGenere , setBestGenere] = useState<string>('')

  useEffect(() => {
    getBooks(setData)
    getMostFrequentGenre(data)
  })


  const bookToread = data.filter((book) => book.status === 'TO READ')
  const bookReading = data.filter((book) => book.status === 'READING')
  const bookFinished = data.filter((book) => book.status === 'FINISHED')
  const bookAbandoned = data.filter((book) => book.status === 'ABANDONED')
  const LastfiveBooks = bookFinished.slice(-5)
  const booksFinishedcetteAnnee =  bookFinished.filter((book) => {
    const year = new Date(book.date_fin_lecture).getFullYear();
    return year === new Date().getFullYear();
  })
  const booksLusCetteAnnee = data.filter((book) => {
    const year = new Date(book.date_debut_lecture).getFullYear();
    return year === new Date().getFullYear();
  });

  
  let maxCount = 0;
  function getMostFrequentGenre(data: { genre: string }[]): void {
    const count: Record<string, number> = {};

    data.forEach((book) => {
      if (count[book.genre]) {
        count[book.genre] += 1;
      } else {
        count[book.genre] = 1;
      }
    });

    for (const [genre, c] of Object.entries(count)) {
      if (c > maxCount) {
        maxCount = c;
        setBestGenere(genre)
      }
    }
  }

    

  

  return (
    <div className="min-h-screen bg-white-100 dark:bg-white-900 py-16 px-6">
      <Reading
        bookToread={bookToread}
        bookReading={bookReading}
        bookFinished={bookFinished}
        bookAbandoned={bookAbandoned}
        booksLusCetteAnnee={booksLusCetteAnnee}
        generePrefere={bestGenere}
        annulgoal ={booksFinishedcetteAnnee}
      />

      <BookList
       LastfiveBooks = {LastfiveBooks}
      />

    </div>
  )
}
