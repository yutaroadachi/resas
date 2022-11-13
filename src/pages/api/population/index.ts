import { getPopulationCompositionPerYear } from "@/features/resas/server/client"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).end()
    return
  }

  const { prefCode, prefName } = req.query
  if (typeof prefCode !== "string" || typeof prefName !== "string") {
    res.status(400).end()
    return
  }

  const response = await getPopulationCompositionPerYear(Number(prefCode))
  const data = response.result.data.find((data) => data.label === "総人口")
  if (!data) {
    res.status(500).end()
    return
  }

  res.setHeader(
    "Cache-Control",
    "max-age=0, s-maxage=86400, stale-while-revalidate"
  )
  res.status(200).json({
    message: null,
    result: {
      prefName,
      data: data.data,
    },
  })
}
