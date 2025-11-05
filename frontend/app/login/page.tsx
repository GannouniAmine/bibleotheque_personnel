

'use client';
import { FormEvent, useState } from "react";
import { Login } from "../../api/authenticationApi";
import { LoignInfo } from "@/model/LoignInfo.entity";
import Input from "@/sharedComponent/Input";

export default function LoginPage() {
  const [user, setUser] = useState<LoignInfo>({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await Login(user);
  }

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google/login';
  };
  const handleGithubLogin = () => {
    window.location.href = 'http://localhost:5000/auth/github/login';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-6 sm:p-8">
          <img
            src="/biblogo.png"
            alt="Your Company"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="text-center text-2xl font-bold tracking-tight text-black dark:text-white">
            Sign in to your account
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              placeholder="name@mail.com"
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold 
                         text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 
                         focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              Sign in
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex w-full justify-center items-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold 
                       text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                       focus-visible:outline-gray-600"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>
          <button
            type="button"
            onClick={handleGithubLogin}
            className="flex w-full justify-center items-center gap-3 mt-3 rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold 
                       text-white shadow-sm ring-1 ring-inset ring-gray-700 hover:bg-gray-800 
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                       focus-visible:outline-gray-600"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.262.82-.583v-2.234c-3.338.724-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.303-5.466-1.334-5.466-5.931 0-1.31.467-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.018.004 2.045.138 3.003.404 2.289-1.552 3.296-1.23 3.296-1.23.653 1.653.242 2.873.119 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.805 5.625-5.475 5.921.43.372.823 1.102.823 2.222v3.293c0 .323.216.698.825.58C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Continue with GitHub
          </button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Not a member?
            <a
              href="/signup"
              className="font-semibold text-blue-600 hover:text-blue-500"
            >
              {" "}Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}