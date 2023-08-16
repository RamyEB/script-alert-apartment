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
  console.log(resp);
  try {
    //const response = await postData(SELOGER_URL, filter);
    /*if (req.query.reset) {
      nbApartment.lastCount = 0;
    } else if (nbApartment.lastCount !== response.nb) {
      if (nbApartment.lastCount < response.nb && nbApartment.lastCount !== 0) {
        await fetch(
          `${NTFY_URL}${SECRET_CHANNEL}`,
          pushNotification(response, nbApartment)
        );
        console.log("ntfy2");
      }
      nbApartment.lastCount = response.nb;
    }
    res.json({ message: "Good!", nbApartment, response });*/
  } catch (err: any) {
    throw new Error(err.message);
  }
}
