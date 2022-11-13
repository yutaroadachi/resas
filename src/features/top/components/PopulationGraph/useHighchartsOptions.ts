import { PopulationResponse } from "@/features/resas/types/population"
import { Prefecture } from "@/features/resas/types/prefectures"
import { useQueries } from "@tanstack/react-query"
import Highcharts from "highcharts"
import { useMemo } from "react"

/** 選択した都道府県の人口構成をフェッチし、Highchartsに渡すオプションを返します */
export const useHighchartsOptions = (
  selectedPrefectures: Prefecture[]
): Highcharts.Options => {
  const queries = useQueries({
    queries: selectedPrefectures.map((pref) => ({
      queryKey: ["population", pref.prefCode],
      queryFn: () =>
        fetch(
          `/api/population?prefCode=${pref.prefCode}&prefName=${pref.prefName}`
        ).then((res) => res.json() as Promise<PopulationResponse>),
      staleTime: Infinity,
    })),
  })

  const series: Highcharts.Options["series"] = useMemo(() => {
    const successQueries = queries.filter((query) => query.isSuccess)

    return successQueries.length > 0
      ? successQueries.map((query) => {
          // eslint-disable-next-line
          const prefName = query.data?.result.prefName!
          const data = generateHighchartsOptionsSeriesData(
            // eslint-disable-next-line
            query.data?.result.data!
          )

          return {
            type: "line",
            name: prefName,
            data,
          }
        })
      : initialSeries
  }, [queries])

  return { ...baseHighchartsOptions, series }
}

export const generateHighchartsOptionsSeriesData = (
  data: PopulationResponse["result"]["data"]
): number[][] =>
  data
    .filter(
      (data) => 1980 <= data.year && data.year <= 2020 && data.year % 10 === 0
    )
    .map((data) => [data.year, data.value])

const baseHighchartsOptions: Highcharts.Options = {
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

const initialSeries: Highcharts.Options["series"] = [
  {
    type: "line",
    name: "都道府県を選択してください",
    data: [],
  },
]
