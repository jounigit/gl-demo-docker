// import { NextFunction, Request, Response } from 'express'

// export const errorHandler = (method: Function) => {
//   return (req: Request, res: Response, next: NextFunction)  => {
//     try {
//         method(req, res, next)
//     } catch (error) {
//         if (error instanceof HttpException)
//     }
//   }
// }
export interface Error {
    status?: number;
    message?: string;
}

export const errorHandler = (err: Error)  => {
  console.log('Error Handler Middleware')
  console.log(`Status Code : ${err.status || 500}`)
  console.log(`Message : ${err.message || 'Internal Server Error'}`)
  process.exit()
}