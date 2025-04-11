import { createAccessControl } from 'better-auth/plugins/access';

import { defaultStatements, adminAc, ownerAc } from 'better-auth/plugins/organization/access';

const statement = {
	...defaultStatements,
	order: ['create', 'share', 'update', 'delete']
} as const;

export const ac = createAccessControl(statement);

export const member = ac.newRole({
	order: ['create']
});

export const admin = ac.newRole({
	order: ['create', 'update'],
	...adminAc.statements
});

export const owner = ac.newRole({
	order: ['create', 'update', 'delete'],
	...ownerAc.statements
});

export const motoboy = ac.newRole({
	order: ['update']
});

export const roles = {
	member,
	admin,
	owner,
	motoboy
};
// const res = admin.authorize({
// 	project: ['create']
// });
