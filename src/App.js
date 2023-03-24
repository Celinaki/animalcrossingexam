import './App.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Homepage from './views/Homepage';
import Songs from './views/Songs'
import Singlevillager from './views/Singlevillager';
import QueryPage from './views/QueryPage';
import SeacreaturesPage from './views/SeacreaturesPage';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/home" element={<QueryPage/>}/>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/songs" element={<Songs/>}/>
      <Route path="/seacreatures" element={<SeacreaturesPage/>}/>
      <Route path="/:villagers" element={<Homepage/>}/>
      <Route path="/villagers/filters/:filterQ" element={<Homepage/>}/>
      <Route path="/singlevillager" element={<Singlevillager/>}/>
    </Routes>
    </Router>
  );
}

export default App;
