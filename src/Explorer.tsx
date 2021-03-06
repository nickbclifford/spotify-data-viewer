import React from "react";
import DataSource from "./dataSource";
import Inferences from "./Inferences";
import Playlists from "./Playlists";
import UserData from "./UserData";
import StreamingHistory from "./StreamingHistory";

interface ExplorerProps {
	source: DataSource;
}

export default function Explorer({ source }: ExplorerProps) {
	return (
		<>
			<Playlists source={source} />
			<StreamingHistory source={source} />
			<Inferences source={source} />
			<UserData source={source} />
		</>
	);
}
