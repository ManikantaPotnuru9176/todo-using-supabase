import React from "react";

const NavbarSimple = () => {
  return (
    <div className="navbar bg-base-100 px-2 md:px-10 lg:px-28 sticky top-0 z-20 bg-opacity-80">
      <div className="flex-1">
        <a className="link link-hover text-2xl font-bold" href="/">
          TODO
        </a>
      </div>
      <a className="btn btn-neutral btn-outline px-6" href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          fill="currentColor"
          className="mr-3"
          viewBox="0 0 24 24"
        >
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        </svg>
        Home
      </a>
    </div>
  );
};

export default NavbarSimple;
