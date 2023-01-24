import './App.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Homepage from './views/Homepage';
import Singlevillager from './views/Singlevillager';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/:villagers" element={<Homepage/>}/>
      <Route path="/villagers/filters/:filterQ" element={<Homepage/>}/>
      <Route path="/singlevillager" element={<Singlevillager/>}/>
    </Routes>
    </Router>
  );
}

export default App;
