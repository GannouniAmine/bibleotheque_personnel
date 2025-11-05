import Swal from "sweetalert2";


async function getBooks(setData : any ) {
      const response = await fetch('http://localhost:5000/books/getuserBooks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      const booksData = await response.json()
      setData(booksData)}

 async function getBookInfo(id : String | null  , setBookDetail :any) {
      const response = await fetch(`http://localhost:5000/books/getBookById/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("token")}`
        },
      });
      const data = await response.json();
      setBookDetail(data);
  }

async function updateBook(id : string | null , bookDetail :any) {
    if (bookDetail) {
      await fetch(`http://localhost:5000/books/updatebook/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(bookDetail),
      });
      Swal.fire({
        icon: "success",
        title: "Book updated successfully",
        showConfirmButton: false,
        timer: 1500,
      })
  }
}

async function addBook(book : any , upadateList : any) {

      const response = await fetch ("http://localhost:5000/books/createBook" ,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json" ,
                'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(book)
        }
      )
      if(!response.ok){
        throw new Error('Error adding book')
      }
      upadateList
      Swal.fire({
        title: 'Book Added',
        text: 'Book added successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      })
  }

async function deleteBook(id : number , setData : any) {
    await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
      const response = await fetch(`http://localhost:5000/books/deletebook/${id}` , {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization' : `Bearer ${localStorage.getItem('token')}`}
    }) 
    Swal.fire({
      title: 'Deleted!',
      text: 'Your file has been deleted.',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    })
    getBooks(setData)
      }
    })
  }


export {getBooks , getBookInfo ,updateBook ,addBook , deleteBook}