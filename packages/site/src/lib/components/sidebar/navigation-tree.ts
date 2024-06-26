import { getRoute, PageTab, PageType, PageTypePortfolio } from '@self/utils';

import { NAV_KEY } from './nav-key';

import type L from '$i18n/i18n-svelte';
import type { Locales } from '$i18n/i18n-types';
import type { NavigationItem } from '$lib/components/sidebar/types';
import type { User } from '$lib/models/types/auth.type';
import type { ReadableOf } from '$lib/utils/readable-of';
import type { LoadEvent } from '@sveltejs/kit';

import { landingLinks } from '$lib/components/navbar/landing-links';
import { getDashboardLinks } from '$lib/components/sidebar/dashboard-links';
import { PREF_LOCALE } from '$lib/constants/misc';
import { LOGIN, LOGOUT, withLocale } from '$lib/constants/routes';
import { LOCALE_LABELS } from '$lib/i18n/locale-labels';
import { replaceLocaleInUrl } from '$lib/i18n/replace-local-url';
import { isHomeRoute } from '$lib/utils/route-utils';
import HeroiconsBanknotes from '~icons/heroicons/banknotes';
import HeroiconsNewspaper from '~icons/heroicons/newspaper';
// import HeroiconsCalculator from '~icons/heroicons/calculator';
// import HeroiconsCurrencyDollar from '~icons/heroicons/currency-dollar';
import HeroiconsReceiptPercent from '~icons/heroicons/receipt-percent';
import HeroiconsUserGroup from '~icons/heroicons/user-group';
import HeroiconsWrench from '~icons/heroicons/wrench';
import HeroiconsOutlineCog8Tooth from '~icons/heroicons-outline/cog-8-tooth';
import HeroiconsOutlineCollection from '~icons/heroicons-outline/collection';
import HeroiconsOutlineDocumentText from '~icons/heroicons-outline/document-text';
import HeroiconsOutlineHome from '~icons/heroicons-outline/home';
// import HeroiconsOutlineLogin from '~icons/heroicons-outline/login';
import HeroiconsOutlineLogout from '~icons/heroicons-outline/logout';
import HeroiconsOutlineUser from '~icons/heroicons-outline/user';
import MdiAbjadArabic from '~icons/mdi/abjad-arabic';
import RiEnglishInput from '~icons/ri/english-input';

export const getNavigationTree = (
	user: User | undefined,
	LL: ReadableOf<typeof L>,
	locale: Locales,
	route: LoadEvent['route'],
	url: LoadEvent['url'],
	orgPortfolioId: string | undefined,
): NavigationItem[] => {
	const tree: NavigationItem[] = [];

	// Locale
	const unselectedLocale = locale === 'en' ? 'ar' : 'en';

	const localeSwitch: NavigationItem = {
		name: LOCALE_LABELS[unselectedLocale],
		href: replaceLocaleInUrl(url, unselectedLocale),
		icon: locale === 'en' ? MdiAbjadArabic : RiEnglishInput,
		navKey: NAV_KEY.LOCALE_SWITCH,
		linkOptions: {
			'data-sveltekit-reload': '',
		},
		onClick: () => {
			if (document) {
				document.cookie = `${PREF_LOCALE}=${unselectedLocale}; path=/; max-age=31536000`;
			}
		},
	};

	tree.push(localeSwitch);

	// Login
	const login = {
		name: LL.buttons.login(),
		href: LOGIN,
		// navKey: NAV_KEY.LOGIN,
		// icon: HeroiconsOutlineLogin,
		linkOptions: {
			// Explicitly declare as external link to avoid a client-side error "Not Found".
			// TODO: add to other links that use data-sveltekit-reload as needed
			'data-sveltekit-reload': '',
			rel: 'external',
		},
	};

	// Add a login button:
	// - when their is no user.
	// - when on the home page regardless of user.
	if (!user || isHomeRoute(route)) {
		tree.splice(0, 0, login);
	}

	// Add landing links when on the home page and return.
	if (isHomeRoute(route)) {
		landingLinks(LL).forEach((link) => {
			tree.splice(0, 0, {
				name: link.label,
				href: link.href,
			});
		});

		return tree;
	}

	// No user, not on landing page. Return.
	if (!user) {
		return tree;
	}

	const langParam = {
		lang: locale,
	};

	tree.splice(0, 0, {
		name: LL.buttons.logout(),
		href: LOGOUT,
		navKey: NAV_KEY.LOGOUT,
		icon: HeroiconsOutlineLogout,
		linkOptions: {
			// Explicitly declare as external link to avoid a client-side error "Not Found".
			'data-sveltekit-reload': '',
		},
	});

	if (user.role) {
		tree.splice(0, 0, {
			name: LL.nav.account(),
			href: `/${locale}/users/${user.id}/roles`,
			navKey: NAV_KEY.ACCOUNT,
			icon: HeroiconsOutlineUser,
			divided: true,
			linkOptions: {
				'data-sveltekit-reload': '',
			},
		});
	} else {
		// New users have no role yet. Return with basic nav links.
		tree.splice(0, 0, {
			name: LL.nav.start(),
			href: withLocale('/welcome', locale),
		});
		return tree;
	}

	const organizationId = user.role.organizationId;
	const pageType = PageType.List;

	if (user.role.roleType === 'ORGADMIN') {
		tree.splice(
			0,
			0,

			// Only render dashboard links if portfolioId is present. Example, a new
			// org has no portfolios yet, so avoid rendering dashboard links.
			...getDashboardLinks({
				organizationId,
				portfolioId: orgPortfolioId, // we can't guarantee that portfolioId will be defined
				lang: locale,
				LL,
			}),

			{
				name: LL.entity.portfolio.plural(),
				href: getRoute({
					entity: 'portfolio',
					pageType,
					params: { organizationId, ...langParam },
				}),
				icon: HeroiconsOutlineCollection,
			},
			{
				name: LL.entity.lease.plural(),
				href: getRoute({
					entity: 'lease',
					pageType,
					params: { organizationId, ...langParam },
				}),
				icon: HeroiconsOutlineDocumentText,
			},
			{
				name: LL.entity.leaseInvoice.plural(),
				href:
					getRoute({
						entity: 'leaseInvoice',
						pageType,
						params: { organizationId, ...langParam },
					}) + '?sort=-postAt', // keep in sync with sorting passed to table in /leaseInvoices/+page.svelte
				icon: HeroiconsReceiptPercent,
			},
			{
				name: LL.nav.receipts(),
				href: withLocale(
					`/organizations/${organizationId}/receipts?sort=-paidAt`, // keep in sync with sorting passed to table in /receipts/+page.svelte
					locale,
				),
				icon: HeroiconsNewspaper,
			},
			{
				name: LL.entity.tenant.plural(),
				href: getRoute({
					entity: 'tenant',
					pageType,
					params: { organizationId, ...langParam },
				}),
				icon: HeroiconsUserGroup,
			},
			{
				name: LL.entity.maintenanceOrder.plural(),
				href: getRoute({
					entity: 'maintenanceOrder',
					pageType,
					params: { organizationId, ...langParam },
				}),
				icon: HeroiconsWrench,
			},
		);

		const settings = getRoute({
			entity: 'organization',
			pageType: PageType.Id,
			id: organizationId,
			params: {
				...langParam,
			},
		});

		tree.splice(-2, 0, {
			name: LL.nav.settings(),
			href: settings,
			navKey: NAV_KEY.SETTINGS,
			icon: HeroiconsOutlineCog8Tooth,
			// path: '/settings/',
		});
	} else if (user.role.roleType === 'PORTFOLIO' && user.role.portfolioId) {
		const portfolioId = user.role.portfolioId;

		const getRouteConfig = {
			entity: 'portfolio',
			id: portfolioId,
			params: { organizationId, portfolioId, ...langParam },
		} as const;

		tree.splice(
			0,
			0,

			...getDashboardLinks({
				organizationId,
				portfolioId,
				lang: locale,
				LL,
			}),

			{
				name: LL.entity.payout.plural(),
				icon: HeroiconsBanknotes,
				href: getRoute({
					...getRouteConfig,
					pageType: PageTypePortfolio.PayoutsTable,
				}),
			},

			{
				name: LL.entity.property.plural(),
				href: getRoute({
					...getRouteConfig,
					pageType: PageTab.Properties,
				}),
				icon: HeroiconsOutlineHome,
				children: [
					{
						name: LL.nav.list(),
						href: getRoute({
							...getRouteConfig,
							pageType: PageTab.Properties,
						}),
					},
					{
						name: LL.nav.occupancy(),
						href: getRoute({
							...getRouteConfig,
							entity: 'portfolio',
							pageType: PageTab.Occupancy,
						}),
					},
				],
			},

			{
				name: LL.entity.lease.plural(),
				href:
					getRoute({
						...getRouteConfig,
						entity: 'lease',
						pageType,
					}) + '/table',
				icon: HeroiconsOutlineDocumentText,
			},
			{
				name: LL.entity.maintenanceOrder.plural(),
				href:
					getRoute({
						...getRouteConfig,
						entity: 'maintenanceOrder',
						pageType,
					}) + '/table',
				icon: HeroiconsWrench,
			},
		);
	} else if (user.role.roleType === 'TENANT' && user.role.tenantId) {
		const tenantId = user.role.tenantId;

		const getRouteConfig = {
			params: { organizationId, tenantId, ...langParam },
		} as const;

		tree.splice(
			0,
			0,
			{
				name: LL.entity.lease.plural(),
				icon: HeroiconsOutlineDocumentText,
				href: getRoute({
					entity: 'lease',
					pageType: PageType.List,
					...getRouteConfig,
				}),
			},
			{
				name: LL.entity.leaseInvoice.plural(),
				icon: HeroiconsReceiptPercent,
				href: getRoute({
					entity: 'leaseInvoice',
					pageType: PageType.List,
					...getRouteConfig,
				}),
			},
			{
				name: LL.entity.maintenanceOrder.plural(),
				icon: HeroiconsWrench,
				href: getRoute({
					entity: 'maintenanceOrder',
					pageType: PageType.List,
					...getRouteConfig,
				}),
			},
		);
	}

	return tree;
};
