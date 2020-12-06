import HomePage from './views/home'
import GoodsFormPage from './views/goods-form'
import { RouteProps } from 'react-router-dom'
import GoodsPage from './views/goods'

export const routes: RouteProps[] = [
	{
		path: '/',
		exact: true,
		component: HomePage
	},
	{
		path: '/create',
		exact: true,
		component: GoodsFormPage
	},
	{
		path: '/goods',
		exact: true,
		component: GoodsPage
	}
]
