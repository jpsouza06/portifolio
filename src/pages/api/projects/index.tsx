import { NextApiResponse, NextApiRequest } from "next";
import { projects } from '../../../../data';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(200).json(projects)
}