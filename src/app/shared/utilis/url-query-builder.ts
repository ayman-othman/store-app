export class UrlQueryBuilder {
	static buildUrlQuery(baseURL: string, endpoint: string, payload: any) {
		const urlQuery = new URL(baseURL + endpoint);
		Object?.keys(payload)?.forEach(
			(key: string) =>
				payload[key] !== null &&
				urlQuery.searchParams.append(key, payload[key])
		);
		return urlQuery;
	}
}
