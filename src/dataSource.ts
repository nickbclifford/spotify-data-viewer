// TODO: schema for real data, better typed getCategory

export default class DataSource {
	// unparsed raw strings
	private unparsed: Record<string, string> = {};
	// cache for parsed JSON
	private parsed: Record<string, any> = {};

	addCategory(category: string, jsonSource: string) {
		this.unparsed[category] = jsonSource;
	}

	getCategory(category: string): any {
		let value = this.parsed[category];

		if (typeof value === "undefined") {
			value = JSON.parse(this.unparsed[category]);
			delete this.unparsed[category];
			this.parsed = value;
		}

		return value;
	}

	get categories(): string[] {
		return Object.keys(this.unparsed).concat(Object.keys(this.parsed));
	}
}
