export default function BookList(props: any) {
  return (
    <div id="category-body" aria-labelledby="category-heading" className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white">
        Last 5 Finished Books
      </h1>

      <div className="overflow-x-auto rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700">
        <table className="min-w-full border-collapse bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
          <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Genre</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Reading End Date</th>
            </tr>
          </thead>
          <tbody>
            {props.LastfiveBooks.map((book: any, index: number) => (
              <tr
                key={index}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <td className="px-6 py-4 font-medium">{book.titre}</td>
                <td className="px-6 py-4">{book.auteur}</td>
                <td className="px-6 py-4">{book.genre}</td>
                <td className="px-6 py-4">
                  {new Date(book.date_fin_lecture).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
