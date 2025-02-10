import { Link } from 'react-router-dom';

const TaskListNavbar = () => {
  return (
    <nav className="p-4 bg-gray-800 text-white">
      <ul className="flex space-x-4">
        <li><Link to="backlog">Backlog</Link></li>
        <li><Link to="todo">Todo</Link></li>
        <li><Link to="pending">Pending</Link></li>
        <li><Link to="done">Done</Link></li>

      </ul>
    </nav>
  );
};

export default TaskListNavbar;
