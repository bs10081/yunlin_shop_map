import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Food from './pages/Food';
import Culture from './pages/Culture';
import Shopping from './pages/Shopping';
import Story from './pages/Story';
import AudioGuide from './pages/AudioGuide';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="food" element={<Food />} />
        <Route path="culture" element={<Culture />} />
        <Route path="shopping" element={<Shopping />} />
      </Route>
      <Route path="/story/:category/:id" element={<Story />} />
      <Route path="/audio-guide/:category/:id" element={<AudioGuide />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
