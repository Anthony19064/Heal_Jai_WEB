import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import App from './app.jsx'
import Profile from './profile.jsx'
import Login from './login.jsx'
import Regis from './regis.jsx'
import Contractus from './contractus.jsx'
import Community from './community.jsx'
import Chat from './Chat.jsx'
import ChatUser from '../component/ChatUser.jsx'
import ChatAi from '../component/ChatAi.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { ToastContainer } from 'react-toastify';




let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },

  {
    path: "/profile/:username",
    Component: Profile,
  },

  {
    path: "/login",
    Component: Login,
  },

  {
    path: "/regis",
    Component: Regis,
  },

  {
    path: "/contractus",
    Component: Contractus
  },

  {
    path: "/commu",
    Component: Community
  },

  {
    path: "/chat",
    Component: Chat
  },

  {
    path: "/chatWithUser",
    Component: ChatUser
  },

  {
    path: "/chatWithAi",
    Component: ChatAi
  },


]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-center"
      autoClose={2000}
      closeButton={false}
      toastClassName="custom-toast"
      icon={false}
    />
  </StrictMode>,
)
