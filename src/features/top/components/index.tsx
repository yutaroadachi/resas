import { ErrorFallback } from "@/components/ErrorFallback"
import { Loading } from "@/components/Loading"
import { PrefecturesResponse } from "@/features/resas/types/prefectures"
import { Suspense, useCallback, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { PrefecturesCheckbox } from "./PrefecturesCheckbox"

export type TopProps = {
  prefectures: PrefecturesResponse
}

export const Top = ({ prefectures }: TopProps) => {
  const { checkedPrefCodes, handleChangeCheckbox } = useCheckbox()

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loading />}>
        <PrefecturesCheckbox
          prefectures={prefectures}
          handleChangeCheckbox={handleChangeCheckbox}
        />
        <div>選択中：{checkedPrefCodes.join(", ")}</div>
      </Suspense>
    </ErrorBoundary>
  )
}

const useCheckbox = () => {
  const [checkedPrefCodes, setCheckedPrefCodes] = useState<number[]>([])
  const handleChangeCheckbox = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setCheckedPrefCodes((prev) => [...prev, Number(e.target.value)])
      } else {
        setCheckedPrefCodes((prev) =>
          prev.filter((p) => p !== Number(e.target.value))
        )
      }
    },
    []
  )

  return {
    checkedPrefCodes,
    handleChangeCheckbox,
  }
}
