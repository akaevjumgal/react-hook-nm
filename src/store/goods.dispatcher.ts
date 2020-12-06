import { Dispatch } from 'redux'
import { GOODS_ACTION_TYPE, GoodsDispatch } from './goods.reducer'
import { GoodsState } from './goods.state'

export class GoodsDispatcher {
	private readonly dispatch: Dispatch<GoodsDispatch>

	constructor(dispatch: Dispatch<GoodsDispatch>) {
		this.dispatch = dispatch
	}

	updateOne = ({ form }: Partial<GoodsState>) => this.dispatch({
		type: GOODS_ACTION_TYPE.UPDATE_ONE,
		payload: { form }
	})

	updateAll = ({ list }: Partial<GoodsState>) => this.dispatch({
		type: GOODS_ACTION_TYPE.UPDATE_ALL,
		payload: { list }
	})
}
