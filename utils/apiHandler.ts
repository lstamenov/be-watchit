import { Response } from "express";

export default async (data: {
  handler: (params: any) => any;
  params: any;
  errorCode: number;
  res: Response;
}) => {
  const { handler, params, res, errorCode } = data;

  try {
    const result = await handler(params);
    res.send(result);
  } catch (e: any) {
    res.status(errorCode).send({ message: e.message });
  }
};
