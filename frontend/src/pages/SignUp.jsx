import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AppServices from '../services';
import { useNavigate } from 'react-router-dom';
// import Modal from '../components/Modal';
// import logo from '../assets/images/logo.png';
import '../assets/scss/signup.scss';

function SignUp() {
  const [admin, setAdmin] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

//   const toggleModal = () => {
//     // Implement your modal toggle logic here
//   };

  const handleRegister = (e) => {
    e.preventDefault();

    if (admin.password !== admin.confirmPassword)
      return toast.error('Passwords should match');

    if (submitted) return;
    setSubmitted(true);
    navigate('/login');

    toast.promise(AppServices.register({ ...admin, confirmPassword: undefined }), {
      loading: 'Registering ...',
      success: () => {
        // toggleModal();
        setSubmitted(false);
        return 'Registered successfully';
      },
      error: (error) => {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        setSubmitted(false);
        if (message.includes('required pattern')) {
          if (message.includes('phone')) return 'Invalid phone number';
          else return 'Invalid national ID';
        }
        return message;
      },
    });
  };

  return (
    <div className="bg-primary h-screen flex justify-center overflow-y-auto">
      <div className="form bg-main flex max-w-md w-screen h-max justify-center p-8 m-auto">
        <form>
          {/* <img src={logo} className="mb-9 mx-auto" alt="" /> */}
          <div className="title mb-8">Signup</div>
          <div className="grid">
          <div className="input-container mb-8">
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
              Names
            </label>
            <input
              onChange={(e) => {
                setAdmin({ ...admin, names: e.target.value || '' });
              }}
              type="text"
              id="first-name"
              className="bg mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div className="input-container mb-8">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              onChange={(e) => {
                setAdmin({ ...admin, email: e.target.value || '' });
              }}
              type="email"
              id="email"
              className="bg mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div className="input-container mb-8">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              onChange={(e) => {
                setAdmin({ ...admin, phone: e.target.value || '' });
              }}
              type="text"
              id="phone"
              className="bg mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div className="input-container mb-8">
            <label htmlFor="nid" className="block text-sm font-medium text-gray-700">
              National ID
            </label>
            <input
              onChange={(e) => {
                setAdmin({ ...admin, nationalId: e.target.value || '' });
              }}
              type="string"
              id="nid"
              className="bg mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div className="input-container mb-8">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              onChange={(e) => {
                setAdmin({ ...admin, password: e.target.value || '' });
              }}
              type="password"
              id="password"
              className="bg mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div className="input-container mb-8">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              onChange={(e) => {
                setAdmin({ ...admin, confirmPassword: e.target.value || '' });
              }}
              type="password"
              id="confirmPassword"
              className="bg mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div className="input-container  mb-8">
            <input
              className="submit bg-primary text-main cursor-pointer"
              type="submit"
              value="submit"
              onClick={handleRegister}
            />
            </div>

          <div className="input-container  mb-8 text-primary cursor-pointer" onClick={() => {navigate('/login')}}>
            Already have an account? Login
          </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
