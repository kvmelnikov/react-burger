import { type } from 'os'

export interface IIngredientDetails {
  _id: string
  name: string
  type: string
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile: string
  image_large: string
  __v: number
  count: number
}

export interface IFeed {
  _id: string
  ingredients: string[]
  status: string
  name: string
  createdAt: Date
  updatedAt: Date
  number: number
}

interface IStatusReport {
  done?: number[]
  pending?: number[]
}

export interface IReportFeeds {
  statusOrders: IStatusReport
  total?: number
  totalToday?: number
}

interface IFeedDetailObject extends IFeed {
  owner: string
  __v: number
}

interface IIngredientFeedDetailStructure {
  image: string
  name: string
  price: number
  id: string
  quantity: number
  sumPrice: number
}

interface IFeedDetailStructure {
  ingredients: IIngredientFeedDetailStructure[]
  sumIngredients: number
}

export interface IIFeedDetail {
  feedDetailFailed: boolean
  feedDetailRequest: boolean
  feedDetail: IFeedDetailObject
  feedDetailStrucure: IFeedDetailStructure
}
