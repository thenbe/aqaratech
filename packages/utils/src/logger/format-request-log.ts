interface LoggedRequest {
	method: string;
}

export const formatRequestLog = ({
	request,
	url,
	extra,
}: {
	request: LoggedRequest;
	url: URL;
	extra?: Record<string, unknown>;
}) => {
	return {
		level: 'info',
		message: JSON.stringify({
			httpType: 'request',
			method: request.method,
			pathname: url.pathname,
			url: url.href,
			...extra,
		}),
	};
};
