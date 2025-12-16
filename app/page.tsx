import Auth from "./components/Auth";
import TaskManager from "./components/TaskManager";

export default function Home() {

  return (
    <div className="p-8">
      <TaskManager />
      <Auth />
    </div>
  );
}
