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
): number[][] => {
  const DISPLAY_MIN_YEAR = 1980
  const DISPLAY_MAX_YEAR = 2020

  return data
    .filter(
      (data) =>
        DISPLAY_MIN_YEAR <= data.year &&
        data.year <= DISPLAY_MAX_YEAR &&
        data.year % 10 === 0 // 10年毎に表示する
    )
    .map((data) => [data.year, data.value])
}

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
  tooltip: {
    valueSuffix: "人",
  },
  xAxis: {
    min: 1980,
    max: 2020,
    tickInterval: 10,
    title: {
      text: null,
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
      text: null,
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
