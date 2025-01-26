import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerLanguage } from "@/utils/serverTranslation";

export const GET = handleAuth({
  login: async (req: NextApiRequest, res: NextApiResponse) => {
    const language = getServerLanguage();
    return handleLogin(req, res, {
      authorizationParams: {
        ui_locales: language,
      },
    });
  },
});
