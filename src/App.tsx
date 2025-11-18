import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Food from './pages/Food';
import Culture from './pages/Culture';
import Shopping from './pages/Shopping';
import Map from './pages/Map';
import Story from './pages/Story';
import AudioGuide from './pages/AudioGuide';
import Profile from './pages/Profile';
import Quests from './pages/Quests';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="food" element={<Food />} />
        <Route path="culture" element={<Culture />} />
        <Route path="shopping" element={<Shopping />} />
        <Route path="profile" element={<Profile />} />
        <Route path="quests" element={<Quests />} />
      </Route>
      <Route path="/map" element={<Map />} />
      <Route path="/story/:category/:id" element={<Story />} />
      <Route path="/audio-guide/:category/:id" element={<AudioGuide />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
