import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container } from '@material-ui/core'
import HeaderComponent from '@components/header'
import { store } from '@store/index'
import { routes } from 'routes'
import { Component } from 'react'

export class App extends Component {
	render() {
		return (
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
	}
}
