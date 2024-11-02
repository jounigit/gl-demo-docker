/* eslint-disable @typescript-eslint/no-unused-vars */
import type * as vitest from 'vitest'
import type * as integration from './tests/factory'

declare module '@vitest/runner' {
  export interface TestContext {
    request: Request;
    integration: typeof integration;
  }
}