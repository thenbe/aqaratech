/* eslint-disable import/prefer-default-export */
//  Endpoint for redirection from GitHub after authorization...

const tokenURL = 'https://dev-eehvhdp2.eu.auth0.com/oauth/token';
const userURL = 'https://api.github.com/user';

const ghAuthURL = 'https://dev-eehvhdp2.eu.auth0.com/authorize';
const clientId = 'z6oqyOuPLao6XhJeCje9tZ8ZbiJa5zct';
const scope = 'openid profile';
const redirectUri = 'http://localhost:3000/callback';
const secret =
	'uSR4Gjf3XNN-1kfZGuppDqRdbz7XD6A4o2g8yY1GdZgqCXeYhWhdqfPUoIIJLBRf';

export async function get(req) {
	//  ...uses that code query parameter from GitHub...
	const code = req.query.get('code');
	//  ...to get an access_token for the authorized user from GitHub...
	const accessToken = await getAccessToken(code);
	//  ...to get the user information from Github
	const user = await getUser(accessToken);
	// this mutates the locals object on the request
	// and will be read by the hooks/handle function
	// after the resolve
	req.locals.user = user.login;

	return {
		status: 302,
		headers: {
			location: '/',
		},
	};
}

async function getAccessToken(code) {
	const r = await fetch(tokenURL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		body: JSON.stringify({
			grant_type: 'authorization_code',
			client_id: clientId,
			client_secret: secret,
			code,
			redirect_uri: redirectUri,
		}),
	});
	const r_1 = await r.json();
	return r_1.access_token;
}

async function getUser(accessToken) {
	const r = await fetch(userURL, {
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return r.json();
}
