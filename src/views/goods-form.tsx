import * as React from 'react'
import {
	Box,
	Button,
	FormControl, FormControlLabel,
	Grid,
	Input,
	InputAdornment,
	InputLabel,
	OutlinedInput, Switch,
	TextField
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { GoodsState } from '../store/goods.state'
import { GoodsDispatcher } from '../store/goods.dispatcher'
import { AppState } from '../store/reducers'
import { Goods } from '../models/goods.model'
import firebaseContext from '../firebase.init'

const GoodsFormPage = () => {
	const { form } = useSelector<AppState, Partial<GoodsState>>(({ goods }) => goods)
	const dispatcher = new GoodsDispatcher(useDispatch())

	const submit = async (goods: Partial<Goods>) => {
		await firebaseContext.firestore().collection('goods').add(goods)
	}
	console.log()
	return (
		<Box py={ 5 }>
			<Grid container direction="column">
				<Box width={ 300 }>
					<TextField
						label="Name"
						name="name"
						variant="outlined"
						value={ form.name || '' }
						onChange={ e => dispatcher.updateOne({ form: { name: e.target.value } }) }
						fullWidth
					/>
				</Box>
				<Box my={ 2 } width={ 300 }>
					<FormControl variant="outlined" fullWidth>
						<InputLabel htmlFor="price">Price</InputLabel>
						<OutlinedInput
							id="price"
							type="number"
							value={ form.price || '' }
							onChange={ e => dispatcher.updateOne({ form: { price: +e.target.value } }) }
							startAdornment={ <InputAdornment position="start">$</InputAdornment> }
							labelWidth={45}
						/>
					</FormControl>
				</Box>
				<Box width={ 300 }>
					<TextField
						label="Quantity"
						name="quantity"
						type="number"
						variant="outlined"
						value={ form.quantity || '' }
						onChange={ e => dispatcher.updateOne({ form: { quantity: +e.target.value } }) }
						fullWidth
					/>
				</Box>
				<Box width={ 300 } mt={ 2 }>
					<FormControlLabel
						control={
							<Switch
								checked={ form.hasDiscount }
								onChange={() => dispatcher.updateOne({ form: { hasDiscount: !form.hasDiscount } })}
							/>
						}
						label="Discount"
					/>
				</Box>
				<Box width={ 300 } mt={ 5 }>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						onClick={ () => submit(form) }
						size="large"
					>
						ADD
					</Button>
				</Box>
			</Grid>
		</Box>
	)
}

export default GoodsFormPage
