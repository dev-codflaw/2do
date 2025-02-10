import { useEffect, useState } from 'react';
import { getAllItems, deleteItem, updateItem } from '../../utils/indexedDB';
import { useParams } from 'react-router-dom';

const ListItem = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const { label } = useParams<{ label: string }>();

  const fetchTodos = async () => {
    const allTodos = await getAllItems('todos');
    const filteredTodos = allTodos.filter(
        todo => todo.label.toLowerCase() === label?.toLowerCase());
    console.log(label)

    setTodos(filteredTodos);
  };

  useEffect(() => {
    fetchTodos();
  }, [label]);

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
    await updateItem('todos', updatedTodo);
    fetchTodos();
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} className="flex justify-between p-2 border">
          <span
            onClick={() => handleToggle(todo)}
            className={todo.completed ? 'line-through' : ''}
          >
            {todo.task}
          </span>
          <span>
            {todo.creationDate}{todo.label}
          </span>
          {todo.completed && <span>Completed: {todo.completionDate}</span>}
          <button onClick={() => handleDelete(todo.id)} className="text-red-500">Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ListItem;
