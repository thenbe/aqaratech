export enum PageTab {
	Details = 'details',
	Files = 'files',
	Financials = 'financials',
	Occupancy = 'occupancy',

	Properties = 'properties',
	Units = 'units',
	Invoices = 'invoices',
	Leases = 'leases',
}

export type PortfolioPageTab =
	| PageTab.Details
	| PageTab.Properties
	| PageTab.Occupancy
	| PageTab.Files;

export type PropertyPageTab =
	| PageTab.Details
	| PageTab.Financials
	| PageTab.Occupancy
	| PageTab.Units
	| PageTab.Files;

export type UnitPageTab =
	| PageTab.Details
	| PageTab.Financials
	| PageTab.Leases
	| PageTab.Files;

export type LeasePageTab = PageTab.Details | PageTab.Invoices | PageTab.Files;

export type InvoicePageTab = PageTab.Details | PageTab.Files;

export type PageTabType =
	| PropertyPageTab
	| UnitPageTab
	| LeasePageTab
	| InvoicePageTab;
