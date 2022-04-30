import React from "react";
import { AppBar, Box, Button, Card, CardActions, CardContent, Toolbar, Typography } from "@mui/material";

function App() {
	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h5">Spotify Data Viewer</Typography>
				</Toolbar>
			</AppBar>
			<Box
				sx={{
					// fill space from root flexbox
					flexGrow: 1,
					// center children
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Card elevation={5} sx={{ maxWidth: "20%" }}>
					<CardContent>
						<Typography variant="h5">Welcome to the Spotify Data Viewer!</Typography>
						<Typography variant="body1">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
							laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
							voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
							cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</Typography>
					</CardContent>
					<CardActions>
						<Button>Get Started</Button>
					</CardActions>
				</Card>
			</Box>
		</>
	);
}

export default App;
