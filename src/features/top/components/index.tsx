import { ErrorFallback } from "@/components/ErrorFallback"
import { Loading } from "@/components/Loading"
import { Prefecture } from "@/features/resas/types/prefectures"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { PopulationGraph } from "./PopulationGraph"
import { PrefecturesCheckbox } from "./PrefecturesCheckbox"
import { useSelectedPrefectures } from "./useSelectedPrefectures"

export type TopProps = {
  prefectures: Prefecture[]
}

export const Top = ({ prefectures }: TopProps) => {
  const { selectedPrefectures, handleChangeCheckbox } =
    useSelectedPrefectures(prefectures)

  return (
    <>
      <PrefecturesCheckbox
        prefectures={prefectures}
        handleChangeCheckbox={handleChangeCheckbox}
      />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Loading />}>
          <PopulationGraph selectedPrefectures={selectedPrefectures} />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}
