export type PrefecturesResponse = {
  message: null
  result: Prefecture[]
}

export type Prefecture = {
  /** 都道府県コード */
  prefCode: number
  /** 都道府県名 */
  prefName: string
}
