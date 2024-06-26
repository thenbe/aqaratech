import { Role } from '@prisma/client';

import { TCan } from 'src/casl/abilities/ability-types';
import { Action } from 'src/casl/action.enum';

export const defineTenantAbility = (role: Role, can: TCan) => {
	if (role.roleType !== 'TENANT' || !role.tenantId) {
		throw new Error('roleType is not tenant or tenantId is not set');
	}

	can(Action.Read, 'Tenant', {
		id: { equals: role.tenantId },
	});

	can(Action.Read, ['Lease'], {
		tenantId: { equals: role.tenantId },
	});

	// TODO some fields should be public
	can(Action.Read, ['LeaseInvoice', 'LeaseInvoiceV'], {
		lease: { tenantId: { equals: role.tenantId } },
	});

	// TODO restrict fields
	can([Action.Read, Action.Create, Action.Update], ['MaintenanceOrder'], {
		tenantId: { equals: role.tenantId },
	});

	// File create permisson is further checked depending on the relationKey in
	// the service layer.
	can([Action.Create, Action.Read], ['File'], {
		organizationId: { equals: role.organizationId },
		relationKey: { in: ['maintenanceOrder'] },
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} as any);
};
