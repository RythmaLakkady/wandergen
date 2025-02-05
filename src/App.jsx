import { StrictMode } from 'react';
import { Outlet } from 'react-router-dom'; // Used for rendering route-specific components
import Header from './components/ui/custom/Header';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <div>
      <Header />
      <Toaster />
      <Outlet />
    </div>
  );
}

export default App;
