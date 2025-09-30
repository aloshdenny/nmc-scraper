import { NextRequest } from "next/server";

export const runtime = "edge"; // run as edge function

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

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
        body: JSON.stringify(body),
      }
    );

    const text = await response.text();
    return new Response(text, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err: any) {
  return new Response(
    JSON.stringify({ 
      error: "Proxy failed", 
      details: err?.message || err.toString(),
      stack: err?.stack 
    }),
    {
      status: 500,
      headers: { "Content-Type": "application/json" }
    }
  );
}
}