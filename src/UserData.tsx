import React from "react";
import DataSource from "./dataSource";
import { Box, Card, CardContent, List, ListItem, ListItemText, Typography } from "@mui/material";

interface ExplorerProps {
	source: DataSource;
}

export default function UserData({ source }: ExplorerProps) {
	let user_data = source.getCategory("Userdata");

	return (
		<Card>
			<CardContent>
				<Typography variant="h5">User Data</Typography>
				<Typography variant="h6">Spotify knows that...</Typography>
				<List>
					{user_data.facebookUid !== null && <ListItem>Your Facebook is {user_data.facebookUid}</ListItem>}
					{user_data.birthdate !== null && <ListItem>Your birthday is {user_data.birthdate}</ListItem>}
					{user_data.gender !== null && <ListItem>your gender is {user_data.gender}</ListItem>}
					{user_data.mobileNumber !== null && (
						<ListItem>Your phone number is {user_data.mobileNumber}</ListItem>
					)}
					{user_data.mobileBrand !== null && <ListItem>You have a {user_data.mobileBrand} phone</ListItem>}
					{user_data.country !== null && <ListItem>You live in this country: {user_data.country}</ListItem>}
					{user_data.postalCode !== null && <ListItem>Your postal code is {user_data.postalCode}</ListItem>}
				</List>
			</CardContent>
		</Card>
	);
}