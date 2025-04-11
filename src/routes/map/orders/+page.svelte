<script lang="ts">
	/* eslint-disable @typescript-eslint/no-unused-vars */
	/* eslint-disable no-unused-vars */
	// SVELTE
	// import type { PageData } from '../$types';
	// let { data }: { data: PageData } = $props();

	// LIVE

	// MAP
	// INTERNAL
	import { debounce, parseEWKB } from '$lib';
	import { api } from '$lib/client/api';
	import * as icons from '$lib/client/icons.svelte';

	import type { Motoboy } from '$lib/server/db/schema';
	import { getRestaurant } from '../realTime.svelte';
	import { ShoppingBag } from 'lucide-svelte';
	const restaurant = getRestaurant();
</script>

<ul class="list bg-base-100 rounded-box max-h-[80vh] overflow-y-scroll shadow-md">
	<li class="p-4 pb-2 text-xs tracking-wide opacity-60">Pedidos</li>
	<button class="btn" onclick={api.order.deleteAll}>Delete Pedidos</button>

	{#each restaurant.pedidos.rows as row (row.id)}
		{@const [lat, long] = parseEWKB(row.location)}
		<li class="list-row">
			<div class="rounded-box size-10">
				{@render icons.pedido('accepted')}
			</div>
			<div>
				<div>{row.status}</div>
				<div class="text-xs font-semibold uppercase opacity-60">{row.status}</div>
			</div>
			<p class="list-col-wrap text-xs">
				{row.location} - {lat} - {long}
			</p>
		</li>
	{/each}
</ul>
