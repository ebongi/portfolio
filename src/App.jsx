import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
