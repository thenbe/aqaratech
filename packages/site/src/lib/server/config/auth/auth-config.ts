import type { AuthConfigType } from '$lib/models/types/auth.type';

import { environment } from '$aqenvironment';
import { AUTH_CALLBACK } from '$lib/constants/routes';
import { isProd } from '$lib/server/config/is-production';
import { privateEnvironment } from '$lib/server/config/private-environment';

/**
 * Get the auth config for the current environment.
 */
export const getAuthConfig = () => {
	const config = isProd
		? {
				...baseProd,
				AUTH0_CLIENT_SECRET: privateEnvironment.AUTH0_CLIENT_SECRET,
		  }
		: {
				...baseDev,
				AUTH0_CLIENT_SECRET:
					'uSR4Gjf3XNN-1kfZGuppDqRdbz7XD6A4o2g8yY1GdZgqCXeYhWhdqfPUoIIJLBRf',
		  };

	return config satisfies AuthConfigType;
};

export const baseProd = {
	AUTH0_CLIENT_ID: 'BiIwmY0aGldYHDkkdEVsTBbKAAE1AaQV',
	AUTH0_DOMAIN: 'https://auth.aqaratech.com',
	AUTH0_DEFAULT_DOMAIN: 'https://aqaratech.eu.auth0.com',
	AUTH0_REDIRECT_URI: `https://aqaratech.com${AUTH_CALLBACK}`,
	AUTH0_API_NAMESPACE: 'https://aqaratech.com',
	AUTH0_API_AUDIENCE: 'https://aqaratech.com/api',
	JWKS: {
		keys: [
			{
				alg: 'RS256',
				kty: 'RSA',
				use: 'sig',
				n: '-6_lIXUxSqmmFsrvUpL3c7gzDKSqC41XnXjrnLcrAwQ6ow0XfC-7agl6dhWDvMN2lsK0tAAIYbiT0E-LUgv_NAUbp3kqLVuva35vwNQ92DE14x4csWX_OYfummShXjfzyu08r8_xFTLNfxD3iPPakyaYuLfSv2eQcUJPIvVlWgf93x9hr76slvG3YlMZPfClcywbnEKL8oVxTh3c456F0ZrZiPKcB4eWkvnvD1vg5QTssgUpEPdU2JvpQdvx3fOS9Xu8ef1c58lBYXe3H5xdcJwiuDHMao0dY6q0thmykqBAXDb4dNzSDoxvb2G2LADTiBoS0wys9UJ-QoQ-Rkcb8w',
				e: 'AQAB',
				kid: '1hBeQiWQZQ_YO_NuJ2mLS',
				x5t: 'c7t2cnDkJK-rm7jmHKaD2fstfoU',
				x5c: [
					'MIIDBzCCAe+gAwIBAgIJHHU1Vkpvm/vvMA0GCSqGSIb3DQEBCwUAMCExHzAdBgNVBAMTFmFxYXJhdGVjaC5ldS5hdXRoMC5jb20wHhcNMjIwNDE4MDAwNDAwWhcNMzUxMjI2MDAwNDAwWjAhMR8wHQYDVQQDExZhcWFyYXRlY2guZXUuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+6/lIXUxSqmmFsrvUpL3c7gzDKSqC41XnXjrnLcrAwQ6ow0XfC+7agl6dhWDvMN2lsK0tAAIYbiT0E+LUgv/NAUbp3kqLVuva35vwNQ92DE14x4csWX/OYfummShXjfzyu08r8/xFTLNfxD3iPPakyaYuLfSv2eQcUJPIvVlWgf93x9hr76slvG3YlMZPfClcywbnEKL8oVxTh3c456F0ZrZiPKcB4eWkvnvD1vg5QTssgUpEPdU2JvpQdvx3fOS9Xu8ef1c58lBYXe3H5xdcJwiuDHMao0dY6q0thmykqBAXDb4dNzSDoxvb2G2LADTiBoS0wys9UJ+QoQ+Rkcb8wIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBS/Ews+Xk3YZXpQ+2NU2GhQl0ODLTAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBADKr2MgfH+PZ4wyfMm289H+Fwg6VpksMjp6t1q8/jIBziRmPwJ/oxVclPwfVN8pBeUalhR/MBxAUCHzwyyMR6veq49MJ+VMrP+EL1yA+B1/75+JUP+IvowU1M7XCnpyNEr4o7+Ndqu0VhlL+7cpBtjKYymRRM/t51chXES5sVc2JzjNIdaS/s48aCrvKKj5Qg5CLdxPvV8RRpbbof2uSBYAGNv6onIWYVVH1icGVq22et3NUF2UfA1r4P35c0x/tmh3PFZojvCmtF2Ir8vx0zuDV+NNKCkA3JWFt5D8aiVdERPcUFNzmWSuw4v4cwr7Po/QOU70rhu/O/EmtLSY0fjY=',
				],
			},
			{
				alg: 'RS256',
				kty: 'RSA',
				use: 'sig',
				n: 'zZuiffgt-PYJOJ6lHbN9Zx5-sRfjCcLTwhqPqwQcb0tQLMXIJA4FA1NE1hZt87RZTd5xQiP9M0QPDU6T6eScpNnU5YW7DZCsHphypglZtV2m110QJ5nHWb0p7hinKzpfSXYj0YNoCahxe9ZNEzb-vNIoDMg89GODKamd7yvddHH3NUaXwq9KW6f4JlCDwwUGzhQ5ekC-n9wpfY9ouVcPOb4gABSzp6v3B0HIBWu3BbgdnXBLd21XIQrPel_oTTF6bCBQov-JpE9oFrbcj8wYkFFr_bFQjq_A9Vr2BNWG-KMIgkA0FZFyVxCsXG1oZYvZaEK7OKjWvFHsu885A5WcDQ',
				e: 'AQAB',
				kid: 'vRVKBKOIFqd-UUevq3sAp',
				x5t: 'fjiFy0aSSfN0xnqjeZoTrE3Tqc0',
				x5c: [
					'MIIDBzCCAe+gAwIBAgIJZ+RttT4hdcg1MA0GCSqGSIb3DQEBCwUAMCExHzAdBgNVBAMTFmFxYXJhdGVjaC5ldS5hdXRoMC5jb20wHhcNMjIwNDE4MDAwNDAwWhcNMzUxMjI2MDAwNDAwWjAhMR8wHQYDVQQDExZhcWFyYXRlY2guZXUuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzZuiffgt+PYJOJ6lHbN9Zx5+sRfjCcLTwhqPqwQcb0tQLMXIJA4FA1NE1hZt87RZTd5xQiP9M0QPDU6T6eScpNnU5YW7DZCsHphypglZtV2m110QJ5nHWb0p7hinKzpfSXYj0YNoCahxe9ZNEzb+vNIoDMg89GODKamd7yvddHH3NUaXwq9KW6f4JlCDwwUGzhQ5ekC+n9wpfY9ouVcPOb4gABSzp6v3B0HIBWu3BbgdnXBLd21XIQrPel/oTTF6bCBQov+JpE9oFrbcj8wYkFFr/bFQjq/A9Vr2BNWG+KMIgkA0FZFyVxCsXG1oZYvZaEK7OKjWvFHsu885A5WcDQIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBTTsmK3OhX//s0/meFa10HfcVILsTAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAMlMZV5mcG+fsYuRTr3NyhA4imTmZXnUJsrfSLm5QdAmLU0GSHJnw6xWgzkKzlBvkXYvC6mwD01Q2gTiJAS3j75QlOTwanyVmwvWFzsQYzCuBMWGjEGel9Het/KNQdxosAgOG/MXMKrhi04DQEEDAjK/HXgoSOEDt/3oohSxqHdj8FYcqFXmrpvtT1s7nV42lP9UtP6NKbK4hCkE3mb446Zi6oOxoFHi3I6mrnbc+/1KH4vZYWWEAse2AWTcafrDF+khUVc6S/+LaWAwBjmYBCH5T/x+Ai/SY8bIf5HwGwcYnCO40Q0q0PcDqGDq3ezhh2Wb3VBBiczEhNvitEQYdWk=',
				],
			},
		],
	},
} satisfies Omit<AuthConfigType, 'AUTH0_CLIENT_SECRET'>;

export const baseDev = {
	AUTH0_CLIENT_ID: 'z6oqyOuPLao6XhJeCje9tZ8ZbiJa5zct',
	AUTH0_DOMAIN: 'https://dev-eehvhdp2.eu.auth0.com',
	AUTH0_DEFAULT_DOMAIN: 'https://dev-eehvhdp2.eu.auth0.com',
	AUTH0_REDIRECT_URI: `${environment.PUBLIC_SITE_URL}${AUTH_CALLBACK}`,
	AUTH0_API_NAMESPACE: 'https://letand.be',
	AUTH0_API_AUDIENCE: 'letand.be/api',
	JWKS: {
		keys: [
			{
				alg: 'RS256',
				kty: 'RSA',
				use: 'sig',
				n: 'ty7ykF-72NiokwwsZJR3t15VMS2SGAzxac-DkPpRSsYtMsKVgBBt-jCdKeHkAt_k8vphRFyjFm8k-a-TNTCWtGnHP9LWQK4s6ZTNzktAHb_qbNg8kfV8cYvQGO-X0UCGmg7h3BHpBTx5IZFBSeG3MLRyfEvjZS0Ys8XrB5e3pS8KgkaUgcEB9wAXRwg0w7ZpAns6rq_7KEvZX_vEsufzcIFMF3dLIywXnN493Y186qf6bx-tW-NsXzZd6qtvxW03_xVMlgMXRvlY-BEs_uk1dhYndo9mz8kSYm1dLjyt-5EcIqUnPxXA46-Pqd6cAAgUCPfu439es850P1JVd9CYgQ',
				e: 'AQAB',
				kid: 'eoJj1hlBuhYdXt6cym6m3',
				x5t: 'njrntKD4tsaJWk1BQB8WAlHdVas',
				x5c: [
					'MIIDDTCCAfWgAwIBAgIJRejdsvKplhN/MA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNVBAMTGWRldi1lZWh2aGRwMi5ldS5hdXRoMC5jb20wHhcNMjExMjExMTgyNDI3WhcNMzUwODIwMTgyNDI3WjAkMSIwIAYDVQQDExlkZXYtZWVodmhkcDIuZXUuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAty7ykF+72NiokwwsZJR3t15VMS2SGAzxac+DkPpRSsYtMsKVgBBt+jCdKeHkAt/k8vphRFyjFm8k+a+TNTCWtGnHP9LWQK4s6ZTNzktAHb/qbNg8kfV8cYvQGO+X0UCGmg7h3BHpBTx5IZFBSeG3MLRyfEvjZS0Ys8XrB5e3pS8KgkaUgcEB9wAXRwg0w7ZpAns6rq/7KEvZX/vEsufzcIFMF3dLIywXnN493Y186qf6bx+tW+NsXzZd6qtvxW03/xVMlgMXRvlY+BEs/uk1dhYndo9mz8kSYm1dLjyt+5EcIqUnPxXA46+Pqd6cAAgUCPfu439es850P1JVd9CYgQIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBQN/ULMKyknpAz/wFNJBR4muJYX1jAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAHWubNrAQqT/PAqd56CaFps6MAGrWCuV/YjskxodbuIjoIvO9wm5bNTnTerDsirsiDF9wwl2VhH+Zu1DbEJteIrRcIhFGjAOudw5Ix9m4gn7biqMBd1z6mTBXfEpLtywCYoL1rbuNqM9yD7JjrE/bDytZh/kzIT7s0KKXFVtxx1l1HFd4+V/y0mSWQ/o+eyEFNyEZD//lZnGwPA/EaE3bp6Y5iQWF7KvzRWvU9W2ExS9JnzsldX3OeLhQ7+p+azfRe7ERuJV7V3i1oiNbpSwEs907q2ilVoCYY4Kp05OqrseaLG+HL77qMaMfXKVbGY2rFWdipTBCYWyMXWvyzbHy5A=',
				],
			},
			{
				alg: 'RS256',
				kty: 'RSA',
				use: 'sig',
				n: 'v8KzFwNyNceQjfs1IXqjwOCgqMss507TUA3F_U-RoZmrnclbcxjuI4WE1_iFgRFnKdFOxpr5oJhGvI3pp4k8Oq_HbHNchoXk00Jd4sqykKeCSCSxliJpKlIrvB4DIBOkQeX6ihoqEY6-YXQ0BcSvvXeUh6jJxypnuK6731FwJ32LcOmJCLIeHtF2VZwv3IpJPFWyGuB5AcEDfB0VfpoHuk6QBNEgi9U10I_gJDGDdY7BCwTXshMvWaGY_TbOLb5eC1y4dZAp_CGh5LURjmTe2h91xBCu9W8Vu6n-kTHAfjizm-6kXxe7HQTRYWEwwDdt3f9iOTU-kH502JKgOxz6bw',
				e: 'AQAB',
				kid: 'kXp8dyTMzfS5656AC2_gb',
				x5t: 'eOBBAgZpY4GYgOweWhKzrJw7_QM',
				x5c: [
					'MIIDDTCCAfWgAwIBAgIJNkWczeRHeBpRMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNVBAMTGWRldi1lZWh2aGRwMi5ldS5hdXRoMC5jb20wHhcNMjExMjExMTgyNDI3WhcNMzUwODIwMTgyNDI3WjAkMSIwIAYDVQQDExlkZXYtZWVodmhkcDIuZXUuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv8KzFwNyNceQjfs1IXqjwOCgqMss507TUA3F/U+RoZmrnclbcxjuI4WE1/iFgRFnKdFOxpr5oJhGvI3pp4k8Oq/HbHNchoXk00Jd4sqykKeCSCSxliJpKlIrvB4DIBOkQeX6ihoqEY6+YXQ0BcSvvXeUh6jJxypnuK6731FwJ32LcOmJCLIeHtF2VZwv3IpJPFWyGuB5AcEDfB0VfpoHuk6QBNEgi9U10I/gJDGDdY7BCwTXshMvWaGY/TbOLb5eC1y4dZAp/CGh5LURjmTe2h91xBCu9W8Vu6n+kTHAfjizm+6kXxe7HQTRYWEwwDdt3f9iOTU+kH502JKgOxz6bwIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBTi2sNJ+6yTS+Z9Oq6N7BfTA/YpWTAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAJvwdAx1URTyuRFFrM6ZUpU95+a9J2zF9OCuMtT0waAkldkbi63oRNdds9YKWdIAc44IlY8HyirmCuDjy1v3nVbUoya97aOnc/HaBr9ZO2ohr5N8hoSf4fqqyxKVGmrSZCSxYpZC1VkD6tpVNGYkzwjZa/J4HwQWYWGNWFO2Veajl4kSOOLqVO0yJK6niG4GiEQhRprmkGNkyInv8PUgnWo6yXHYmtkdvai43l8RVrntrgo1i1ZWi8XnJOQBQg6dGFbYR1R5/wRHAVCd9VaOVTsEWpFJnKSItsGkCB116OkolMIU1+didV2ec9uGrN7f71tgx6vNy2NLVPn/l26DCLw=',
				],
			},
		],
	},
} satisfies Omit<AuthConfigType, 'AUTH0_CLIENT_SECRET'>;
