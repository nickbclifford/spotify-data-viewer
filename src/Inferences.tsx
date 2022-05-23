import React from "react";
import DataSource from "./dataSource";
import { Card, CardContent, List, ListItem, Typography } from "@mui/material";
import {
	Android,
	Apple,
	Book,
	Celebration,
	Commute,
	DirectionsCar,
	FitnessCenter,
	House,
	Liquor,
	LocalMall,
	Movie,
	NaturePeople,
	Pets,
	School,
	ShoppingBag,
	SvgIconComponent,
	VideogameAsset,
} from "@mui/icons-material";

interface InferenceProps {
	condition: boolean;
	children: React.ReactNode;
	icon?: SvgIconComponent;
}
function Inference({ children, condition, icon: Icon }: InferenceProps) {
	if (condition) {
		return (
			<ListItem>
				{Icon && (
					<Icon
						sx={{ marginRight: "2%", borderRadius: "100%", backgroundColor: "primary.main", padding: "1%" }}
					/>
				)}
				<Typography>{children}</Typography>
			</ListItem>
		);
	}

	return null;
}

interface InferencesProps {
	source: DataSource;
}
export default function Inferences({ source }: InferencesProps) {
	const inferences = source.getCategory("Inferences")?.inferences;
	if (!inferences) return null;

	const check_inference = (substring: string) => {
		let match = inferences.find(element => element.includes(substring));
		return match !== undefined;
	};

	const genres: string[] = [];
	for (const item of inferences) {
		if (item.includes("Movie Enthusiasts") && item.substring(0, 3) === "3P_") {
			let clean = item.split(" ")[0].substring(3);
			if (clean.length > 0 && !genres.includes(clean)) {
				genres.push(clean);
			}
		}
	}

	return (
		<Card sx={{ maxWidth: { lg: "25%" } }}>
			<CardContent>
				<Typography variant="h5">Inferences</Typography>
				<Typography variant="h6">Spotify guesses that...</Typography>
				<List>
					<Inference condition={check_inference("Apple iOS Users")} icon={Apple}>
						You are an Apple user
					</Inference>
					<Inference condition={check_inference("Android Users")} icon={Android}>
						You are an Android user
					</Inference>
					<Inference condition={check_inference("Alcohol Consumers")} icon={Liquor}>
						You drink alcohol
					</Inference>
					<Inference condition={check_inference("College Students")} icon={School}>
						You are a college student
					</Inference>
					<Inference condition={check_inference("Pet Owners")} icon={Pets}>
						You own a pet
					</Inference>
					<Inference condition={check_inference("Frequent Shoppers")} icon={ShoppingBag}>
						You shop a lot
					</Inference>
					<Inference condition={check_inference("Cosmetics Buyers")} icon={LocalMall}>
						You buy cosmetics
					</Inference>
					<Inference condition={check_inference("Commut")} icon={Commute}>
						You are a commuter
					</Inference>
					<Inference condition={check_inference("Car Owners")} icon={DirectionsCar}>
						You own a car
					</Inference>
					<Inference condition={check_inference("Home Owners")} icon={House}>
						You own a home
					</Inference>
					<Inference condition={genres.length !== 0} icon={Movie}>
						You like these kinds of movies: {genres.join(", ")}
					</Inference>
					<Inference condition={check_inference("Party")} icon={Celebration}>
						You like partying
					</Inference>
					<Inference condition={check_inference("Fitness Enthusiasts")} icon={FitnessCenter}>
						You are a fitness enthusiast
					</Inference>
					<Inference condition={check_inference("Gamers")} icon={VideogameAsset}>
						You are a gamer
					</Inference>
					<Inference condition={check_inference("Books")} icon={Book}>
						You like books
					</Inference>
					<Inference condition={check_inference("Outdoor Enthusiasts")} icon={NaturePeople}>
						You like the outdoors
					</Inference>
				</List>
			</CardContent>
		</Card>
	);
}
