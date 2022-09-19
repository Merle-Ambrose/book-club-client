
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Test from './Test';
import Login from './Login';
import Register from './Register';
import Book from './Book';
import Temp from './Temp';
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
          <Route path="/login" element={<Login />} />
          <Route path="/temp" element={<Temp />} />
          <Route path="/test" element={<Test />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
