import { HashRouter, Route, Routes } from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './pages/Home';
import TodoPage from './pages/TodoPage';
import IdeaPage from './pages/IdeaPage';

const App = () => {
  return (
    <HashRouter>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/ideas" element={<IdeaPage />} />
        </Routes>
      </div>
      </HashRouter>
    );
};

export default App;
