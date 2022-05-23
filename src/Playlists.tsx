import React from "react";
import DataSource from "./dataSource";
import { Box, Card, CardContent, List, ListItem, ListItemText, Typography } from "@mui/material";
import { MusicNote } from "@mui/icons-material";

interface PlaylistsProps {
	source: DataSource;
}

export default function Playlists({ source }: PlaylistsProps) {
	const playlists = source.getCategory("Playlist1")?.playlists;
	if (!playlists) return null;

	return (
		<Card sx={{ maxWidth: { lg: "40%" } }}>
			<CardContent>
				<Typography variant="h5">Playlists</Typography>
				<List>
					{playlists.map((p, i) => (
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
			</CardContent>
		</Card>
	);
}
