import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const SignUpPage = () => {

  const navigate = useNavigate()

  const [username, setUsername] = React.useState("");
   const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
const username = formData.get("username")
const email = formData.get("email")
const password = formData.get("password")

console.log(username,email,password);

try {
  const res = await axios.post("http://localhost:8000/api/v1/auth/register",{
    username,email,password
  })
  console.log(res);
navigate('/login')
  

  setEmail("")
  setUsername("")
  setPassword("")
  
} catch (error) {
  console.log(error);
}

  }

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col lg:flex-row bg-gray-50">
      <form
onSubmit={handleSubmit}
       className="w-full lg:w-2/3 p-6 md:p-12 flex flex-col justify-center items-center space-y-6">

        <h1 className="text-3xl font-bold text-gray-800 mb-4">Create Account</h1>

        <input
          type="text"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          name='username'
          placeholder="Username"
          className="w-full max-w-md px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm transition duration-200"
        />

        <input
          type="email"
          name='email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Email"
          className="w-full max-w-md px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm transition duration-200"
        />

        <input
          type="password"
          name='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="Password"
          className="w-full max-w-md px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm transition duration-200"
        />

        <button
          type="submit"
          className="w-full max-w-md bg-amber-500 text-white font-semibold py-3 rounded-xl hover:bg-amber-600 transition duration-300 shadow-md"
        >
          Register
        </button>

        <p className='text-sm text-gray-600 mt-2'>
          Already have an account?{' '}
          <Link to="/login" className='text-amber-500 hover:underline'>
            Login
          </Link>
        </p>

      </form>

      <div className="w-full lg:w-1/3 bg-[rgb(252,245,243)] flex items-center justify-center overflow-hidden">
        <img src="/bg.png" alt="Modern Home" className="object-cover w-full h-full" />
      </div>
    </div>
  );
};

export default SignUpPage;
