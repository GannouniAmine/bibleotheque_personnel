'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Book } from "../../model/Book.entity";
import StarRate from "../../sharedComponent/startrate";
import { getBookInfo, updateBook } from "../../api/booksapi";
import Input from "@/sharedComponent/Input";
import TextareaInput from "@/sharedComponent/TextArea";
import { lireStatus } from "@/const";




export default function BookInfo() {
  
  const [bookDetail, setBookDetail] = useState<Book>();
  const [modifier, setModifier] = useState(false);
  const params = useSearchParams();
  const id = params.get("id");

  useEffect(() => {
    getBookInfo(id, setBookDetail);
  }, []);

  function handleChangeBookInfo(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (bookDetail) setBookDetail({ ...bookDetail, [name]: value });
  }

  if (!bookDetail) return <div>Loading...</div>;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateBook(id, bookDetail);
  }

  return (
    <div className="bg-white-100 dark:bg-white-800 py-10 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 overflow-hidden shadow">
              <img className="w-full h-full object-cover" src={bookDetail.couverture_url} alt={bookDetail.titre} />
            </div>
          </div>

          <div className="md:w-2/3 relative">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setModifier(!modifier)}
                type="button"
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M16.5 3.5l4 4M12 11l6-6"/>
                </svg>
                {modifier ? "Cancel" : "Edit"}
              </button>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Book Information</h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Title" name="titre" value={bookDetail.titre} onChange={handleChangeBookInfo} disabled={!modifier} />
                <Input label="Author" name="auteur" value={bookDetail.auteur} onChange={handleChangeBookInfo} disabled={!modifier} />
                <Input label="ISBN" name="isbn" value={bookDetail.isbn} onChange={handleChangeBookInfo} disabled={!modifier} />
                <Input label="Genre" name="genre" value={bookDetail.genre} onChange={handleChangeBookInfo} disabled={!modifier} />
                <Input label="Publication Date" name="date_publication" value={bookDetail.date_publication?.toString().split("T")[0]} onChange={handleChangeBookInfo} disabled={!modifier} />
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">Reading Status</label>
                  <select
                    title="ha"
                    name="status"
                    value={bookDetail.status}
                    onChange={handleChangeBookInfo}
                    disabled={!modifier}
                    className="w-full p-2 border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">Select a status</option>
                    {lireStatus.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <Input label="Start Date" name="date_debut_lecture" value={bookDetail.date_debut_lecture?.toString().split("T")[0]} onChange={handleChangeBookInfo} disabled={!modifier} />
                <Input label="End Date" name="date_fin_lecture" value={bookDetail.date_fin_lecture?.toString().split("T")[0]} onChange={handleChangeBookInfo} disabled={!modifier} />
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">Rating</label>
                  <StarRate bookDetail={bookDetail} setBookDetail={setBookDetail} editable={modifier} />
                </div>

                <TextareaInput label="Personal Notes" name="notes_personnelles" value={bookDetail.notes_personnelles || ""} onChange={handleChangeBookInfo} disabled={!modifier} />
              </div>

              {modifier && (
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="px-6 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
