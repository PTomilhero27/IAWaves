import ky from "ky";
import { env } from "../constants/env.mjs";
import { getToken } from "../lib/token";

export const iaWaves = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 180000,
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = getToken();
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});
