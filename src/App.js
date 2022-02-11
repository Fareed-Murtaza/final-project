import { BrowserRouter, Route, Routes } from 'react-router-dom'

import CreatePost from './screens/create-post';
import EditPost from './screens/edit-post';
import Header from './components/header';
import Home from './screens/home';
import MyPosts from './screens/my-posts';
import Signin from './screens/signin';
import SignUp from './screens/signup';
import ViewPost from './screens/view-post';


const App = () => {
  return <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/my' element={<MyPosts />} />
        <Route exact path='/new' element={<CreatePost />} />
        <Route exact path='/posts/:id' element={<ViewPost />} />
        <Route exact path='/posts/edit/:id' element={<EditPost />} />
        <Route exact path='/signin' element={<Signin />} />
        <Route exact path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App;
