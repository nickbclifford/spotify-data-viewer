import React from "react";
import DataSource from "./dataSource";
import { Box, Card, CardContent, List, ListItem, ListItemText, Typography } from "@mui/material";
import { MusicNote } from "@mui/icons-material";

interface PlaylistsProps {
	source: DataSource;
}

export default function Playlists({ source }: PlaylistsProps) {
	return (
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
					<Typography>You have the following data categories: {source.categories.join(", ")}</Typography>
				)}
			</CardContent>
		</Card>
	);
}
