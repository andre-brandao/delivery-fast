<script lang="ts">
    /* eslint-disable @typescript-eslint/no-unused-vars */
    /* eslint-disable no-unused-vars */
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
	// SVELTE
	import { onDestroy, type Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	// DATA
	import { setRestaurant } from './realTime.svelte';
	import { motoboy } from '$lib/client/icons.svelte';
	import type { Motoboy } from '$lib/server/db/order-schema';
	import { debounce, parseEWKB } from '$lib';
	import { api } from '$lib/client/api';
	let { data, children }: { data: LayoutData; children: Snippet } = $props();
	const restaurant = setRestaurant();
	const debouncedUpdate = debounce(api.motoboy.update, 500);

	// onDestroy(restaurant.destructor);
</script>

<div class="flex max-md:flex-col">
	<MapLibre
		class="h-[80vh] min-h-[300px] min-w-2/3 max-md:w-full"
		style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
		zoom={3.5}
		center={[-43.961837778477445, -19.966752768041207]}
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
		{#each restaurant.motoboys.rows as row (row.id)}
			{@const [lat, long] = parseEWKB(row.location)}

			{#if lat < 90 && long < 180 && lat > -90 && long > -180}
				<Marker
					draggable
					bind:lnglat={
						() => [long, lat],
						(v) => {
							debouncedUpdate(row.id, `${v[1]},${v[0]}`, 'available');
						}
					}
				>
					{#snippet content()}
						{@render motoboy((row.status ?? 'available') as Motoboy['status'])}
					{/snippet}
				</Marker>
			{/if}
		{/each}
	</MapLibre>
	<div>
		{@render children()}
	</div>
</div>
