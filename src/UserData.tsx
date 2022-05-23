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

	const Identity_R = () => {
		if (identity !== undefined) {
			if (
				!(
					(identity.firstName !== "" && identity.firstName !== null) ||
					(identity.lastName !== "" && identity.lastName !== null)
				)
			) {
				return <></>;
			}

			return (
				<DataItem>
					Your name is {identity.firstName} {identity.lastName}
				</DataItem>
			);
		}
		return <></>;
	};

	const UserData_R = () => {
		if (userData !== undefined) {
			let loc =
				"You live" +
				(userData.postalCode ? " around " + userData.postalCode : "") +
				(userData.country ? " in " + countryNames.of(userData.country) : "");
			return (
				<>
					{userData.facebookUid && <DataItem>You have a Facebook account</DataItem>}
					{userData.birthdate && (
						<DataItem>
							Your birthday is {dayjs(userData.birthdate, "YYYY-MM-dd").format("MMMM D, YYYY")}
						</DataItem>
					)}
					{userData.gender && <DataItem>Your gender is {userData.gender}</DataItem>}
					{userData.mobileNumber && <DataItem>Your phone number is {userData.mobileNumber}</DataItem>}
					{userData.mobileBrand && <DataItem>Your phone is a(n) {userData.mobileBrand}</DataItem>}
					{loc !== "You live" && <DataItem>{loc}</DataItem>}
				</>
			);
		}
		return <></>;
	};

	const NoData_R = () => {
		if (userData === undefined && identity === undefined) {
			return <Typography>Spotify didn't provide any personal data.</Typography>;
		}
		return <></>;
	};

	return (
		<Card>
			<CardContent>
				<Typography variant="h5">User Data and Identity</Typography>
				<Typography variant="h6">Spotify knows that...</Typography>
				<List>
					{<Identity_R />}
					{<UserData_R />}
					{<NoData_R />}
				</List>
			</CardContent>
		</Card>
	);
}
