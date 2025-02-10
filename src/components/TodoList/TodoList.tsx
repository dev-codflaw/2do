import { useEffect, useState } from 'react';
import { getAllItems, deleteItem, updateItem } from '../../utils/indexedDB';
import FilterNav from './FilterNav';


const TodoList = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTask, setEditingTask] = useState('');
  const [editingLabel, setEditingLabel] = useState('');
  const [filterLabel, setFilterLabel] = useState('All');

  const fetchTodos = async () => {
    const allTodos = await getAllItems('todos');
    const filteredTodos = filterLabel === 'All' 
      ? allTodos 
      : allTodos.filter(todo => todo.label === filterLabel);
    setTodos(filteredTodos);
  };

  useEffect(() => {
    fetchTodos();
  }, [filterLabel]);  // Re-run fetchTodos whenever filterLabel changes
  

  const handleDelete = async (id: number) => {
    await deleteItem('todos', id);
    fetchTodos();
  };


  const handleToggle = async (todo: any) => {
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
      completionDate: !todo.completed ? new Date().toISOString() : null
    };
    await await updateItem('todos', updatedTodo);
    fetchTodos();
  };

  const handleEdit = (todo: any) => {
    setEditingId(todo.id);
    setEditingTask(todo.task);
    setEditingLabel(todo.label);
  };

  const handleUpdate = async (id: number) => {
    await updateItem('todos', { id, task: editingTask, label: editingLabel });
    setEditingId(null);
    fetchTodos();
  };

  const labels = ['All', 'Backlog', 'Todo', 'Pending', 'Done'];

  return (
    <div className="p-4">
      <FilterNav labels={labels} filterLabel={filterLabel} setFilterLabel={setFilterLabel} />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Task</th>
              <th className="px-4 py-2 text-left">Label</th>
              <th className="px-4 py-2 flex justify-end space-x-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editingTask}
                      onChange={(e) => setEditingTask(e.target.value)}
                      className="border p-1 w-full rounded"
                    />
                  ) : (
                    <span
                      onClick={() => handleToggle(todo)}
                      className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
                    >
                      {todo.task}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingId === todo.id ? (
                    <select
                      value={editingLabel}
                      onChange={(e) => setEditingLabel(e.target.value)}
                      className="p-1 border rounded w-full"
                    >
                      <option value="Backlog">Backlog</option>
                      <option value="Todo">Todo</option>
                      <option value="Pending">Pending</option>
                      <option value="Done">Done</option>
                    </select>
                  ) : (
                    <span>{todo.label}</span>
                  )}
                </td>
                <td className="px-4 py-2 flex justify-end space-x-2">
                  {editingId === todo.id ? (
                    <button 
                      onClick={() => handleUpdate(todo.id)} 
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleEdit(todo)} 
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(todo.id)} 
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;
