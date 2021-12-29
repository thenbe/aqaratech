// src/lib/services/auth.js
import createAuth0Client from '@auth0/auth0-spa-js';
import { user, isAuthenticated, popupOpen } from '$lib/stores/auth';
import config from '$lib/config/auth_config';
import { session } from '$app/stores';
async function createClient() {
	const auth0Client = await createAuth0Client({
		domain: config.domain,
		client_id: config.clientId,
		// audience: "hasura-28-dec"
	});

	return auth0Client;
}

async function loginWithPopup(client) {
	// console.log('options', options);
	popupOpen.set(true);
	try {
		await client.loginWithPopup();

		user.set(await client.getUser());
		isAuthenticated.set(true);
		// session.set({isAuth: true})
	} catch (e) {
		// eslint-disable-next-line
		console.error(e);
	} finally {
		popupOpen.set(false);
	}
}

function logout(client) {
	return client.logout();
}

const auth = {
	createClient,
	loginWithPopup,
	logout,
};

export default auth;
