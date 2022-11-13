import { PopulationResponse } from "@/features/resas/types/population"
import { Prefecture } from "@/features/resas/types/prefectures"
import { useQueries } from "@tanstack/react-query"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import highchartsAccessibility from "highcharts/modules/accessibility"
import { useMemo } from "react"

export type PopulationGraphProps = {
  selectedPrefectures: Prefecture[]
}

const options: Highcharts.Options = {
  chart: {
    height: "450px",
  },
  credits: {
    enabled: false,
  },
  navigation: {
    buttonOptions: {
      enabled: false,
    },
  },
  title: {
    text: "",
  },
  xAxis: {
    labels: {
      format: "{text}年",
    },
    min: 1980,
    max: 2020,
    tickInterval: 10,
    title: {
      text: "",
    },
  },
  yAxis: {
    labels: {
      format: "{text}人",
    },
    min: 0,
    max: 14_000_000,
    tickInterval: 2_000_000,
    title: {
      text: "",
    },
  },
}

export const PopulationGraph = ({
  selectedPrefectures,
}: PopulationGraphProps) => {
  if (typeof Highcharts === "object") {
    highchartsAccessibility(Highcharts)
  }
  const queries = usePopulationQueries(selectedPrefectures)
  const series: Highcharts.Options["series"] = useMemo(() => {
    return queries.length > 0
      ? queries.map((query) => {
          const prefName = query.data?.result.prefName as string
          const data = query.data?.result.data
            .filter(
              (data) =>
                1980 <= data.year && data.year <= 2020 && data.year % 10 === 0
            )
            .map((data) => [data.year, data.value]) as number[][]
          return {
            type: "line",
            name: prefName,
            data,
          }
        })
      : [
          {
            type: "line",
            name: "都道府県を選択してください",
            data: [],
          },
        ]
  }, [queries])
  return (
    <section>
      <HighchartsReact
        highcharts={Highcharts}
        options={{ ...options, series }}
      />
    </section>
  )
}

const usePopulationQueries = (selectedPrefectures: Prefecture[]) => {
  return useQueries({
    queries: selectedPrefectures.map((pref) => ({
      queryKey: ["population", pref.prefCode],
      queryFn: () =>
        fetch(
          `/api/population?prefCode=${pref.prefCode}&prefName=${pref.prefName}`
        ).then((res) => res.json() as Promise<PopulationResponse>),
      staleTime: Infinity,
    })),
  })
}
