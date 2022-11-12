import { PrefecturesResponse } from "../types/prefectures"

export const getPrefectures = () => {
  return fetch(`${BASE_URL}/prefectures`, {
    headers: {
      "X-API-KEY": getXApiKey(),
    },
  }).then((res) => res.json() as Promise<PrefecturesResponse>)
}

const BASE_URL = "https://opendata.resas-portal.go.jp/api/v1"

const getXApiKey = (): string => {
  if (process.env.RESAS_API_KEY === undefined) {
    throw new Error("RESAS_API_KEYが設定されていません")
  }
  return process.env.RESAS_API_KEY
}
