import { ChangePassword } from "@/model/ChangePassword.entity";
import { LoignInfo } from "@/model/LoignInfo.entity";
import { RegisterUser } from "@/model/RegisterUser.entity";
import Swal from "sweetalert2";




  
async function Login(user : LoignInfo) {

    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token' , data.access_token)
      window.location.href = '/dashboard'
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "False information",
      })
    }
}


async function Register(userData: RegisterUser, setError: any) {
  setError(null);
  const user = {
    email: userData.email,
    nom: userData.nom,
    password: userData.password,
  };

  if (userData.password !== userData.repeatPassword) {
    setError("Passwords do not match");
    return false;
  }

  const response = await fetch("http://localhost:5000/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    setError("User already exists");
    return false;
  }

  return true; 
}

 async function changePassword(PasswordChange : ChangePassword , setPasswordChange : any , setModifierPass : any , modifierPass :any ){
    if(PasswordChange.newPassword !== PasswordChange.confirmNewPassword){
       Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Passwords do not match',
      });
      return
    }

    const response = await fetch('http://localhost:5000/users/changePassword', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem('token')}`},
      body: JSON.stringify(PasswordChange),
    })
    const data = await response.json()
    if (!response.ok) {
       Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.message,
      });
      setPasswordChange({ password: '', newPassword: '', confirmNewPassword: '' });
      return;
    }
     Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Password changed successfully!',
      });
    setModifierPass(!modifierPass);
    setPasswordChange({ password: '', newPassword: '', confirmNewPassword: '' });
    return;
  }




  export {Login ,Register , changePassword} 