// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { postData } from "@/functions/postData";
import { Data } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

import data from "../../data/nbApartment.json";

const channel =
  process.env.NODE_ENV === "development"
    ? process.env.SECRET_CHANNEL_DEV
    : process.env.SECRET_CHANNEL;

const url = process.env.URL;

function pushNotification(response: { nb: any }) {
  return process.env.NODE_ENV === "development"
    ? {
        method: "POST",
        body: `${data.lastCount} -> ${response.nb}`,
        headers: {
          Title: "TEST : SeLoger",
          Tags: "construction_worker",
        },
      }
    : {
        method: "POST",
        body: `Il y'a du nouveau : ${data.lastCount} -> ${response.nb}`,
        headers: {
          Title: "SeLoger",
          Tags: "house",
        },
      };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await postData(
      "https://www.seloger.com/search-bff/christie/count",
      {
        enterprise: false,
        price: { min: null, max: 1200 },
        projects: [1],
        surface: { min: 30, max: null },
        types: [1],
        rooms: [1, 2, 3, 4, 5],
        places: [
          { inseeCodes: [750108] },
          { inseeCodes: [750111] },
          { inseeCodes: [750112] },
          { inseeCodes: [750113] },
          { inseeCodes: [750114] },
          { inseeCodes: [750117] },
          { inseeCodes: [750120] },
          { inseeCodes: [920044] },
          { inseeCodes: [920049] },
          { inseeCodes: [930045] },
          { inseeCodes: [940018] },
          { inseeCodes: [940067] },
          { inseeCodes: [940080] },
          { districts: [133148] },
          { inseeCodes: [750104] },
          { inseeCodes: [750105] },
          { inseeCodes: [750109] },
        ],
        textCriteria: [],
        mandatoryCommodities: true,
      }
    );

    if (req.query.reset) {
      data.lastCount = 0;
    } else if (data.lastCount !== response.nb) {
      if (data.lastCount < response.nb && data.lastCount !== 0)
        await fetch(`${url}${channel}`, pushNotification(response));
      data.lastCount = response.nb;
    }
    res.json({ message: "Good!" });
  } catch (err) {
    res.json({ error: "failed to load data" });
  }
}
