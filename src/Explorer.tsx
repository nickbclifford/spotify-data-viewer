import React from "react";
import DataSource from "./dataSource";
import { Box, Card, CardContent, List, ListItem, ListItemText, Typography } from "@mui/material";
import { MusicNote, VapingRooms } from "@mui/icons-material";
import Inferences from "./Inferences";
import Playlists from "./Playlists";

interface ExplorerProps {
	source: DataSource;
}

export default function Explorer({ source }: ExplorerProps) {
	return (
		<>
			<Playlists source={source} />
			<Inferences source={source} />
		</>
	);
}
