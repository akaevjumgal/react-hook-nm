import * as React from 'react'
import { Box, Card, CardContent, GridList, GridListTile } from '@material-ui/core'
import { GoodsDispatcher } from '../store/goods.dispatcher'
import { useDispatch, useSelector } from 'react-redux'
import { Skeleton } from '@material-ui/lab'
import { AppState } from '../store/reducers'
import { Goods } from '../models/goods.model'
import { GoodsState } from '../store/goods.state'
import firebaseContext from '../firebase.init'
import firebase from 'firebase'
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot
import SnapshotOptions = firebase.firestore.SnapshotOptions
import { useState } from 'react'

const SKELETON_COUNT = 9

const CustomFirestoreConverter = {
	toFirestore(model: Goods) {
		return model
	},
	fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Goods {
		const { name, price, quantity, hasDiscount } = snapshot.data(options)
		return { name, price, quantity, hasDiscount }
	}
}

const fetchGoods = async () => {
	const firestore = firebaseContext.firestore()
	const response = await firestore
		.collection('goods')
		.withConverter<Goods>(CustomFirestoreConverter)
		.get()
	return response.docs
}

const GoodsPage = () => {
	const goodsDispatcher = new GoodsDispatcher(useDispatch())
	const { list } = useSelector<AppState, Partial<GoodsState>>(({ goods }) => goods)
	// const [loading, setLoader] = useState<boolean>(false)

	// setLoader(true)
	fetchGoods().then(goods => {
		// console.log('before dispatcher call', list)
		const mapped = goods.map(g => g.data())
		console.log(mapped)
		goodsDispatcher.updateAll({ list: mapped })
		// console.log('after dispacher call', list)
	})

	return (
		<Box my={ 4 }>
			<GridList cols={3}>
				{
					list.map((g, index) => (
						<GridListTile key={ index }>
							<Card variant="outlined">
								<CardContent>
									<h4>{ g.name }</h4>
									<h5>{ g.price }</h5>
									<p>{ g.quantity }</p>
								</CardContent>
							</Card>
						</GridListTile>
					))
				}
				{/*{ loading && new Array(SKELETON_COUNT).fill(undefined).map((m, i) => <GridSkeleton key={i} />) }*/}
			</GridList>
		</Box>
	)
}

const GridSkeleton = () => {
	return (
		<GridListTile>
			<Box m={1}>
				<Skeleton height="30vh" variant="rect" width="25vw"/>
			</Box>
		</GridListTile>
	)
}


export default GoodsPage
