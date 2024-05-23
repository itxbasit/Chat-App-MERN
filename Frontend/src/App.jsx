import { useEffect, useState } from 'react'
import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageLayout from './component/pageLayout';
import SignUp from './component/Home/SignUp';
import SignIn from './component/Home/SignIn/signIn';
import Home from './component/Home1/home';
import About from './component/About/about';
import Settings from './component/Setting/setting';
import Message from './component/Message/message';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie'
import axios from 'axios';
import Link from './Link';

function App() {
  const token = useSelector((state) => state.token.value) || Cookies.get('token');
  useEffect(() => {
    axios.put(`${Link}ActiveAt`, {}, {
      headers: {
        'token': token,
      }
    })
  })
  const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<PageLayout showNavbar={token ? true : false} />}>
      <Route path='/' element={token ? <Home /> : <SignUp />} />
      <Route path='/signIn' element={token ? <Home /> : <SignIn />} />
      <Route path='/about' element={token ? <About /> : <SignIn />} />
      <Route path='/setting' element={token ? <Settings /> : <SignIn />} />
      <Route path='/message' element={token ? <Message /> : <SignIn />} />
    </Route>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App
