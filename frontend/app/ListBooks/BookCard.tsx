'use client'

import Link from "next/link"
import StarRate from "../../sharedComponent/startrate";

export default function BookCard(props: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="h-56 w-full overflow-hidden">
        <img
          src={props.couverture_url}
          alt={props.titre}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{props.titre}</h3>
        <p className="text-gray-600 dark:text-gray-300">{props.auteur}</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">ISBN: {props.isbn}</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Published: {props.date_publication}</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Genre: {props.genre}</p>
        <div className="flex space-x-1 mt-1">
          <StarRate 
          editable={false}
          bookDetail={props}
          />
        </div>
        <Link
         className="rounded-md bg-slate-600 py-2 px-4 border border-transparent text-center text-sm text-white shadow-md 
                    transition-all hover:bg-slate-700 hover:shadow-lg focus:bg-slate-800 focus:shadow-none active:bg-slate-900 
                    disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          href={{
            pathname: "/BookInfo",
            query: {
              id: props.id
            },
          }}
        >
          <button
            type="button"
          >
            Reading Tracker
          </button>
        </Link>
        <button 
          onClick = {() => props.onDelete(props.id)}
          className="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white shadow-md 
                    transition-all hover:bg-red-700 hover:shadow-lg focus:bg-red-800 focus:shadow-none active:bg-red-900 
                    disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          Delete
        </button>

      </div>
    </div>
  )
}
