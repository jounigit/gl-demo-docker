/* eslint-disable @typescript-eslint/no-namespace */
import type { User } from '@prisma/client'

// export {}

declare global {
  namespace Express {
    export interface Request {
      user?: Partial<User>;
      // auth?(): Promise<Partial<User> | undefined>;
    }
  }
}
