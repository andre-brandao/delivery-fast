import { Live } from '$lib/client/shape.svelte';
import type { Motoboy } from '$lib/server/db/order-schema';
import { getContext, setContext } from 'svelte';
// import type { Row } from '@electric-sql/client';

const ELECTRIC_URL = `http://localhost:3000/v1/shape`;

export class RestaurantState {
	motoboys: Live<{
		id: string;
		location: string;
		status: Motoboy['status'];
	}>;

	constructor() {
		this.motoboys = new Live<{
			id: string;
			location: string;
			status: Motoboy['status'];
		}>({
			url: ELECTRIC_URL,
			// url: "/api/live/user"
			params: {
				table: 'public.motoboy',
				// where: 'age > $1',
				// columns: [
				// 	'id',
				// 	'location',
				// 	'status'
				// ],
				// params: ['18'],
				replica: 'full'
			}
		});
	}
	destructor() {
		
		this.motoboys?.destructor?.();
	}
}

const RESTAURANT_KEY = Symbol('restaurant');


export function setRestaurant():RestaurantState { 
    return setContext(RESTAURANT_KEY, new RestaurantState())
}
export function getRestaurant(): RestaurantState {
	return getContext(RESTAURANT_KEY);
}
