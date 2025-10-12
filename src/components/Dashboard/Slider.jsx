import React, { useState } from 'react';
import { sidebarLinks } from '../../data/dashboardLinks';
import { useSelector, useDispatch } from 'react-redux';
import Content from './Content';
import { VscSettingsGear } from "react-icons/vsc";
import { PiSignOut } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../slices/authSlice';
import ConfirmationModal from './ConfirmationModal';
import {  endpoints } from '../../services/apis.jsx';
import {apiConnector} from '../../services/apiconnector.jsx';
import '../../App.css';

const Slider = () => {
  const [confirmationModal, setConfirmationModal] = useState(null);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeUser = async () => {
    try {
      const response = await apiConnector("POST", endpoints.SIGN_OUT, null);
      if (!response.data.success) throw new Error(response.data.message);
      localStorage.removeItem("token");
      setConfirmationModal(null); 
      dispatch(setToken(null));

      setTimeout(() => {
        navigate("/login"); 
      }, 50);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='w-[200px] slidebar min-h-screen flex flex-col gap-11 pt-24 px-4 bg-zinc-200'>
      {sidebarLinks.map((link) => {
       
        return <Content key={link.id} link={link} Iconname={link.icon} />;
      })}

      <div>
        <Content link={{ name: "Settings", path: "/dashboard/settings" }} Iconname={"VscSettingsGear"} />
      </div>

      <button
        className='flex items-center gap-3 text-pink-500'
        onClick={() => {
          setConfirmationModal({
            text1: "Are You Sure?",
            text2: "You will be logged out from your account.",
            onConfirm: removeUser,
          });
        }}
      >
        <span className='text-2xl'><PiSignOut /></span>
        <p>Log Out</p>
      </button>

      {confirmationModal && (
        <ConfirmationModal
          modalData={confirmationModal}
          setConfirmationModal={setConfirmationModal}
        />
      )}
    </div>
  );
};

export default Slider;
