import type { Request, Response } from 'express';
declare const signin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export default signin;
