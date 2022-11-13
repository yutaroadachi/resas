import { ErrorFallback } from "@/components/ErrorFallback"
import { Loading } from "@/components/Loading"
import { Prefecture } from "@/features/resas/types/prefectures"
import { Suspense, useCallback, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { PopulationGraph } from "./PopulationGraph"
import { PrefecturesCheckbox } from "./PrefecturesCheckbox"

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

const useSelectedPrefectures = (prefectures: Prefecture[]) => {
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>(
    []
  )
  const handleChangeCheckbox = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const prefCode = Number(e.target.value)
      if (e.target.checked) {
        const selectedPrefecture = prefectures.find(
          (pref) => pref.prefCode === prefCode
        ) as Prefecture
        setSelectedPrefectures((prevState) => [
          ...prevState,
          selectedPrefecture,
        ])
      } else {
        setSelectedPrefectures((prevState) =>
          prevState.filter((pref) => pref.prefCode !== prefCode)
        )
      }
    },
    [prefectures]
  )

  return {
    selectedPrefectures,
    handleChangeCheckbox,
  }
}
