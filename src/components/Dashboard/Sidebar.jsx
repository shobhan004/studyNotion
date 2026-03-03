import React, { useState } from 'react';
import { sidebarLinks } from '../../data/dashboardLinks';
import { useSelector, useDispatch } from 'react-redux';
import Content from './Content';
import { VscSettingsGear, VscSignOut } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../slices/authSlice';
import ConfirmationModal from './ConfirmationModal';
import { endpoints } from '../../services/apis';
import { apiConnector } from '../../services/apiconnector';

const Sidebar = () => {
  const [confirmationModal, setConfirmationModal] = useState(null);
  const { user } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (authLoading) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] min-w-[240px] items-center justify-center border-r border-gray-100 bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  const removeUser = async () => {
    try {
      const response = await apiConnector("POST", endpoints.SIGN_OUT, null);
      if (!response.data.success) throw new Error(response.data.message);
      
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setConfirmationModal(null); 
      dispatch(setToken(null));
      navigate("/login"); 
    } catch (err) {
      console.error(err);
      // Agar backend se error aaye toh bhi local storage clean kar do
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setConfirmationModal(null);
      dispatch(setToken(null));
      navigate("/login");
    }
  };

  return (
    <>
      {/* 🚀 Premium Light Theme Sidebar */}
      <div className="flex h-[calc(100vh-3.5rem)] min-w-[240px] flex-col border-r border-gray-100 bg-white py-8 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        
        {/* Main Links */}
        <div className="flex flex-col space-y-1 px-4">
          {sidebarLinks.map((link) => {
            // Agar link instructor ka hai aur user student hai, toh mat dikhao
            if (link.type && user?.accountType !== link.type) return null;
            return <Content key={link.id} link={link} />;
          })}
        </div>

        {/* Elegant Divider */}
        <div className="mx-auto my-6 h-[1px] w-10/12 bg-gray-100" />

        {/* Bottom Actions */}
        <div className="flex flex-col space-y-1 px-4">
          <Content link={{ name: "Settings", path: "/dashboard/settings", icon: "VscSettingsGear" }} />

          <button
            onClick={() => setConfirmationModal({
              text1: "Are you sure?",
              text2: "You will be logged out of your account.",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => removeUser(),
              btn2Handler: () => setConfirmationModal(null),
            })}
            className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-gray-500 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
          >
            <VscSignOut className="text-xl group-hover:-translate-x-1 transition-transform" />
            <span className="tracking-wide">Logout</span>
          </button>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default Sidebar;