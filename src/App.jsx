import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Timeline from './pages/Timeline.jsx';
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
