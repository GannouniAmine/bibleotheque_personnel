import Swal from "sweetalert2";
import { User } from "./authenticationApi";

 async function getProfile(setProfile : any){
    const response = await fetch('http://localhost:5000/users/profile', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem('token')}`},
    })
    const data = await response.json()
    if (!response.ok) {
      return
    }
    setProfile(data);
}

async function updateProfile(profile : User ) {
  const response = await fetch('http://localhost:5000/users/updateProfile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem('token')}`},
    body: JSON.stringify(profile),
  })
  const data = await response.json()
  if (!response.ok) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.message,
      });
    return;
  }
  Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Profile update with success !',
  });
}


export {getProfile ,updateProfile }