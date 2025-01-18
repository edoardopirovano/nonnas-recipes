"use client";

import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { gql, useQuery } from "@apollo/client";

const USER_INFO_QUERY = gql`
  query UserInfo {
    userInfo {
      id
      isAdmin
    }
  }
`;

const Profile = () => {
  const { user, isLoading } = useUser();
  const { data } = useQuery(USER_INFO_QUERY);

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
          className="text-red-600 underline text-center font-comic italic"
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
          className="text-red-600 underline text-center font-comic italic"
        >
          logout
        </a>
        )
        {data?.userInfo?.isAdmin && (
          <span>
            {" "}
            (
            <a
              href="/admin"
              className="text-red-600 underline text-center font-comic italic"
            >
              admin
            </a>
            )
          </span>
        )}
      </div>
    </div>
  );
};

export default Profile;
