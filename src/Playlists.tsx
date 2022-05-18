import React from "react";
import DataSource from "./dataSource";
import { Box, Card, CardContent, List, ListItem, ListItemText, Typography } from "@mui/material";
import { MusicNote, VapingRooms } from "@mui/icons-material";

interface ExplorerProps {
	source: DataSource;
}

export default function Playlists({ source }: ExplorerProps) {
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
					`You have the following data categories: ${source.categories.join(", ")}`
				)}
			</CardContent>
		</Card>
	);
}
