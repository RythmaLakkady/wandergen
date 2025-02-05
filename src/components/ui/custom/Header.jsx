import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from "../../../firebase";  

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ? currentUser : null);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.error("Error logging out:", err.message);
    }
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <Link to={'/'}>
        <img src="/logo.svg" alt="WanderGen Logo" className="h-16 w-16" />
      </Link>

      <div className='flex flex-row gap-3 items-center'>
        {user ? (
          <>
            <Button 
              onClick={handleSignOut} 
              className="text-sm px-4 py-2 bg-[#fd9c7e] text-white hover:bg-[#dd8267]"
            >
              Sign Out
            </Button>

            <Link to={'/profile'} className='flex items-center'>
              <img src="/profile.svg" alt="Profile Icon" className="h-16 w-16 rounded-full hover:shadow-lg shadow-[#7AB9B3]" />
            </Link>
          </>
        ) : (
          <Link to={'/signIn'} className='flex items-center'>
            <Button className="text-sm px-4 py-2 bg-[#7AB9B3] text-white hover:bg-[#66a19b]">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
