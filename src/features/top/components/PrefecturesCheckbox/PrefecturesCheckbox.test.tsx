import { prefectures } from "@/mocks/data/prefectures"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { PrefecturesCheckbox } from "./PrefecturesCheckbox"

describe("PrefecturesCheckbox", () => {
  it("都道府県一覧APIレスポンスから、都道府県一覧のチェックボックスが動的に生成されること", () => {
    const { getAllByRole, getByLabelText } = render(
      <PrefecturesCheckbox
        prefectures={prefectures}
        handleChangeCheckbox={jest.fn()}
      />
    )

    expect(getAllByRole("checkbox").length).toBe(4)
    expect(getByLabelText("徳島県")).toBeInTheDocument()
    expect(getByLabelText("香川県")).toBeInTheDocument()
    expect(getByLabelText("愛媛県")).toBeInTheDocument()
    expect(getByLabelText("高知県")).toBeInTheDocument()
  })

  it("チェックボックスをクリックするとハンドラーが呼ばれること", async () => {
    const user = userEvent.setup()
    const handleChangeCheckbox = jest.fn()
    const { getByRole } = render(
      <PrefecturesCheckbox
        prefectures={prefectures}
        handleChangeCheckbox={handleChangeCheckbox}
      />
    )
    await user.click(getByRole("checkbox", { name: "香川県" }))

    expect(handleChangeCheckbox).toHaveBeenCalled()
  })
})
