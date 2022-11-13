import { getLayout } from "@/components/Layout"
import { getPrefectures } from "@/features/resas/server/client"
import { Prefecture } from "@/features/resas/types/prefectures"
import { Top } from "@/features/top/components"
import type { GetStaticProps } from "next"
import NextHeadSeo from "next-head-seo"

export type TopPageProps = {
  prefectures: Prefecture[]
}

export const getStaticProps: GetStaticProps<TopPageProps> = async () => {
  const res = await getPrefectures()
  return {
    props: {
      prefectures: res.result,
    },
    revalidate: 86400,
  }
}

export default function TopPage({ prefectures }: TopPageProps) {
  return (
    <>
      <NextHeadSeo
        title="総人口推移グラフ"
        description="都道府県別の総人口推移グラフを表示します。"
      />
      <Top prefectures={prefectures} />
    </>
  )
}

TopPage.getLayout = getLayout
