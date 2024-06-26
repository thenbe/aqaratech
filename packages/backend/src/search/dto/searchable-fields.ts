export const SearchableFields = {
	tenant: [
		'fullName',
		'label',
		'phone',
		'civilid',
		'passportNum',
		'residencyNum',
	] as const,
	portfolio: ['fullName', 'label', 'phone', 'civilid'] as const,
	property: ['label', 'paci', 'area', 'street'] as const,
};

/** Fields that should be returned with search results, highlighted, and ranked by minisearch */
export const ALL_SEARCHABLE_FIELDS = [
	...SearchableFields.tenant,
	...SearchableFields.portfolio,
	...SearchableFields.property,
] as const;

/** Fields that should be returned with search results, but *not* highlighted or ranked by minisearch */
const NON_SEARCHABLE_FIELDS = [
	'block',
	'number',
	'portfolioId',
	'organizationId',
] as const;

/** Fields that should be returned with search results */
export const ALL_RETURNED_FIELDS = [
	'id',
	'title',
	...ALL_SEARCHABLE_FIELDS,
	...NON_SEARCHABLE_FIELDS,
] as const;
