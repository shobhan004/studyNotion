import Templates from '../components/core/auth/Templates';
import single from '../assets/Images/login.webp'
 const Login = ({ isloggedin , setIsLoggedIn}) =>{
return(
  <Templates
  title ="Welcome Back"
  desc1 = "Build skills for today, tomorrow, and beyond."
  desc2 = " Education to future-proof your career."
  image = {single}
  formtype ="Login"
  status = {setIsLoggedIn}
  >

  </Templates>
)
}

export default Login;