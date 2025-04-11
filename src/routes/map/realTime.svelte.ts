import { page } from '$app/state';
// import { PUBLIC_ELECTRIC_URL } from '$env/static/public';
import { Live } from '$lib/client/shape.svelte';
import type { Motoboy } from '$lib/server/db/order-schema';
import { getContext, setContext } from 'svelte';
// import type { Row } from '@electric-sql/client';
import { api } from '$lib/client/api';

// const ELECTRIC_URL = `http://localhost:3000/v1/shape`;

export class RestaurantState {
    motoboys: Live<{
        id: string;
        location: string;
        status: Motoboy['status'];
    }>;

    pedidos: Live<{
        id: string;
        location: string;
    }>;

    constructor() {
        this.motoboys = new Live<{
            id: string;
            location: string;
            status: Motoboy['status'];
        }>({
            // url: PUBLIC_ELECTRIC_URL,
            url: new URL(
                `/api/live/users`,
                // window.location.origin
                page.url.origin
            ).href,
            params: {
                table: 'public.motoboy'
                // where: 'age > $1',
                // columns: [
                // 	'id',
                // 	'location',
                // 	'status'
                // ],
                // params: ['18'],
                // replica: 'full'
            }
        });

        this.pedidos = new Live<{
            id: string;
            location: string;
            status: Motoboy['status'];
        }>({
            // url: PUBLIC_ELECTRIC_URL,
            url: new URL(
                `/api/live/users`,
                // window.location.origin
                page.url.origin
            ).href,
            params: {
                table: 'public.order'
                // where: 'age > $1',
                // columns: [
                // 	'id',
                // 	'location',
                // 	'status'
                // ],
                // params: ['18'],
                // replica: 'full'
            }
        });
    }
    api = api;
    destructor() {
        console.log('Restaurant Destructor');
        this.motoboys?.destructor?.();
        this.pedidos.destructor();
    }
}

const RESTAURANT_KEY = Symbol('restaurant');

export function setRestaurant(): RestaurantState {
    return setContext(RESTAURANT_KEY, new RestaurantState());
}
export function getRestaurant(): RestaurantState {
    return getContext(RESTAURANT_KEY);
}
