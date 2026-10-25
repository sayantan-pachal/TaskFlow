import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import MyTasks from './Pages/MyTasks/MyTasks.jsx'
import Calendar from './Pages/Calendar/Calendar.jsx'
import { ToastProvider } from "./components/Others/ToastContext.jsx";
import Edgecase from './components/Others/Edgecase.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="tasks" element={<MyTasks />} />
      <Route path="calendar" element={<Calendar />} />
      <Route path="*" element={<Edgecase />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </React.StrictMode>,
)