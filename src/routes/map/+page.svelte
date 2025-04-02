<script lang="ts">
	import { page } from '$app/state';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from '../$types';

	let { data }: { data: PageData } = $props();

	import { ShapeStream, Shape, type ShapeStreamOptions, type Row } from '@electric-sql/client';
	import { Live } from '$lib/client/shape.svelte';

	let intervael: number | undefined | NodeJS.Timeout = $state();

	const createTestMotoboy = (loc: string) =>
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
			});

	onDestroy(() => {
		clearInterval(intervael);
	});
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
	const deleteUsers = async () => {
		await fetch('/api/motoboy', {
			method: 'DELETE'
		});
	};

	import {
		MapLibre,
		NavigationControl,
		ScaleControl,
		GlobeControl,
		Marker
	} from 'svelte-maplibre-gl';
	import { parseEWKB } from '$lib';
</script>

<MapLibre
	class="h-[55vh] min-h-[300px]"
	style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
	zoom={3.5}
	center={[74, 43]}
	onclick={(e) => {
		const loc = e.lngLat;
		console.log('click loc', loc);
		createTestMotoboy(`${loc.lat},${loc.lng}`);
	}}
>
	<NavigationControl />
	<ScaleControl />
	<GlobeControl />
	{#each liveUsers.rows as row (row.id)}
		{#if typeof row.location === 'string'}
			{@const [lat, long] = parseEWKB(row.location)}
			{@const foo = console.log([lat, long])}
			{#if lat < 90 && long < 180 && lat > -90 && long > -180}
				<Marker lnglat={[long, lat]} />
			{/if}
		{/if}
	{/each}
</MapLibre>
<button onclick={deleteUsers}>Delete Users</button>
<p>shape</p>

<p>rows</p>
<pre>
	{JSON.stringify(liveUsers.rows, null, 2)}
</pre>
<p>.shape data</p>
<pre>
	{JSON.stringify(page.data, null, 2)}

</pre>
