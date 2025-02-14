import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ModelBuilder from './Components/modelBuilder.tsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/builder" element={<ModelBuilder />} />
      </Routes>
    </Router>
  );
};

export default App;
