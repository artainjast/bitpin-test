export type TabKeyType  = 'IRT' | 'USDT'
export type DetailTabKeyType  = 'buy' | 'sell' | 'transactions'

export type TabType = Array<{title: string , key : TabKeyType }>
export type DetailPageTabType = Array<{title: string , key :DetailTabKeyType }>