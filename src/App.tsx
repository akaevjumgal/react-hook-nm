import * as React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { routes } from './routes'
import HeaderComponent from './components/header'
import { Container } from '@material-ui/core'

export const App = () => (
	<Provider store={ store }>
		<BrowserRouter>
			<HeaderComponent />
			<Container maxWidth="lg">
				<Switch>
					{ routes.map((route, idx) => <Route key={ idx } {...route} />) }
				</Switch>
			</Container>
		</BrowserRouter>
	</Provider>
)
