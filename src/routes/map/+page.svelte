<script lang="ts">
	// SVELTE
	import { page } from '$app/state';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from '../$types';
	let { data }: { data: PageData } = $props();

	// LIVE

	import { ShapeStream, Shape, type ShapeStreamOptions, type Row } from '@electric-sql/client';
	import { Live } from '$lib/client/shape.svelte';

	// MAP
	import {
		MapLibre,
		NavigationControl,
		ScaleControl,
		GlobeControl,
		Marker,
		GeolocateControl,
		FullScreenControl,
		CircleLayer
	} from 'svelte-maplibre-gl';
	// INTERNAL
	import { debounce, parseEWKB } from '$lib';
	import { api } from '$lib/client/api';
	import { bike } from '$lib/client/icons.svelte';

	const debouncedUpdate = debounce(api.motoboy.update, 500);

	const liveUsers = new Live({
		url: `http://localhost:3000/v1/shape`,
		// url: "/api/live/user"
		params: {
			table: 'motoboy',
			// where: 'age > $1',
			columns: [
				'id',
				'location',
				'status'
				// 'ST_AsText\(location\)'
				// 'ST_X(location)', 'ST_Y(location)'
			],
			// params: ['18'],
			replica: 'full'
		}
	});
</script>

<div class="flex w-full">
	<MapLibre
		class="h-[55vh] min-h-[300px] min-w-2/3"
		style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
		zoom={3.5}
		center={[74, 43]}
		onclick={(e) => {
			const loc = e.lngLat;
			console.log('click loc', loc);
			api.motoboy.create(`${loc.lat},${loc.lng}`);
		}}
	>
		<NavigationControl />
		<ScaleControl />
		<GlobeControl />
		<GeolocateControl
			position="top-left"
			positionOptions={{ enableHighAccuracy: true }}
			trackUserLocation={true}
			showAccuracyCircle={true}
			ontrackuserlocationstart={() => console.log('trackuserlocationstart')}
			ontrackuserlocationend={() => console.log('trackuserlocationend')}
			ongeolocate={(ev) => console.log(`geolocate ${JSON.stringify(ev.coords, null, 2)}`)}
		/>
		<FullScreenControl />
		{#each liveUsers.rows as row (row.id)}
			{@const [lat, long] = parseEWKB(row.location)}

			{#if lat < 90 && long < 180 && lat > -90 && long > -180}
				<Marker
					draggable
					bind:lnglat={
						() => [long, lat],
						(v) => {
							debouncedUpdate(row.id, `${v[1]},${v[0]}`);
						}
					}
				>
					{#snippet content()}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="black"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							{@render bike()}
						</svg>
						<!-- <div class="text-center leading-none text-black">
							<div class="font-bold drop-shadow-xs">{lat}, {long}</div>
						</div> -->
					{/snippet}
				</Marker>
			{/if}
		{/each}
	</MapLibre>
	<div class="flex w-full max-w-1/3 flex-col p-4">
		<h1 class="text-2xl">Users</h1>
		{#each liveUsers.rows as row (row.id)}
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
</div>
<button onclick={api.motoboy.deleteAll}>Delete Users</button>
<p>shape</p>

<p>rows</p>
<pre>
	{JSON.stringify(liveUsers.rows, null, 2)}
</pre>
<p>.shape data</p>
<pre>
	{JSON.stringify(page.data, null, 2)}

</pre>
