// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { postData } from "@/functions/postData";
import type { NextApiRequest, NextApiResponse } from "next";

import nbApartment from "../../data/nbApartment.json";
import filter from "../../data/filter.json";
import pushNotification from "../../functions/pushNotification";

const { NTFY_URL, SELOGER_URL } = process.env;

const SECRET_CHANNEL =
  process.env.NODE_ENV === "development"
    ? process.env.SECRET_CHANNEL
    : process.env.SECRET_CHANNEL_DEV;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log("keys", {
    NTFY_URL,
    SELOGER_URL,
    SECRET_CHANNEL,
  });
  const resp = await fetch(
    `${NTFY_URL}${SECRET_CHANNEL}`,
    pushNotification({ nb: "test" }, nbApartment)
  );
  res.json({ message: "Good" });
}
