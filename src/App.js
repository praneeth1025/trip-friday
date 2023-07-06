import {BrowserRouter as Router ,Routes,Route} from "react-router-dom"
import UserList from "./components/UserList/UserList";
import UserDetails from "./components/UserDetails/UserDetails";
import UserPhotos from "./components/UserDetails/UserPhotos";


function App() {
  return (
    <Router>

      <Routes>
       <Route  path ="/" element ={<UserList />}></Route>
       <Route  path ="/users/:userId" element ={<UserDetails />}></Route>
       <Route  path ="/albums/:id/photos" element ={<UserPhotos />}></Route>
      </Routes> 
    </Router>
  );
}

export default App;
