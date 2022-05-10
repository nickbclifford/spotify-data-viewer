import React from "react";
import DataSource from "./dataSource";
import { Card, CardContent } from "@mui/material";

interface ExplorerProps {
	source: DataSource;
}

export default function Explorer({ source }: ExplorerProps) {
	return (
		<Card>
			<CardContent>You have the following categories of data: {source.categories.join(", ")}</CardContent>
		</Card>
	);
}
