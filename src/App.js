import './App.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Homepage from './views/Homepage';
import BugsPage from './views/BugsPage'
import Songs from './views/Songs'
import SeacreaturesPage from './views/SeacreaturesPage';
import Aos from 'aos';
import AboutPage from './views/About';

function App() {
  Aos.init() 
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/bugs" element={<BugsPage/>}/>
      <Route path="/songs" element={<Songs/>}/>
      <Route path="/seacreatures" element={<SeacreaturesPage/>}/>
      <Route path="/villagers" element={<Homepage/>}/>
      <Route path="/about" element={<AboutPage/>}/>
    </Routes>
    </Router>
  );
}

export default App;
