import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import CreateTrip from './createTrip';
import SignUpForm from './SignUpForm';
import LoginPage from './LoginPage';
import Profile from './Profile';
import Hero from './components/ui/custom/Dashboard';  // Assuming Hero is a component
import ViewTrip from './view-trip/tripId';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,  
    children: [
      {
        path: '/',
        element: <Hero />  
      },
      {
        path: '/createTrip',
        element: <CreateTrip />,
      },
      {
        path: '/signIn',
        element: <SignUpForm />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/view-trip/:tripId',
        element: <ViewTrip />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
