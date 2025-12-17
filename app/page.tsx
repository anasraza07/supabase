"use client";
import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import TaskManager from "./components/TaskManager";
import { supabase } from "./supabase-client";
import { Session } from "@supabase/supabase-js";

export default function Home() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })

    return () => {
      authListener.subscription.unsubscribe();
    }
  }, []);

  const fetchSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error fetching session:", error)
      return;
    }
    setSession(data.session);
  }

  const logout = async () => {
    await supabase.auth.signOut();
  }

  return (
    <div className="min-h-screen p-8 flex justify-center items-center">
      {session ?
        <div className="flex flex-col gap-4 items-center">
          <button className="cursor-pointer text-lg bg-gray-800 py-1 px-3 rounded-sm" onClick={logout}>Logout</button>
          <TaskManager session={session} />
        </div>
        : <Auth />}
    </div>
  );
}
