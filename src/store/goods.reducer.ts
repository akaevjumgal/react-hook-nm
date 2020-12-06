import { Action, Reducer } from 'redux'
import { GoodsState, goodsInitialState } from './goods.state'
import { update } from './utils'

export interface GoodsDispatch extends Action {
	payload: Partial<GoodsState>
}

export enum GOODS_ACTION_TYPE {
	UPDATE_ONE,
	UPDATE_ALL,
	DELETE,
}

export const GoodsReducer: Reducer<Partial<GoodsState>, GoodsDispatch> = (state = goodsInitialState, action) => {
	switch (action.type) {
		case GOODS_ACTION_TYPE.UPDATE_ONE:
			return {
				...state,
				form: update(state.form, action.payload.form)
			}
		case GOODS_ACTION_TYPE.UPDATE_ALL:
			return {
				...state,
				list: action.payload.list.slice()
			}
		case GOODS_ACTION_TYPE.DELETE:
			return update(state, action.payload)
		default:
			return state
	}
}
