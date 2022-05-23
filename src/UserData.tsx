import React from "react";
import DataSource from "./dataSource";
import { Card, CardContent, List, ListItem, Typography } from "@mui/material";
import dayjs from "dayjs";

interface UserDataProps {
	source: DataSource;
}

const DataItem = (p: React.ComponentProps<typeof Typography>) => (
	<ListItem>
		<Typography {...p} />
	</ListItem>
);

const countryNames = new Intl.DisplayNames(["en"], { type: "region" });

export default function UserData({ source }: UserDataProps) {
	const identity = source.getCategory("Identity");
	const userData = source.getCategory("Userdata");

	return (
		<Card>
			<CardContent>
				<Typography variant="h5">User Data and Identity</Typography>
				<Typography variant="h6">Spotify knows that...</Typography>
				<List>
					{identity.firstName && identity.lastName && (
						<DataItem>
							Your name is {identity.firstName} {identity.lastName}
						</DataItem>
					)}
					{userData.facebookUid && <DataItem>You have a Facebook account</DataItem>}
					<DataItem>
						Your birthday is {dayjs(userData.birthdate, "YYYY-MM-dd").format("MMMM D, YYYY")}
					</DataItem>
					<DataItem>Your gender is {userData.gender}</DataItem>
					<DataItem>Your phone number is {userData.mobileNumber}</DataItem>
					<DataItem>Your phone is a(n) {userData.mobileBrand}</DataItem>
					<DataItem>
						You live around {userData.postalCode} in {countryNames.of(userData.country)}
					</DataItem>
				</List>
			</CardContent>
		</Card>
	);
}
