
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
import { w3_close, w3_open } from './utils/w3utils';

function App() {

  return (
    <>
      {/* Sidebar menu */}
      <nav className="w3-sidebar w3-collapse w3-white w3-animate-left" style={{ zIndex: '3', width: '300px' }} id="mySidebar"><br />
        <div className="w3-container">
          <a href="#" onClick={w3_close} className="w3-hide-large w3-right w3-jumbo w3-padding w3-hover-grey" title="close menu">
            <i className="fa fa-remove"></i>
          </a>
          <a href="/"><img src="/img/logo.png" style={{ width: '45%' }} className="w3-round" /></a><br /><br />
          <a href="/"><h4><b>BOOK CLUB</b></h4></a>
          <p className="w3-text-grey">Website by: <a href="https://www.polinatik.com/">Polina Tikhomirova</a></p>
        </div>
        <div className="w3-bar-block">
          <a href="/" id="readingHeaderLink" onClick={w3_close} className="w3-bar-item w3-button w3-padding"><i className="fa fa-th-large fa-fw w3-margin-right"></i>READ</a>
          <a href="/dashboard" id="writingHeaderLink" onClick={w3_close} className="w3-bar-item w3-button w3-padding"><i className="fa fa-user fa-fw w3-margin-right"></i>WRITE</a>
          <a href="/update-profile" id="profileHeaderLink" onClick={w3_close} className="w3-bar-item w3-button w3-padding"><i className="fa fa-envelope fa-fw w3-margin-right"></i>PROFILE</a>
        </div>
      </nav>

      {/* Overlay effect for small screens */}
      <div className="w3-overlay w3-hide-large w3-animate-opacity" onClick={w3_close} style={{ cursor: 'pointer' }} title="close side menu" id="myOverlay"></div>

      {/* Page content */}
      <div className="w3-main" style={{ marginLeft: '300px' }}>
        { /* Header */}
        <header>
          <span className="w3-button w3-hide-large w3-xxlarge w3-hover-text-grey" onClick={w3_open} ><i className="fa fa-bars"></i></span>
          <div className="w3-container">
            <div></div>
            <h1><b>Book Club</b></h1>
            <div className="w3-section w3-bottombar"></div>
          </div>
        </header>

        <div>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<FilterBooks />} />
              <Route path="/book/:bookId/chapter/:chapterId" element={<Book />} />
              <Route path="/write/:bookId/chapter/:chapterId" element={<WriteBook />} />
              <Route path="/edit/:bookId" element={<EditBook />} />
              <Route path="/dashboard" element={<ListWrittenBooks />} />
              <Route path="/create-book" element={<CreateBook />} />
              <Route path="/update-profile" element={<UpdateProfile />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>

  );
}

export default App;
