import { PrefecturesResponse } from "@/features/resas/types/prefectures"
import classes from "./PrefecturesCheckbox.module.css"

export type PrefecturesCheckboxProps = {
  prefectures: PrefecturesResponse
  handleChangeCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const PrefecturesCheckbox = ({
  prefectures,
  handleChangeCheckbox,
}: PrefecturesCheckboxProps) => {
  return (
    <section>
      <h2>都道府県</h2>
      <div className={classes.checkboxes}>
        {prefectures.result.map((prefecture) => {
          const id = `pref-${prefecture.prefCode}`
          return (
            <div key={id}>
              <input
                type="checkbox"
                id={id}
                value={prefecture.prefCode}
                onChange={handleChangeCheckbox}
              />
              <label htmlFor={id} className={classes.label}>
                {prefecture.prefName}
              </label>
            </div>
          )
        })}
      </div>
    </section>
  )
}
