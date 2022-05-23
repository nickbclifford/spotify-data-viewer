import React from "react";
import DataSource, { UserData as UserDataT } from "./dataSource";
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

	function location({ postalCode, country }: UserDataT) {
		if (!postalCode && !country) return null;

		return (
			<DataItem>
				You live {postalCode && `around ${postalCode}`} {country && `in ${countryNames.of(country)}`}
			</DataItem>
		);
	}

	return (
		<Card>
			<CardContent>
				<Typography variant="h5">User Data and Identity</Typography>
				{!identity && !userData ? (
					<Typography>Spotify didn't provide any personal data.</Typography>
				) : (
					<>
						<Typography variant="h6">Spotify knows that...</Typography>
						<List>
							{identity?.firstName && identity?.lastName && (
								<DataItem>
									Your name is {identity.firstName} {identity.lastName}
								</DataItem>
							)}
							{userData?.facebookUid && <DataItem>You have a Facebook account</DataItem>}
							{userData?.birthdate && (
								<DataItem>
									Your birthday is {dayjs(userData.birthdate, "YYYY-MM-dd").format("MMMM D, YYYY")}
								</DataItem>
							)}
							{userData?.gender && <DataItem>Your gender is {userData.gender}</DataItem>}
							{userData?.mobileNumber && (
								<DataItem>Your phone number is {userData.mobileNumber}</DataItem>
							)}
							{userData?.mobileBrand && <DataItem>Your phone is a(n) {userData.mobileBrand}</DataItem>}
							{userData && location(userData)}
						</List>
					</>
				)}
			</CardContent>
		</Card>
	);
}
