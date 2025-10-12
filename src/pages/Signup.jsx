import girls from '../assets/Images/signup.webp'
import Templates from '../components/core/auth/Templates'
function SignUp(){
return(
  <Templates  title = "Join the millions learning to code with StudyNotion for free"
   desc1 = "Build skills for today, tomorrow, and beyond."
    desc2 ="Education to future-proof your career."
    image = {girls} 
    formtype = "SignUp"
  >
  </Templates>
)
}


export default SignUp;