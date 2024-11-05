import { QueryErrorResetBoundary } from '@tanstack/react-query'
import {
  ErrorBoundary
} from 'react-error-boundary'
import { ErrorHandler, LoadingHandler } from '../handlers'
import * as React from 'react'

//
export const QueryBoundaries = ({ children }
  : { children: React.ReactNode }) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary onReset={reset} FallbackComponent={ErrorHandler}>
        <React.Suspense fallback={<LoadingHandler />}>
          {children}
        </React.Suspense>
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
)
