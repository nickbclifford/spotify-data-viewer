import React from "react";
import DataSource from "./dataSource";
import { Card, CardContent, List, ListItem, Typography } from "@mui/material";

interface InferencesProps {
	source: DataSource;
}

export default function Inferences({ source }: InferencesProps) {
	let inferences = source.getCategory("Inferences").inferences;
	const check_inference = (substring: string) => {
		let match = inferences.find(element => element.includes(substring));
		return match !== undefined;
	};
	const movie_types = () => {
		const genres: string[] = [];
		for (const item of inferences) {
			if (item.includes("Movie Enthusiasts") && item.substring(0, 3) === "3P_") {
				let clean = item.split(" ")[0].substring(3);
				if (clean.length > 0 && !genres.includes(clean)) {
					genres.push(clean);
				}
			}
		}
		return genres;
	};
	const genres = movie_types();

	return (
		<Card sx={{ maxWidth: { lg: "25%" } }}>
			<CardContent>
				<Typography variant="h5">Inferences</Typography>
				<Typography variant="h6">Spotify guesses that...</Typography>
				<List>
					<ListItem>You are {check_inference("Apple iOS Users") ? "" : "not "} an apple user</ListItem>
					<ListItem>You {check_inference("Alcohol Consumers") ? "" : "do not "} drink alcohol</ListItem>
					{check_inference("College Students") ? <ListItem>You are a college student</ListItem> : null}
					{check_inference("Frequent Shoppers") ? <ListItem>You shop a lot</ListItem> : null}
					{check_inference("Cosmetics Buyers") ? <ListItem>You buy cosmetics</ListItem> : null}
					{check_inference("Commuters") ? <ListItem>You are a commuter</ListItem> : null}
					{check_inference("Car Owners") ? <ListItem>You own a car</ListItem> : null}
					{check_inference("Home Owners") ? <ListItem>You own a home</ListItem> : null}
					{genres !== null ? <ListItem>You like these kinds of movies: {genres.join(", ")}</ListItem> : null}
					{check_inference("Fitness Enthusiasts") ? (
						<ListItem>You are a "fitness enthusiast"</ListItem>
					) : null}
					{check_inference("Gamers") ? <ListItem>You are a gamer</ListItem> : null}
					{check_inference("Outdoor Enthusiasts") ? <ListItem>You like the outdoors</ListItem> : null}
				</List>
			</CardContent>
		</Card>
	);
}
