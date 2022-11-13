import { Prefecture } from "@/features/resas/types/prefectures"
import classes from "./PrefecturesCheckbox.module.css"

export type PrefecturesCheckboxProps = {
  prefectures: Prefecture[]
  handleChangeCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const PrefecturesCheckbox = ({
  prefectures,
  handleChangeCheckbox,
}: PrefecturesCheckboxProps) => {
  return (
    <section className={classes.section}>
      <h2>都道府県</h2>
      <div className={classes.checkboxes}>
        {prefectures.map((pref) => {
          const id = `pref-${pref.prefCode}`
          return (
            <div key={id}>
              <input
                type="checkbox"
                id={id}
                value={pref.prefCode}
                onChange={handleChangeCheckbox}
              />
              <label htmlFor={id} className={classes.label}>
                {pref.prefName}
              </label>
            </div>
          )
        })}
      </div>
    </section>
  )
}
