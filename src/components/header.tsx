"use client";

import React from "react";

import { IoIosAddCircleOutline } from "react-icons/io";
import SignButton from "./SignButton";
import Link from "next/link";

function header() {
  return (
    <div className="navbar bg-red-600">
      <div className="flex-1">
        <Link href="/" className="text-white btn btn-ghost text-xl">
          Ask Tunisia
        </Link>
      </div>

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

export default header;
