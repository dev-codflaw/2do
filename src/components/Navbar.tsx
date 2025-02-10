import { Link } from 'react-router-dom';

const Navbar = () => {
  return (

<nav className="p-4 bg-gradient-to-r from-sky-600 to-cyan-800 text-white fixed top-0 left-0 w-full z-50 shadow-md">
  <ul className="flex justify-center space-x-8">
    {['Home', 'Todo', 'Ideas'].map((item, index) => (
      <li key={index} className="relative group">
        <Link to={`/${item.toLowerCase()}`} className="px-3 py-2 text-lg">
          {item}
          <span className="absolute left-0 bottom-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </li>
    ))}
  </ul>
</nav>

  );
};

export default Navbar;
