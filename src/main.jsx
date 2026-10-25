import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import MyTasks from './pages/MyTasks/MyTasks.jsx'
import Calendar from './pages/Calendar/Calendar.jsx'
import Statistics from './pages/Stats/Statistics.jsx'
import Profile from './pages/Others/Profile.jsx'
import Settings from './pages/Others/Settings.jsx'
import Edgecase from './components/Others/Edgecase.jsx'

// Context Providers
import { ToastProvider } from "./components/Others/ToastContext.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";
import { QuoteProvider } from "./context/QuoteContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="tasks" element={<MyTasks />} />
      <Route path="calendar" element={<Calendar />} />
      <Route path="statistics" element={<Statistics />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
      <Route path="*" element={<Edgecase />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <TaskProvider>
        <QuoteProvider>
          <RouterProvider router={router} />
        </QuoteProvider>
      </TaskProvider>
    </ToastProvider>
  </React.StrictMode>,
)