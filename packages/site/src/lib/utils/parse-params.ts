export const parseParams = (url: URL) => {
	return {
		page: +(url.searchParams.get('page') || 1),
		take: +(url.searchParams.get('take') || 10),
		q: url.searchParams.get('q') ?? undefined,
	};
};
