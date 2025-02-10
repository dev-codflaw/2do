import TodoForm from '../components/TodoList/TodoForm';
import TodoList from '../components/TodoList/TodoList';

const TodoPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Todo List</h1>
      <TodoForm refreshTodos={() => window.location.reload()} />
      <TodoList />
    </div>
  );
};

export default TodoPage;
