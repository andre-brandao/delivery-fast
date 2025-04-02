<script lang="ts">
	// SVELTE
	// import type { PageData } from '../$types';
	// let { data }: { data: PageData } = $props();

	// LIVE

	// MAP
	import {
		MapLibre,
		NavigationControl,
		ScaleControl,
		GlobeControl,
		Marker,
		GeolocateControl,
		FullScreenControl,
		CircleLayer,
		GeoJSONSource
	} from 'svelte-maplibre-gl';
	import type GeoJSON from 'geojson';

	// INTERNAL
	import { debounce, parseEWKB } from '$lib';
	import { api } from '$lib/client/api';
	import { bike, motoboy } from '$lib/client/icons.svelte';

	import type { Motoboy } from '$lib/server/db/schema';
	import { getRestaurant } from './realTime.svelte';

	const restaurant = getRestaurant();
</script>

<div class="flex w-full max-w-1/3 flex-col p-4">
	<h1 class="text-2xl">Users</h1>
	<button class="btn" onclick={api.motoboy.deleteAll}>Delete Users</button>

	{#each restaurant.motoboys.rows as row (row.id)}
		{@const [lat, long] = parseEWKB(row.location)}
		<div class="flex flex-col">
			<div class="flex gap-2">
				<!-- <div>{row.id}</div> -->
				<!-- <div>{row.status}</div> -->
				<!-- <div>{row.location}</div> -->
				<div>{lat}</div>
				<div>{long}</div>
			</div>
			<!-- <button on:click={() => api.motoboy.delete(row.id)}>Delete</button> -->
		</div>
	{/each}
</div>
