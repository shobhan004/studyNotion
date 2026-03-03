import Loginform from "./Loginform";
import SignUpform from "./SignUpform";
import frame from "../../../assets/Images/frame.png";

function Templates({ title, desc1, desc2, image, formtype, setIsLoggedIn }) {
  return (
    <div className="relative w-full min-h-screen bg-white flex items-center justify-center pt-24 pb-20 overflow-hidden">
      
      {/* 1. GPU Optimized Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-0">
          <div className="absolute top-[-5%] left-[-5%] w-[35%] h-[35%] bg-blue-100/50 rounded-full blur-[120px] transform-gpu"></div>
          <div className="absolute bottom-[-5%] right-[-5%] w-[35%] h-[35%] bg-indigo-100/40 rounded-full blur-[120px] transform-gpu"></div>
      </div>

      {/* 2. Main Wrapper Card */}
      <div className="relative z-10 w-11/12 max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 px-4">
        
        {/* --- LEFT SIDE: TEXT & FORM --- */}
        <div className="w-full lg:w-[45%] flex flex-col gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              {title}
            </h1>
            <div className="space-y-1">
              <p className="text-lg text-slate-600 font-medium italic">
                {desc1}
              </p>
              <p className="text-blue-600 text-base font-bold italic">
                {desc2}
              </p>
            </div>
          </div>

          {/* Form Injection */}
          <div className="w-full">
            {formtype === "SignUp" ? (
              <SignUpform />
            ) : (
              <Loginform setIsLoggedIn={setIsLoggedIn} />
            )}
          </div>
        </div>

        {/* --- RIGHT SIDE: PREMIUM IMAGE STACK --- */}
        <div className="relative w-full lg:w-[50%] flex justify-center lg:justify-end mt-12 lg:mt-0">
          <div className="relative w-[300px] sm:w-[450px] aspect-square transform-gpu">
            
            {/* The Frame (Bottom Layer) */}
            <img 
              src={frame} 
              alt="pattern-frame" 
              className="absolute top-4 left-4 w-full h-full object-contain z-10 opacity-80"
              loading="lazy"
            />
            
            {/* The Main Hero Image (Top Layer) */}
            <img 
              src={image} 
              alt="auth-visual" 
              className="absolute top-0 left-0 w-full h-full object-cover z-20 rounded-2xl shadow-2xl shadow-slate-900/10 hover:-translate-y-2 hover:-translate-x-2 transition-transform duration-500"
              loading="lazy"
            />

            {/* Subtle Glow behind images */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-400/20 to-indigo-500/20 blur-2xl rounded-full -z-0"></div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Templates;