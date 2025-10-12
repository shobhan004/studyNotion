// src/components/Content.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import * as Icons from "react-icons/vsc";

const Content = ({ link }) => {
  const Icon = Icons[link.icon];

  if (!Icon) {
    console.warn(`Icon "${link.icon}" not found!`);
    return null;
  }

  return (
    <NavLink
      to={link.path}
      className={({ isActive }) => `flex gap-1 items-center px-3 py-3 rounded-full ${isActive ? "bg-zinc-700 text-white" : ""}`}
    >
      <Icon className="text-2xl" />
      <p>{link.name}</p>
    </NavLink>
  );
};

export default Content;
