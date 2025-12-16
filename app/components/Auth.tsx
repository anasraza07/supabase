"use client";

import { FormEvent, useState } from "react";
import { supabase } from "../supabase-client";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // console.log({ email, password });

    if (isSignUp) {
      const { error: signUpError } = await supabase.auth.signUp({
        email, password
      })

      if (signUpError) {
        console.error("Error signing up:", signUpError)
        return;
      }
    } else {
      const { error: signInError } = await supabase.auth
        .signInWithPassword({
          email, password
        })

      if (signInError) {
        console.error("Error signing in:", signInError)
        return;
      }
    }

    setEmail("")
    setPassword("")
  }

  return (
    <form className='max-w-sm mx-auto flex flex-col items-center gap-4'
      onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold">{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <input type="text" className="border-none py-1 pl-2 outline-none ring-1 rounded-md w-full" placeholder='Email' value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <input type="password" className="border-none py-1 pl-2 outline-none ring-1 rounded-md w-full" placeholder='Password' value={password}
        onChange={(e) => setPassword(e.target.value)} />
      <button className='cursor-pointer bg-gray-600 py-1 px-3 rounded-sm'>{isSignUp ? "Sign up" : "Sign in"}</button>
      <button className='cursor-pointer bg-gray-600 py-1 px-3 rounded-sm' onClick={() => setIsSignUp(!isSignUp)}>Swith to {isSignUp ? "Sign in" : "Sign up"}</button>
    </form>
  )
}

export default Auth