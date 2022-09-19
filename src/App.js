
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import Book from './Book';
import WriteBook from './WriteBook';
import ListWrittenBooks from './ListWrittenBooks';
import CreateBook from './CreateBook';
import EditBook from './EditBook';
import FilterBooks from './FilterBooks';
import UpdateProfile from './UpdateProfile';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<FilterBooks />} />
          <Route path="/book/:bookId/chapter/:chapterId" element={<Book />} />
          <Route path="/write/:bookId/chapter/:chapterId" element={<WriteBook />} />
          <Route path="/edit/:bookId" element={<EditBook />} />
          <Route path="/dashboard" element={<ListWrittenBooks />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/update-profile" element={<UpdateProfile/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
