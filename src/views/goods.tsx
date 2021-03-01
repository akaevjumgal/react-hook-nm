import * as React from 'react'
import {
	Backdrop,
	Box,
	Card,
	CardContent,
	CircularProgress,
	GridList,
	GridListTile,
	makeStyles
} from '@material-ui/core'
import { GoodsDispatcher } from '@store/goods.dispatcher'
import { useDispatch, useSelector } from 'react-redux'
import { Skeleton } from '@material-ui/lab'
import { AppState } from '@store/reducers'
import { Goods } from '@models/goods.model'
import { GoodsState } from '@store/goods.state'
import firebaseContext from '../firebase.init'
import firebase from 'firebase'
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot
import SnapshotOptions = firebase.firestore.SnapshotOptions
import { useEffect, useState } from 'react'

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

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		backgroundColor: '#fff',
		height: 'calc(100vh - 64px)',
		marginTop: 'auto'
	},
}));

const GoodsPage = () => {
	const classes = useStyles()
	const goodsDispatcher = new GoodsDispatcher(useDispatch())
	const { list } = useSelector<AppState, Partial<GoodsState>>(({ goods }) => goods)
	const [loading, setLoader] = useState<boolean>(false)
	const [opened, toggleBackdrop] = useState<boolean>(true)

	useEffect(() => {
		setLoader(true)
		fetchGoods().then(goods => {
			const mapped = goods.map(g => g.data())
			goodsDispatcher.updateAll({ list: mapped })
			setLoader(false)
		})
	}, [])

	const handleBackdrop = () => toggleBackdrop(!opened)

	if (loading || !list) {
		return (
			<Backdrop className={classes.backdrop} open={opened} onClick={handleBackdrop}>
				<CircularProgress/>
			</Backdrop>
		)
	}

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
