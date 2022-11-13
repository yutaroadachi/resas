import { Prefecture } from "@/features/resas/types/prefectures"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import highchartsAccessibility from "highcharts/modules/accessibility"
import { useHighchartsOptions } from "./useHighchartsOptions"

export type PopulationGraphProps = {
  selectedPrefectures: Prefecture[]
}

export const PopulationGraph = ({
  selectedPrefectures,
}: PopulationGraphProps) => {
  // @see https://github.com/highcharts/highcharts-react#highcharts-with-nextjs
  if (typeof Highcharts === "object") {
    highchartsAccessibility(Highcharts)
  }

  const options = useHighchartsOptions(selectedPrefectures)

  return (
    <section>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </section>
  )
}
