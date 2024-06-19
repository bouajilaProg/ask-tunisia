"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function SignButton() {
  const {data} = useSession();
  if (data?.user) {
    return (
      <div className="text-white text-semibold text-xl">
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  } else {
    return (
        <div className="text-white text-semibold text-xl">
            <Link href="/api/auth/signin">Sign in</Link>
        </div>
    );
  }
}

export default SignButton;
