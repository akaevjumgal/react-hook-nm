import * as React from 'react'
import { AppBar, Container, MenuItem, Toolbar } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const HeaderComponent: React.FC = () => {
	return (
		<AppBar position="sticky">
			<Container maxWidth="lg" disableGutters>
				<Toolbar>
					<Link to="/"><h3>SHOP</h3></Link>
					<Link to="/goods"><MenuItem>GOODS</MenuItem></Link>
					<Link to="/create"><MenuItem><Add/> ADD GOODS</MenuItem></Link>
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default HeaderComponent
