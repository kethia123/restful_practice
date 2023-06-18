import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AppServices from '../services';
import logo from '../assets/images/logo.png';
import '../assets/scss/login.scss';
import {
  loadUser,
  selectIsLoggedIn,
} from '../store/modules/authSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    } else {
      dispatch(loadUser());
    }
  }, [isLoggedIn, dispatch, navigate]);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (submitted) return;
    setSubmitted(true);

    toast.promise(
      AppServices.login({ email, password }),
      {
        loading: 'Logging in ...',
        success: (response) => {
          if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
            dispatch(loadUser());
          }
          navigate('/');
          setSubmitted(false);
          return 'Logged in successfully';
        },
        error: (error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setSubmitted(false);
          return message;
        },
      }
    );
  };

  return (
    <div className="bg-primary h-screen flex justify-center">
      <div className="form bg-main flex max-w-md w-screen h-max justify-center p-8 m-auto">
        <form className="text-center" onSubmit={handleLogin}>
          {/* <img src={logo} className="mb-9 mx-auto" alt="" /> */}
          <div className="title mb-8">
          <div className="title mb-8">Login</div>
            <div className="small">User Management System</div>
          </div>
          <div className="input-container  mb-8">
            <input
              onChange={onChangeEmail}
              className="bg"
              placeholder="email"
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="input-container  mb-8">
            <input
              onChange={onChangePassword}
              className="bg"
              placeholder="password"
              type="password"
              name=""
              id=""
            />
          </div>
          <div className="input-container  mb-8">
            <input
              className="submit bg-primary text-main cursor-pointer"
              type="submit"
              value="submit"
            />
          </div>
          <div className="input-container  mb-8 text-primary cursor-pointer" onClick={() => {navigate('/signup')}}>
            Don't have an account? Signup
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
