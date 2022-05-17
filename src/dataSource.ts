export interface Playlist {
	name: string;
	lastModifiedDate: string; // YYYY-MM-DD
	items: Array<{
		track: Record<"trackName" | "artistName" | "albumName" | "trackUri", string>;
		episode: string | null; // if podcast, name of episode
		localTrack: string | null; // if local file, name of track
	}>;
	description: string;
	numberOfFollowers: number;
}
export interface SingleStream {
	endTime: string; // YYYY-MM-DD HH:mm
	artistName: string;
	trackName: string;
	msPlayed: number;
}
export interface Library {
	tracks: Array<Record<"artist" | "album" | "track" | "uri", string>>;
	albums: Array<Record<"artist" | "album" | "uri", string>>;
	artist: Array<Record<"name" | "uri", string>>;
	// TODO: these arrays have no entries in my dump
	shows: never[];
	episodes: never[];
	bannedTracks: never[];
	bannedArtists: never[];
	other: never[];
}
export interface SingleSearch {
	platform: string;
	searchTime: string; // YYYY-MM-DDTHH:mm:ss.SSSZ[UTC]
	searchQuery: string;
	searchInteractionURIs: string[];
}
export interface Follow {
	followerCount: number;
	followingUsersCount: number;
	dismissingUsersCount: number;
}
export interface UserData {
	username: string;
	email: string;
	country: string;
	createdFromFacebook: boolean;
	facebookUid: string | null; // TODO this is a guess, my dump is just null
	birthdate: string; // YYYY-MM-dd
	gender: string;
	postalCode: string;
	mobileNumber: string;
	mobileOperator: string;
	mobileBrand: string;
	creationTime: string; // YYYY-MM-dd
}

export interface DataMap {
	Playlist1: { playlists: Playlist[] };
	StreamingHistory0: SingleStream[];
	YourLibrary: Library;
	SearchQueries: SingleSearch[];
	Follow: Follow;
	Userdata: UserData;
	Inferences: { inferences: string[] };
}

export default class DataSource {
	// unparsed raw strings
	private unparsed: Record<string, string> = {};
	// cache for parsed JSON
	private parsed: Record<string, any> = {};

	addCategory(category: string, jsonSource: string) {
		this.unparsed[category] = jsonSource;
	}

	getCategory<K extends keyof DataMap>(category: K): DataMap[K] {
		let value = this.parsed[category];

		if (typeof value === "undefined") {
			value = JSON.parse(this.unparsed[category]);
			delete this.unparsed[category];
			this.parsed[category] = value;
		}

		return value;
	}

	get categories(): string[] {
		return Object.keys(this.unparsed).concat(Object.keys(this.parsed));
	}
}
