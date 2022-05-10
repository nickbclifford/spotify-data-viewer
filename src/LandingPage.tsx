import { Box, Button, Card, CardActions, CardContent, Fab, Typography } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import React from "react";

interface LandingPageProps {
	onFileSelect(dataZip: File): void;
}

export default function LandingPage({ onFileSelect }: LandingPageProps) {
	const inputRef = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		const ref = inputRef.current;
		if (!ref) return;

		const listener = () => {
			onFileSelect(ref.files![0]);
		};

		ref.addEventListener("change", listener);
		return () => {
			ref.removeEventListener("change", listener);
		};
	}, [onFileSelect]);

	return (
		<>
			<Card elevation={5} sx={{ maxWidth: "20%" }}>
				<CardContent>
					<Typography variant="h5">Welcome to the Spotify Data Viewer!</Typography>
					<Typography variant="body1">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
						laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
						voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
						non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</Typography>
				</CardContent>
				<CardActions>
					<Button>Get Started</Button>
				</CardActions>
			</Card>
			<Card elevation={5} sx={{ maxWidth: "20%" }}>
				<CardContent>
					<Typography variant="h5">Upload your data</Typography>
					<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
						<label htmlFor="file-input">
							<input ref={inputRef} id="file-input" type="file" accept="application/zip" hidden />
							<Fab
								variant="extended"
								color="primary"
								sx={{ margin: "5% 0" }}
								onClick={() => inputRef.current?.click()}
							>
								<UploadFile sx={{ marginRight: 1 }} />
								Choose File
							</Fab>
						</label>
						<Typography variant="subtitle1" align="center">
							This should be the ZIP file you downloaded from Spotify.
						</Typography>
					</Box>
				</CardContent>
			</Card>
		</>
	);
}
