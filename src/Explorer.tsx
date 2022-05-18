import React from "react";
import DataSource from "./dataSource";
import { Box, Card, CardContent, List, ListItem, ListItemText, Typography } from "@mui/material";
import { MusicNote, VapingRooms } from "@mui/icons-material";

interface ExplorerProps {
	source: DataSource;
}

export default function Explorer({ source }: ExplorerProps) {
	let inferences = source.getCategory("Inferences").inferences;
	const check_inference = (substring: string) => {
		let match = inferences.find(element => {
			if (element.includes(substring)) {
				return true;
			}
		});
		return match !== undefined;
	};
	const movie_types = () => {
		var genres: String[] = [];
		for (let i = 0; i < inferences.length; i++) {
			if (inferences[i].includes("Movie Enthusiasts")) {
				if (inferences[i].substring(0, 3) === "3P_") {
					let clean = inferences[i].split(" ")[0].substring(3);
					if (!genres.includes(clean)) {
						genres.push(clean);
					}
				}
			}
		}
		return genres;
	};
	const genres = movie_types();

	return (
		<>
			<Card>
				<CardContent>
					{source.categories.includes("Playlist1") ? (
						<>
							<Typography variant="h5">Playlists</Typography>
							<List>
								{source.getCategory("Playlist1").playlists.map((p, i) => (
									<ListItem
										key={i}
										secondaryAction={
											<Box
												sx={{
													display: "flex",
													flexDirection: "column",
												}}
											>
												<Typography variant="caption" align="center">
													{p.items.length}
												</Typography>
												<MusicNote />
											</Box>
										}
									>
										<ListItemText primary={p.name} secondary={p.description} />
									</ListItem>
								))}
							</List>
						</>
					) : (
						`You have the following data categories: ${source.categories.join(", ")}`
					)}
				</CardContent>
			</Card>
			<Card>
				<CardContent>
					<Typography variant="h5">Inferences</Typography>
					<Typography variant="h6">Spotify thinks that...</Typography>
					<List>
						<ListItem>You are {check_inference("Apple iOS Users") ? "" : "not "} an apple user</ListItem>
						<ListItem>You {check_inference("Alcohol Consumers") ? "" : "do not "} drink alcohol</ListItem>
						{check_inference("College Students") ? <ListItem>You are a college student</ListItem> : null}
						{check_inference("Frequent Shoppers") ? <ListItem>You shop a lot</ListItem> : null}
						{check_inference("Cosmetics Buyers") ? <ListItem>You buy cosmetics</ListItem> : null}
						{check_inference("Commuters") ? <ListItem>You are a commuter</ListItem> : null}
						{check_inference("Car Owners") ? <ListItem>You own a car</ListItem> : null}
						{check_inference("Home Owners") ? <ListItem>You own a home</ListItem> : null}
						{genres !== null ? (
							<ListItem>You like these kinds of movies: {genres.join(", ")}</ListItem>
						) : null}
						{check_inference("Fitness Enthusiasts") ? (
							<ListItem>You are a "fitness enthusiast"</ListItem>
						) : null}
						{check_inference("Gamers") ? <ListItem>You are a gamer</ListItem> : null}
						{check_inference("Outdoor Enthusiasts") ? <ListItem>You like the outdoors</ListItem> : null}
						{check_inference("") ? <ListItem></ListItem> : null}
					</List>
				</CardContent>
			</Card>
		</>
	);
}