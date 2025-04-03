import type { Motoboy } from "$lib/server/db/order-schema";

export const api = {
	motoboy: {
		create: (loc: string) =>
			fetch('/api/motoboy', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},

				body: JSON.stringify({ location: loc })
			})
				// .then((response) => response.json())
				.then((data) => {
					console.log('motoboy created', data);
				})
				.catch((error) => {
					console.error('Error creating motoboy:', error);
				}),

		update: (id: unknown, loc: string, status: Motoboy['status'] | string) => {
			if (typeof id !== 'string') {
				console.error('id is not a string', id);
				return;
			}
			return (
				fetch('/api/motoboy', {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},

					body: JSON.stringify({ id, location: loc, status })
				})
					// .then((response) => response.json())
					.then((data) => {
						console.log('motoboy updated', data);
					})
					.catch((error) => {
						console.error('Error creating motoboy:', error);
					})
			);
		},
        deleteAll : () => fetch('/api/motoboy', {
			method: 'DELETE'
		})
	}
};
