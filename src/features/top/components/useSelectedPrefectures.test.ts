import { prefectures } from "@/mocks/data/prefectures"
import { act, renderHook } from "@testing-library/react"
import { useSelectedPrefectures } from "./useSelectedPrefectures"

describe("useSelectedPrefectures", () => {
  it("selectedPrefecturesの初期値が空配列であること", () => {
    const { result } = renderHook(() => useSelectedPrefectures(prefectures))

    expect(result.current.selectedPrefectures).toEqual([])
  })

  it("選択したprefectureがselectedPrefecturesに追加されること", () => {
    const { result } = renderHook(() => useSelectedPrefectures(prefectures))

    act(() =>
      result.current.handleChangeCheckbox({
        target: {
          value: "37",
          checked: true,
        },
      } as React.ChangeEvent<HTMLInputElement>)
    )
    expect(result.current.selectedPrefectures).toEqual([
      { prefCode: 37, prefName: "香川県" },
    ])
  })

  it("選択解除したprefectureがselectedPrefecturesから削除されること", () => {
    const { result } = renderHook(() => useSelectedPrefectures(prefectures))

    // 香川県を選択する
    act(() =>
      result.current.handleChangeCheckbox({
        target: {
          value: "37",
          checked: true,
        },
      } as React.ChangeEvent<HTMLInputElement>)
    )
    expect(result.current.selectedPrefectures).toEqual([
      { prefCode: 37, prefName: "香川県" },
    ])

    // 香川県を選択解除する
    act(() =>
      result.current.handleChangeCheckbox({
        target: {
          value: "37",
          checked: false,
        },
      } as React.ChangeEvent<HTMLInputElement>)
    )
    expect(result.current.selectedPrefectures).toEqual([])
  })
})
