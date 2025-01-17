"use client";

import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
const Profile = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="text-[mediumslateblue] italic mb-4">Loading ...</div>
    );
  }

  if (!user) {
    return (
      <div>
        <a
          href="/api/auth/login"
          className="text-red-600 hover:underline text-center font-comic italic"
        >
          Effettua il login
        </a>{" "}
      </div>
    );
  }

  return (
    <div>
      <div className="text-[mediumslateblue] italic mb-4">
        Logged in come {user.name} (
        <a
          href="/api/auth/logout"
          className="text-red-600 hover:underline text-center font-comic italic"
        >
          logout
        </a>
        )
      </div>
    </div>
  );
};

export default Profile;
