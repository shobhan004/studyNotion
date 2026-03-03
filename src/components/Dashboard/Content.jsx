import React from "react";
import { NavLink } from "react-router-dom";
import * as Icons from "react-icons/vsc";

const Content = ({ link }) => {
  const Icon = Icons[link.icon] || Icons[link.Iconname];

  if (!Icon) {
    console.warn(`Icon not found for: ${link.name}`);
    return null;
  }

  return (
    <NavLink
      to={link.path}
      className={({ isActive }) =>
        `relative flex items-center gap-3 px-8 py-3 text-sm font-bold transition-all duration-300 rounded-xl mx-2 ${
          isActive
            ? "bg-blue-50 text-blue-600" // Active: Soft blue background with vibrant blue text
            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900" // Idle: Grey text, soft grey hover
        }`
      }
    >
      {({ isActive }) => (
        <>
          {/* 🚀 Sleek Indicator Bar */}
          <span
            className={`absolute left-[-8px] top-1/4 h-1/2 w-[4px] rounded-r-full bg-blue-600 transition-all duration-300 ${
              isActive ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
            }`}
          ></span>

          {/* Icon with scaling effect on active */}
          <Icon className={`text-xl transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
          
          <p className="tracking-tight">{link.name}</p>
        </>
      )}
    </NavLink>
  );
};

export default Content;