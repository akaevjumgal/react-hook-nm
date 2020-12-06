import { combineReducers, Reducer } from 'redux'
import { GoodsReducer } from './goods.reducer'
import { GoodsState } from './goods.state'

export interface AppState {
	goods: Partial<GoodsState>
}

export const rootReducers: Reducer<AppState> = combineReducers<AppState>({
	goods: GoodsReducer,
})
