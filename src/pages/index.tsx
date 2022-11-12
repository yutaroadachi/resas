import { getLayout } from "@/components/Layout"
import NextHeadSeo from "next-head-seo"
export default function Home() {
  return (
    <>
      <NextHeadSeo
        title="総人口推移グラフ"
        description="都道府県別の総人口推移グラフを表示します。"
      />
      <h2>Hello World!</h2>
    </>
  )
}

Home.getLayout = getLayout
