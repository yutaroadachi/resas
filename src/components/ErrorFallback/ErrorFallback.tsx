import { FallbackProps } from "react-error-boundary"

export type ErrorFallbackProps = FallbackProps

export const ErrorFallback = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resetErrorBoundary,
}: ErrorFallbackProps) => {
  return <div>申し訳ございません。エラーが発生しました</div>
}
