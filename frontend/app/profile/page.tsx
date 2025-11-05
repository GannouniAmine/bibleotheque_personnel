'use client'

import { useEffect, useState } from "react";
import { changePassword } from "../../api/authenticationApi";
import { getProfile, updateProfile } from "../../api/userApi";
import { Profile } from "@/model/Profile.entity";
import { ChangePassword } from "@/model/ChangePassword.entity";
import Input from "@/sharedComponent/Input";

export default function Profil() {
  const [modifier, setModifier] = useState(false);
  const [modifierPass, setModifierPass] = useState(false);
  const [profile, setProfile] = useState<Profile>({ email: '', nom: '' });
  const [passwordChange, setPasswordChange] = useState<ChangePassword>({
    password: '', newPassword: '', confirmNewPassword: ''
  });

  useEffect(() => {
    getProfile(setProfile);
  }, []);

  const handleClick = () => { setModifier(!modifier); setModifierPass(false); }
  const handleClickPass = () => { setModifier(false); setModifierPass(!modifierPass); setPasswordChange({ password: '', newPassword: '', confirmNewPassword: '' }); }

  const handleChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordChange({ ...passwordChange, [e.target.name]: e.target.value });
  }

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateProfile(profile);
  }

  const handleSubmitPass = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await changePassword(passwordChange, setPasswordChange, setModifierPass, modifierPass);
  }

  const handleLogoutClick = () => {
    localStorage.clear();
    window.location.href = '/login';
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold dark:text-white">General Information</h3>
          <button onClick={handleClick} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">{modifier ? "Cancel" : "Edit"}</button>
        </div>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleProfileSubmit}>
          <Input label="Email" name="email" type="text" value={profile.email} onChange={handleChangeProfile} placeholder="Email ..." required disabled={!modifier} />
          <Input label="Full Name" name="nom" type="text" value={profile.nom} onChange={handleChangeProfile} placeholder="Full Name ..." required disabled={!modifier} />
          {modifier && <div className="col-span-1 sm:col-span-2"><button type="submit" className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Save</button></div>}
        </form>
      </div>

     
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold dark:text-white">Password Update</h3>
          <button onClick={handleClickPass} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">{modifierPass ? "Cancel" : "Edit"}</button>
        </div>
        <form onSubmit={handleSubmitPass} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Current Password" name="password" type="password" value={passwordChange.password} onChange={handleChangePass} placeholder="Old Password" required disabled={!modifierPass} />
          <Input label="New Password" name="newPassword" type="password" value={passwordChange.newPassword} onChange={handleChangePass} placeholder="New Password" required disabled={!modifierPass} />
          <Input label="Repeat Password" name="confirmNewPassword" type="password" value={passwordChange.confirmNewPassword} onChange={handleChangePass} placeholder="Repeat Password" required disabled={!modifierPass} />
          {modifierPass && <div className="col-span-1 sm:col-span-2"><button type="submit" className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Save</button></div>}
        </form>
      </div>

      <button onClick={handleLogoutClick} className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Logout</button>
    </div>
  );
}
