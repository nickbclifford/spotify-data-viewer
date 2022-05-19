import { Box, Card, CardContent, Fab, Typography } from "@mui/material";
import { FileOpen } from "@mui/icons-material";
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
			<Card elevation={5} sx={{ maxWidth: "40%" }}>
				<CardContent>
					<Typography variant="h4">Welcome to the Spotify Data Viewer!</Typography>
					<Typography variant="h6">Select your data</Typography>
					<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
						<label htmlFor="file-input">
							<input ref={inputRef} id="file-input" type="file" accept="application/zip" hidden />
							<Fab
								variant="extended"
								color="primary"
								sx={{ margin: "5% 0" }}
								onClick={() => inputRef.current?.click()}
							>
								<FileOpen sx={{ marginRight: 1 }} />
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
