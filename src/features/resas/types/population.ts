export type PopulationCompositionPerYearResponse = {
  message: null
  result: {
    /** 実績値と推計値の区切り年 */
    boundaryYear: number
    data: PopulationCompositionPerYearData[]
  }
}

type PopulationCompositionPerYearData =
  | {
      /** ラベル */
      label: "総人口"
      data: PopulationCompositionPerYearDataDataCommon[]
    }
  | {
      /** ラベル */
      label: "年少人口" | "生産年齢人口" | "老年人口"
      data: (PopulationCompositionPerYearDataDataCommon & {
        /** 割合 */
        rate: number
      })[]
    }

type PopulationCompositionPerYearDataDataCommon = {
  /** 年 */
  year: number
  /** 人口 */
  value: number
}

export type PopulationResponse = {
  message: null
  result: {
    prefName: string
    data: PopulationCompositionPerYearDataDataCommon[]
  }
}
