import { useState } from 'react';
import { addItem } from '../../utils/indexedDB';

const TodoForm = ({ refreshTodos }: { refreshTodos: () => void }) => {
  const [task, setTask] = useState('');
  const [label, setLabel] = useState('Backlog');  // Default label


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;
    const creationDate = new Date().toISOString();
    await addItem('todos', { task, completed: false, creationDate,
       completionDate: null, label});
    setTask('');
    refreshTodos();
  };




  return (
<form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task"
          className="border p-2 rounded w-full md:w-auto"
        />
        <select
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="p-2 border rounded w-full md:w-auto"
        >
          <option value="Backlog">Backlog</option>
          <option value="Todo">Todo</option>
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
        </select>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full md:w-auto">
          Add
        </button>
      </form>
  );
};

export default TodoForm;
