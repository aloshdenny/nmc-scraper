import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch(
      "https://www.nmc.org.in/MCIRest/open/getDataFromService?service=getDoctorDetailsByIdImrExt",
      {
        method: "POST",
        headers: {
          "Accept": "*/*",
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(req.body),
      }
    );

    const text = await response.text();
    res.setHeader("Content-Type", "application/json");
    return res.status(response.status).send(text);
  } catch (err: any) {
    return res.status(500).json({ error: "Proxy failed", details: err.message });
  }
}