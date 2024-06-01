import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/home-page.js';
import { NavigationBar } from './components/NavigationBar';
import CollectionList from './pages/CollectionList';
import Collection from './pages/Collection';
import ProfilePage from './pages/Profile-page';
import ClassesPage from './pages/ClassesPage';
import ClassPage from './pages/ClassPage';

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/classes/:classID" element={<ClassPage />} />
          <Route path="/collections" element={<CollectionList />} />
          <Route path="/collections/:collectionName" element={<Collection />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
