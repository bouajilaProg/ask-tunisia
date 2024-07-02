"use client";

import React, { useContext, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import SignButton from "./SignButton";
import Link from "next/link";
import { toSearchContext } from "./MainApp";



function Header() {
  const {toSearch, settoSearch} = useContext(toSearchContext);
  
  return (
    <div className="navbar bg-red-600">
      <div className="flex-1">
        <Link href="/" className="text-white btn btn-ghost text-xl">
          Ask Tunisia
        </Link>
      </div>

      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          value={toSearch}
          placeholder=""
          className="input input-bordered w-full max-w-xs hover:shadow-lg"
          onChange={(e) => settoSearch(e.target.value)}
        />
        <div
          tabIndex={0}
          role="button"
          className="text-white btn btn-ghost btn-circle"
        >
          <div className="indicator">
            <Link href={ (toSearch)?`/search/${toSearch}`:"/"}>
              <IoSearchOutline className="h-8 w-8" />
            </Link>
          </div>
        </div>
      </form>

      <div
        tabIndex={0}
        role="button"
        className="text-white btn btn-ghost btn-circle"
      >
        <div className="indicator">
          <Link href="/new">
            <IoIosAddCircleOutline className="h-8 w-8" />
          </Link>
        </div>
      </div>

      <SignButton />
    </div>
  );
}

export default Header;
