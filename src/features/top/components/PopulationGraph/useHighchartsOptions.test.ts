import { generateHighchartsOptionsSeriesData } from "./useHighchartsOptions"

describe("useHighchartsOptions", () => {
  describe("generateHighchartsOptionsSeriesData", () => {
    type FunctionType = typeof generateHighchartsOptionsSeriesData

    it("期待通りのデータが生成されること", () => {
      const data: Parameters<FunctionType>[0] = [
        { year: 1960, value: 5039206 },
        { year: 1965, value: 5171800 },
        { year: 1970, value: 5184287 },
        { year: 1975, value: 5338206 },
        { year: 1980, value: 5575989 },
        { year: 1985, value: 5679439 },
        { year: 1990, value: 5643647 },
        { year: 1995, value: 5692321 },
        { year: 2000, value: 5683062 },
        { year: 2005, value: 5627737 },
        { year: 2010, value: 5506419 },
        { year: 2015, value: 5381733 },
        { year: 2020, value: 5216615 },
        { year: 2025, value: 5016554 },
        { year: 2030, value: 4791592 },
        { year: 2035, value: 4546357 },
        { year: 2040, value: 4280427 },
        { year: 2045, value: 4004973 },
      ]
      const expected: ReturnType<FunctionType> = [
        [1980, 5575989],
        [1990, 5643647],
        [2000, 5683062],
        [2010, 5506419],
        [2020, 5216615],
      ]

      expect(generateHighchartsOptionsSeriesData(data)).toStrictEqual(expected)
    })
  })
})
