import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "next-auth/react";

async function header() {
  
  const user = await getCurrentUser();
  console.log(user);
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

      {/*<div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle text-white"
        >
          <div className="indicator">
            <MdSearch className="h-8 w-8" />
          </div>
        </div>
        <div
          tabIndex={0}
          className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
        >
          <div className="card-body border-base-200 border-solid border rounded-xl">
            <span className="font-bold text-lg">8 Items</span>
            <span className="text-info">Subtotal: $999</span>
            <div className="card-actions">
              <button className="btn btn-primary btn-block">View cart</button>
            </div>
          </div>
        </div>
      </div>
*/}
      {user?.email ? (
        /*
        <div className="login-part">
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <IoIosNotifications className="h-8 w-8 text-white" />
                  <span className=" badge badge-sm indicator-item">8</span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body  border-base-200 border-solid border rounded-xl">
                  <span className="font-bold text-lg">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>*/
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <Link href="/api/auth/signin">
                  <MdAccountCircle className="h-10 w-10 text-white" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button className="btn btn-primary btn-ghost text-white text-2xl text-bold"> sign in</button>
      )}
    </div>
  );
}

export default header;
