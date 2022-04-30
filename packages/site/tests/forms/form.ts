import type { Page } from '@playwright/test';
import {
	fakeClient,
	fakeExpense,
	fakeLease,
	fakeMaintenanceOrder,
	fakeProperty,
	fakeTenant,
	fakeUnit,
} from '../../../seed/generators.js';
import type { Entity } from '../../src/lib/models/interfaces/entity.interface.js';
import {
	dateToInput,
	getAddress,
	getName,
} from '../../src/lib/utils/common.js';
import { trpc } from '../config/trpc.js';

export class Form {
	createUrl: string;
	editUrl: string;
	public page: Page | undefined;

	constructor(public urlName: Entity, public id: string) {
		this.editUrl = `${this.urlName}/${this.id}/edit`;
		this.createUrl = `/new/${this.urlName}`;
	}

	submit() {
		return this.page?.click('button[type="submit"]');
	}

	async getRequest() {
		const re = new RegExp('/trpc');
		const [request] = await Promise.all([
			this.page?.waitForRequest(re),
			await this.submit(),
		]);
		return request;
	}

	getUrl(type: 'new' | 'edit') {
		if (type === 'new') {
			return this.createUrl;
		} else if (type === 'edit') {
			return this.editUrl;
		} else {
			throw new Error('invalid type');
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setupNew() {}
}

export class ClientForm extends Form {
	static urlName: Entity = 'clients';
	public override page: Page | undefined;
	constructor(public data = fakeClient()) {
		super(ClientForm.urlName, data.id);
	}

	public async fill() {
		await this.page?.fill('input[name="firstName"]', this.data.firstName);
		await this.page?.fill('input[name="lastName"]', this.data.lastName);
		await this.page?.fill('input[name="email"]', this.data.email);
		await this.page?.fill('input[name="phone"]', this.data.phone);
		await this.page?.fill('input[name="civilid"]', this.data.civilid);
		await this.page?.fill('input[name="dob"]', dateToInput(this.data.dob));
	}

	// TODO: move to ancestor class
	public alter() {
		this.data = {
			...fakeClient(),
			id: this.data.id,
		};
	}

	public basic() {
		return [this.data.firstName, this.data.email];
	}

	async setup() {
		await trpc.mutation('clients:create', this.data);
	}

	async clean() {
		await trpc.mutation('clients:delete', this.id);
	}

	static async cleanById(id: string) {
		await trpc.mutation(`${this.urlName}:delete`, id);
	}
}

export class PropertyForm extends Form {
	static urlName: Entity = 'properties';
	public override page: Page | undefined;
	client: ReturnType<typeof fakeClient>;
	constructor(public data = fakeProperty()) {
		super(PropertyForm.urlName, data.id);
		this.client = { ...fakeClient(), id: data.clientId };
	}

	public async fill() {
		await this.page?.fill('[id="area"]', this.data.area);
		await this.page?.locator(`.item >> text=${this.data.area}`).first().click();
		await this.page?.keyboard.press('Enter');
		await this.page?.fill('input[name="block"]', this.data.block);
		await this.page?.fill('input[name="street"]', this.data.street);
		await this.page?.fill('input[name="avenue"]', this.data.avenue ?? '');
		await this.page?.fill('input[name="number"]', this.data.number);
		await this.page?.waitForLoadState('networkidle');
		await this.page?.selectOption('#clientId', { label: getName(this.client) });
	}

	public alter() {
		this.data = {
			...fakeProperty(),
			id: this.data.id,
		};
	}

	/**
	 * Basic fields to check existence of after form submittal
	 */
	public basic() {
		return [this.data.area];
	}

	override async setupNew() {
		await trpc.mutation('clients:create', this.client);
	}

	async setup() {
		await Promise.all([
			trpc.mutation('clients:create', this.client),
			trpc.mutation('properties:create', this.data),
		]);
	}

	async clean() {
		await Promise.all([
			trpc.mutation('properties:delete', this.data.id),
			trpc.mutation('clients:delete', this.client.id),
		]);
	}

	static async cleanById(id: string) {
		await trpc.mutation(`${this.urlName}:delete`, id);
	}
}

export class UnitForm extends Form {
	static urlName: Entity = 'units';
	public override page: Page | undefined;
	client: ReturnType<typeof fakeClient>;
	property: ReturnType<typeof fakeProperty>;
	constructor(public data = fakeUnit()) {
		super(UnitForm.urlName, data.id);
		this.property = { ...fakeProperty(), id: data.propertyId };
		this.client = { ...fakeClient(), id: this.property.clientId };
	}

	public async fill() {
		await this.page?.fill('input[name="unitNumber"]', this.data.unitNumber);
		await this.page?.fill('input[name="bed"]', this.data.bed.toString());
		await this.page?.fill('input[name="bath"]', this.data.bath.toString());
		await this.page?.fill('input[name="floor"]', this.data.floor.toString());
		await this.page?.selectOption('#clientId', { label: getName(this.client) });
		await this.page?.selectOption('#propertyId', {
			label: getAddress(this.property),
		});
	}

	public alter() {
		this.data = {
			...fakeUnit(),
			id: this.data.id,
		};
	}

	/**
	 * Basic fields to check existence of after form submittal
	 */
	public basic() {
		return [this.data.unitNumber];
	}

	override async setupNew() {
		await Promise.all([
			trpc.mutation('clients:create', this.client),
			trpc.mutation('properties:create', this.property),
		]);
	}

	async setup() {
		await Promise.all([
			trpc.mutation('clients:create', this.client),
			trpc.mutation('properties:create', this.property),
			trpc.mutation('units:create', this.data),
		]);
	}

	async clean() {
		await Promise.all([
			trpc.mutation('units:delete', this.data.id),
			trpc.mutation('properties:delete', this.property.id),
			trpc.mutation('clients:delete', this.client.id),
		]);
	}

	static async cleanById(id: string) {
		await trpc.mutation(`${this.urlName}:delete`, id);
	}
}

export class TenantForm extends Form {
	static urlName: Entity = 'tenants';
	public override page: Page | undefined;
	constructor(public data = fakeTenant()) {
		super(TenantForm.urlName, data.id);
	}

	public async fill() {
		await this.page?.fill('input[name="firstName"]', this.data.firstName);
		await this.page?.fill('input[name="lastName"]', this.data.lastName);
		await this.page?.fill('input[name="email"]', this.data.email);
		await this.page?.fill('input[name="phone"]', this.data.phone);
		await this.page?.fill('input[name="civilid"]', this.data.civilid);
		await this.page?.fill('input[name="dob"]', dateToInput(this.data.dob));
	}

	public alter() {
		this.data = {
			...fakeTenant(),
			id: this.data.id,
		};
	}

	public basic() {
		return [this.data.firstName, this.data.email];
	}

	async setup() {
		await trpc.mutation('tenants:create', this.data);
	}

	async clean() {
		await trpc.mutation('tenants:delete', this.id);
	}

	static async cleanById(id: string) {
		await trpc.mutation(`${this.urlName}:delete`, id);
	}
}

export class LeaseForm extends Form {
	static urlName: Entity = 'leases';
	public override page: Page | undefined;
	client: ReturnType<typeof fakeClient>;
	property: ReturnType<typeof fakeProperty>;
	unit: ReturnType<typeof fakeUnit>;
	tenant: ReturnType<typeof fakeTenant>;
	constructor(public data = fakeLease()) {
		super(LeaseForm.urlName, data.id);
		this.unit = { ...fakeUnit(), id: data.unitId };
		this.property = { ...fakeProperty(), id: this.unit.propertyId };
		this.client = { ...fakeClient(), id: this.property.clientId };
		this.tenant = { ...fakeTenant(), id: data.tenantId };
	}

	public async fill() {
		await this.page?.waitForLoadState('networkidle');
		await this.page?.selectOption('#tenantId', { label: getName(this.tenant) });
		if (!this.page?.url().includes('edit')) {
			await this.page?.selectOption('#propertyId', {
				label: getAddress(this.property),
			});
			await this.page?.waitForLoadState('networkidle');
		}
		await this.page?.selectOption('#unitId', {
			label: [this.unit.type, this.unit.unitNumber]
				.filter((str) => str)
				.join(' '),
		});
		await this.page?.fill(
			'input[name="monthlyRent"]',
			this.data.monthlyRent.toString(),
		);
	}

	public alter() {
		this.data = {
			...fakeLease(),
			id: this.data.id,
		};
	}

	public basic() {
		return [this.data.monthlyRent];
	}

	override async setupNew() {
		await Promise.all([
			trpc.mutation('clients:create', this.client),
			trpc.mutation('properties:create', this.property),
			trpc.mutation('units:create', this.unit),
			trpc.mutation('tenants:create', this.tenant),
		]);
	}

	async setup() {
		await Promise.all([
			trpc.mutation('clients:create', this.client),
			trpc.mutation('properties:create', this.property),
			trpc.mutation('units:create', this.unit),
			trpc.mutation('tenants:create', this.tenant),
			trpc.mutation('leases:create', this.data),
		]);
	}

	async clean() {
		await Promise.all([
			trpc.mutation('leases:delete', this.data.id),
			trpc.mutation('units:delete', this.unit.id),
			trpc.mutation('properties:delete', this.property.id),
			trpc.mutation('clients:delete', this.client.id),
			trpc.mutation('tenants:delete', this.tenant.id),
		]);
	}

	static async cleanById(id: string) {
		await trpc.mutation(`${this.urlName}:delete`, id);
	}
}

export class ExpenseForm extends Form {
	static urlName: Entity = 'expenses';
	public override page: Page | undefined;
	constructor(
		public client = fakeClient(),
		public property = fakeProperty(client.id),
		public unit = fakeUnit(property.id),
		public data = {
			...fakeExpense(),
			clientId: null,
			propertyId: property.id,
			unitId: null,
		},
	) {
		super(ExpenseForm.urlName, data.id);
	}

	public async fill() {
		await this.page?.waitForLoadState('networkidle');
		await this.page?.fill('input[name="amount"]', this.data.amount.toString());
		await this.page?.fill(
			'input[name="postAt"]',
			dateToInput(this.data.postAt),
		);
		await this.page?.fill('input[name="memo"]', this.data.memo);
		await this.page?.selectOption('#category', { index: 0 });
		await this.page?.selectOption('#clientId', { index: 0 });
		await this.page?.selectOption('#propertyId', { index: 0 });
		await this.page?.selectOption('#unitId', { index: 0 });
		await this.page?.locator('#clientId-radio').click();
	}

	public alter() {
		this.data = {
			...fakeExpense(),
			clientId: null,
			propertyId: this.property.id,
			unitId: null,
			id: this.data.id,
		};
	}

	public basic() {
		return [
			this.data.amount.toFixed(0),
			this.data.category,
			// this.data.postAt,
			this.data.memo,
		];
	}

	override async setupNew() {
		await Promise.all([
			trpc.mutation('clients:create', this.client),
			trpc.mutation('properties:create', this.property),
			trpc.mutation('units:create', this.unit),
		]);
	}

	async setup() {
		await Promise.all([
			trpc.mutation('clients:create', this.client),
			trpc.mutation('properties:create', this.property),
			trpc.mutation('units:create', this.unit),
			trpc.mutation('expenses:create', this.data),
		]);
	}

	async clean() {
		await Promise.all([
			trpc.mutation('expenses:delete', this.data.id),
			trpc.mutation('units:delete', this.unit.id),
			trpc.mutation('properties:delete', this.property.id),
			trpc.mutation('clients:delete', this.client.id),
		]);
	}

	static async cleanById(id: string) {
		await trpc.mutation(`${this.urlName}:delete`, id);
	}
}

export class MaintenanceOrderForm extends Form {
	static urlName: Entity = 'maintenanceOrders';
	public override page: Page | undefined;
	constructor(
		public client = fakeClient(),
		public property = fakeProperty(client.id),
		public unit = fakeUnit(property.id),
		public data = {
			...fakeMaintenanceOrder(),
			clientId: null,
			propertyId: property.id,
			unitId: null,
		},
	) {
		super(MaintenanceOrderForm.urlName, data.id);
	}

	public async fill() {
		await this.page?.waitForLoadState('networkidle');
		await this.page?.fill(
			'input[name="completedAt"]',
			dateToInput(this.data.completedAt),
		);
		await this.page?.fill('input[name="title"]', this.data.title);
		await this.page?.fill('input[name="description"]', this.data.description);
		await this.page?.selectOption('#status', { index: 0 });
		await this.page?.selectOption('#clientId', { index: 0 });
		await this.page?.selectOption('#propertyId', { index: 0 });
		await this.page?.selectOption('#unitId', { index: 0 });
		await this.page?.locator('#clientId-radio').click();
	}

	public alter() {
		this.data = {
			...fakeMaintenanceOrder(),
			clientId: null,
			propertyId: this.property.id,
			unitId: null,
			id: this.data.id,
		};
	}

	public basic() {
		return [this.data.title, this.data.status, this.data.description];
	}

	override async setupNew() {
		await Promise.all([
			trpc.mutation('clients:create', this.client),
			trpc.mutation('properties:create', this.property),
			trpc.mutation('units:create', this.unit),
		]);
	}

	async setup() {
		await Promise.all([
			trpc.mutation('clients:create', this.client),
			trpc.mutation('properties:create', this.property),
			trpc.mutation('units:create', this.unit),
		]);
		await trpc.mutation('maintenanceOrders:create', this.data);
	}

	async clean() {
		await Promise.all([
			trpc.mutation('maintenanceOrders:delete', this.data.id),
			trpc.mutation('units:delete', this.unit.id),
			trpc.mutation('properties:delete', this.property.id),
			trpc.mutation('clients:delete', this.client.id),
		]);
	}

	static async cleanById(id: string) {
		await trpc.mutation(`${this.urlName}:delete`, id);
	}
}
