import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // 🚀 useSelector add kiya
import { apiConnector } from '../../services/apiconnector';
import { courseEndpoints, endpoints } from '../../services/apis';
import { setToken } from '../../slices/authSlice';

// Icons Import
import { CiUser, CiSettings } from "react-icons/ci";
import { IoBookSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { VscDashboard } from "react-icons/vsc"; // 🚀 Dashboard icon add kiya

const ProfileDropDown = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // 🚀 Redux se token aur user data nikal liya
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile); 

    const removeUser = async () => {
        const { SIGN_OUT } = endpoints;
        try {
            const response = await apiConnector("POST", SIGN_OUT, null);
            if (!response.data.success) {
                throw new Error(response.data.message);
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                dispatch(setToken(null));
                navigate("/login");
            }
        } catch (err) {
            console.log(err);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            dispatch(setToken(null));
            navigate("/login");
        }
    }

    const getUsername = async () => {
        const { GET_IMAGE_LETTER } = courseEndpoints;
        try {
            const response = await apiConnector("GET", GET_IMAGE_LETTER, null, {
                Authorization: `Bearer ${token}`
            });
            if (response.data.success) {
                setName(response?.data?.username);
            }
        } catch (err) {
            console.log("Error fetching username:", err);
        }
    }

    useEffect(() => {
        if (token && !user?.firstName) {
            getUsername();
        }
    }, [token, user]);

    // Display Name Logic (Redux first, then API fallback)
    const displayName = user?.firstName ? `${user.firstName} ${user.lastName || ''}` : name;

    return (
        <div className='relative group cursor-pointer'>    
            
            {/* 🚀 Avatar with Hover Ring Effect */}
            <div className="flex items-center justify-center rounded-full bg-gray-50 border-2 border-transparent group-hover:border-blue-500 transition-all duration-300 p-[2px]">
                <img 
                    src={user?.image || `https://api.dicebear.com/7.x/initials/svg?seed=${displayName || 'User'}`} 
                    alt="avatar" 
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover shadow-sm"
                />
            </div>

            {/* 🚀 Modern Dropdown Menu */}
            <div className="invisible opacity-0 translate-y-3 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 absolute z-50 right-0 top-[115%] w-[240px] transition-all duration-300 ease-out">
                
                {/* Little Up Arrow (Pointer) */}
                <div className="absolute -top-2 right-4 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100 rounded-sm"></div>
                
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative z-10 py-2">
                    
                    {/* Header Section */}
                    <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                        <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                            Welcome back
                        </p>
                        <p className="text-sm font-bold text-gray-900 truncate mt-0.5">
                            {displayName || 'User'}
                        </p>
                        {/* 🚀 Role Badge */}
                        <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md ${user?.accountType === "Instructor" ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                            {user?.accountType || "Student"}
                        </span>
                    </div>

                    <ul className='flex flex-col mt-1'>
                        
                        {/* 🚀 Conditional: Instructor Dashboard (Only for Instructors) */}
                        {user?.accountType === "Instructor" && (
                            <li 
                                onClick={() => navigate("/dashboard/instructor")}
                                className='group/item px-4 py-2.5 flex items-center gap-3 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors'
                            > 
                                <VscDashboard className="text-xl text-gray-400 group-hover/item:text-blue-600 transition-colors" />
                                Dashboard
                            </li>
                        )}

                        {/* Profile */}
                        <li 
                            onClick={() => navigate("/dashboard/my-profile")}
                            className='group/item px-4 py-2.5 flex items-center gap-3 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors'
                        > 
                            <CiUser className="text-xl text-gray-400 group-hover/item:text-blue-600 transition-colors" />
                            My Profile
                        </li>

                        {/* 🚀 Dynamic Text/Route based on Role */}
                        <li 
                            onClick={() => navigate(user?.accountType === "Instructor" ? "/dashboard/my-courses" : "/dashboard/enrolled-courses")}
                            className='group/item px-4 py-2.5 flex items-center gap-3 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors'
                        > 
                            <IoBookSharp className="text-lg text-gray-400 group-hover/item:text-blue-600 transition-colors" />
                            {user?.accountType === "Instructor" ? "My Courses" : "Enrolled Courses"}
                        </li>

                        {/* Settings */}
                        <li 
                            onClick={() => navigate("/dashboard/settings")}
                            className='group/item px-4 py-2.5 flex items-center gap-3 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors'
                        > 
                            <CiSettings className="text-xl text-gray-400 group-hover/item:text-blue-600 transition-colors" />
                            Account Settings
                        </li>

                        <div className="h-[1px] bg-gray-100 my-1 mx-4"></div> {/* Divider */}

                        {/* Sign Out */}
                        <li 
                            onClick={() => removeUser()}
                            className='group/item px-4 py-2.5 flex items-center gap-3 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors'
                        >
                            <IoIosLogOut className="text-xl text-gray-400 group-hover/item:text-red-500 transition-colors" />
                            Sign Out
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProfileDropDown;