"use client";

import { FormEvent, useEffect, useState } from "react";
import { supabase } from "./supabase-client";

interface Task {
  id: number,
  title: string,
  description: string,
  created_at: string
}

export default function Home() {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [newTask])

  const fetchTasks = async () => {
    const { error, data } = await supabase.from("tasks").select("*").order("id", {
      ascending: false
    })
    if (error) {
      console.error("ERROR fetching data: ", error.message);
      return;
    }

    setTasks(data);
  }

  const deleteTask = async (id: number) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id)
    if (error) {
      console.error("ERROR deleting task: ", error)
      return;
    }

    setTasks(prev => prev.filter(taskItem => taskItem.id != id))
  }

  const updateTask = async (id: number) => {
    const { error } = await supabase.from("tasks").update({
      description: newDescription
    }).eq("id", id)

    if (error) {
      console.error("ERROR updating task: ", error)
      return;
    }

    // setTasks(prev => prev.filter(taskItem => taskItem.id != id))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("tasks").insert(newTask).single();

    if (error) {
      console.error("Error Adding data: ", error.message);
      return;
    }
    setNewTask({ title: "", description: "" })
  }

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Supabase CRUD</h1>
      <div className="w-80 mx-auto">

        {/* form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center ">
          <input type="text" placeholder="task title" className="border-none py-1 pl-2 outline-none ring-1 rounded-md w-full" value={newTask.title}
            onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))} />
          <textarea placeholder="task description" className="border-none py-1 pl-2 outline-none ring-1 rounded-md w-full resize-y max-h-32" value={newTask.description}
            onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}></textarea>
          <button className="cursor-pointer bg-gray-600 py-1 px-3 rounded-sm">Add task</button>
        </form>
      </div>

      {/* tasks list */}
      <ul className="flex gap-3 items-center mt-8 p-4">
        {tasks.map(task => (
          <li key={task.id} className="border py-4 p-8 text-center space-y-3 w-full">
            <h2 className="font-semibold">{task.title}</h2>
            <p className="text-sm">{task.description}</p>
            <div className="space-x-3">
              <textarea placeholder="updated description" className="border-none py-1 pl-2 outline-none ring-1 rounded-md w-full resize-y max-h-32 max-w-48"
                onChange={(e) => setNewDescription(e.target.value)}></textarea>
              <button className="cursor-pointer text-sm bg-gray-700 py-0.5 px-1.5 rounded-sm" onClick={() => updateTask(task.id)}>Edit</button>
              <button className="cursor-pointer text-sm bg-gray-700 py-0.5 px-1.5 rounded-sm"
                onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div >
  );
}
