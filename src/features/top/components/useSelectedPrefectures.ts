import { Prefecture } from "@/features/resas/types/prefectures"
import { useCallback, useState } from "react"

/** 都道府県の選択状態とチェックボックスのハンドラーを返します */
export const useSelectedPrefectures = (prefectures: Prefecture[]) => {
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
