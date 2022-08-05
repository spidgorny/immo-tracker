import invariant from "tiny-invariant";
import { NextApiRequest, NextApiResponse } from "next";

export async function handlePost(
  req: NextApiRequest,
  res: NextApiResponse,
  code
) {
  try {
    invariant(req.method === "POST", "only POST");
    const result = await code();
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "error",
      message: e?.message,
      stack: e?.stack?.split("\n"),
    });
  }
}
