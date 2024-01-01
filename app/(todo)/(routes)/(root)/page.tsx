import TodoView from "../../_views/TodoView";

export default function Home() {
  return (
    <div className="flex justify-center">
      <TodoView edit={false} />
    </div>
  );
}
