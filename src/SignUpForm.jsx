import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';  
import { createUserWithEmailAndPassword } from "firebase/auth";  
import { toast } from 'sonner';

function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            toast("Account created successfully!");
            navigate('/');
        } catch (err) {
            toast("Error creating account");
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='w-1/3 h-[500px] p-10 border rounded-lg shadow-lg shadow-[#7AB9B3] flex flex-col justify-center'>
                <h2 className='text-3xl font-serif font-semibold text-[#7AB9B3] my-7 text-center'>Create your account and start your journey!</h2>
                <form onSubmit={onSubmit}>
                    <div>
                        <label className='font-serif text-xl'> Email: </label>
                        <Input className='text-center mt-2' type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='mt-8'>
                        <label className='font-serif text-xl'> Password: </label>
                        <Input className='text-center mt-2' type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className='mt-10 flex flex-col items-center'>
                        <Button className="py-2 px-6 bg-[#7AB9B3] text-white rounded hover:bg-[#66a19b]" type="submit">Sign Up</Button>
                    </div>
                    <p className='mt-5 flex flex-col items-center font-serif'>
                        Already a member?
                        <strong>
                            <Link to={'/login'} className='text-[#fd9c7e] font-semibold underline hover:text-[#db7e62]'>Log in</Link>
                        </strong>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignUpForm;
