import Loginform from "./Loginform";
import SignUpform from "./SignUpform";
import frame from "../../../assets/Images/frame.png";

function Templates({title ,desc1 , desc2, image ,formtype ,setIsLoggedIn }){
return(

    <div className="w-full flex justify-evenly min-h-screen overflow-y-hidden pt-28 pb-14 ">
    <div className="flex gap-32 bg-zinc-200 p-12 rounded-lg">
       {/* topic*/}
        <div className="max-w-[490px] flex flex-col gap-5">
        <div><h1 className="text-zinc-800 text-[3rem] font-semibold font-montserrat mt-9">{title}</h1></div>
        <div>
        <p className="text-gray-700 text-[20px] font-medium">{desc1}</p>
         <p className="text-gray-700 text-[16px] font-medium">{desc2}</p>
         </div>
         {
            formtype === "SignUp" ? (<SignUpform></SignUpform>) : (<Loginform setIsLoggedIn = {setIsLoggedIn}></Loginform>)
         }
        </div>
        {/* image */}
       
        <div className=" mt-16 flex flex-col  relative w-[500px]">
        <img src={image} className="w-[450px] h-[450px ] absolute z-20" ></img>
        <img src={frame} className=" w-[450px] h-[450px ] absolute z-10 right-9 top-3.5"></img>
        </div>
    </div>
       
    </div>
   
)

}

export default Templates;