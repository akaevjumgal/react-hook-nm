import { Goods } from '../models/goods.model'

export interface GoodsState {
	form: Partial<Goods>
	list: Goods[]
}

export const goodsInitialState: GoodsState = {
	form: new Goods(),
	list: []
}
