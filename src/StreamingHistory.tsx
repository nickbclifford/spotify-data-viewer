import React from "react";
import DataSource from "./dataSource";
import { Card, CardContent, Typography } from "@mui/material";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { DataGrid } from "@mui/x-data-grid";

dayjs.extend(duration);
dayjs.extend(relativeTime);

interface HistoryProps {
	source: DataSource;
}

interface SongData {
	totalListens: number;
	timeListened: duration.Duration;
	lastListen: dayjs.Dayjs;
}

export default function StreamingHistory({ source }: HistoryProps) {
	const history = source.getCategory("StreamingHistory0");

	const data = new Map<string, SongData>();
	for (const song of history) {
		const key = JSON.stringify([song.artistName, song.trackName]);

		const newData = data.get(key) ?? {
			totalListens: 0,
			timeListened: dayjs.duration(0),
			lastListen: dayjs(),
		};

		newData.totalListens++;
		newData.timeListened = newData.timeListened.add(song.msPlayed, "milliseconds");
		newData.lastListen = dayjs(song.endTime, "YYYY-MM-DD HH:mm");

		data.set(key, newData);
	}

	return (
		<Card>
			<CardContent>
				<Typography variant="h5">Streaming History</Typography>
				<DataGrid
					sx={{ marginTop: "1%", minHeight: "40vh" }}
					columns={[
						{ field: "artistName", headerName: "Artist", width: 150 },
						{ field: "trackName", headerName: "Track", width: 150 },
						{ field: "totalListens", headerName: "# Listens", sortable: true },
						{
							field: "timeListened",
							headerName: "Total Time Listened",
							width: 150,
							sortable: true,
							sortComparator: (d1, d2) => d1.asMilliseconds() - d2.asMilliseconds(),
							renderCell: d => d.row.timeListened.humanize(),
						},
						{
							field: "lastListen",
							headerName: "Last Time Listened",
							width: 150,
							sortable: true,
							renderCell: d => d.row.lastListen.fromNow(),
						},
					]}
					rows={Array.from(data).map(([k, v], id) => {
						const [artistName, trackName] = JSON.parse(k);
						return {
							id,
							artistName,
							trackName,
							...v,
						};
					})}
				/>
			</CardContent>
		</Card>
	);
}
