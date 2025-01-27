"use client";

import React from "react";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import { gql, useQuery } from "@apollo/client";
import { useTranslation } from "@/hooks/useTranslation";
import { Language } from "@/entities/Recipe";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { data, loading } = useQuery(USER_INFO_QUERY, {
    skip: !user,
  });
  const { language } = useLanguage();
  const { t } = useTranslation();

  if (isLoading || loading) {
    return (
      <div className="text-[mediumslateblue] italic mb-4">{t("loading")}</div>
    );
  }

  if (!user) {
    return (
      <div>
        <a
          href="/api/auth/login"
          className="text-red-600 underline text-center font-comic italic"
        >
          {t("login")}
        </a>{" "}
      </div>
    );
  }

  return (
    <div>
      <div className="text-[mediumslateblue] italic mb-4">
        {t("loggedInAs").replace(
          "{name}",
          getName(user, language) || user.email || ""
        )}
        {data?.userInfo?.isAdmin && <span> ({t("adminPanel")})</span>} (
        <a
          href="/api/auth/logout"
          className="text-red-600 underline text-center font-comic italic"
        >
          {t("logout")}
        </a>
        )
      </div>
    </div>
  );
};

const getName = (user: UserProfile, language: Language) => {
  if (user.name) {
    if (language === "ja") {
      return user.name + "さん";
    }
    return user.name;
  }
  return "";
};

export default Profile;
