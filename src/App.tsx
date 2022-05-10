import React from "react";
import { AppBar, Box, Toolbar, Typography, styled } from "@mui/material";
import LandingPage from "./LandingPage";
import JSZip from "jszip";
import DataSource from "./dataSource";
import Explorer from "./Explorer";

const Content = styled(Box)`
	// fill space from root flexbox
	flex-grow: 1;
	// center children
	display: flex;
	justify-content: space-evenly;
	align-items: center;
`;

function App() {
	const [dataSource, setSource] = React.useState<DataSource | null>(null);

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h5">Spotify Data Viewer</Typography>
				</Toolbar>
			</AppBar>
			<Content component="main">
				{!dataSource && (
					<LandingPage
						onFileSelect={file => {
							file.arrayBuffer()
								.then(JSZip.loadAsync)
								.then(async zip => {
									const root = zip.folder("MyData");
									if (!root) {
										// TODO: proper alert to the user
										throw new Error("Your file is not in the correct format!");
									}

									const src = new DataSource();
									for (const file of root.filter(p => p.endsWith(".json"))) {
										// MyData/category_name.json
										src.addCategory(file.name.slice(7, -5), await file.async("string"));
									}
									setSource(src);
								});
						}}
					/>
				)}
				{dataSource && <Explorer source={dataSource} />}
			</Content>
		</>
	);
}

export default App;
