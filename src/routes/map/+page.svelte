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
			.then((response) => response.json())
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
				'status',
				// 'ST_AsText\(location\)'
				// 'ST_X(location)', 'ST_Y(location)'
			],
			// params: ['18'],
			replica: 'full'
		}
	});
	const deleteUsers = async () => {
		await fetch('/api/user', {
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
</script>

<!-- 
<MapLibre
  zoom={5}
  center={[142, 43]}
  class="h-[400px]"
  style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
>
  <Marker lnglat={[141.692222, 42.775]} />
</MapLibre> -->
<MapLibre
	class="h-[55vh] min-h-[300px]"
	style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
	zoom={3.5}
	center={[142, 43]}
	onclick={(e) => {
		const loc = e.lngLat;
		console.log('click', e);
		createTestMotoboy(`${loc.lng},${loc.lat}`);
	}}
>
	<NavigationControl />
	<ScaleControl />
	<GlobeControl />
	<Marker lnglat={[141.692222, 42.775]} />
</MapLibre>
<button onclick={deleteUsers}>Delete Users</button>
<p>shape</p>
<pre>
	{JSON.stringify(liveUsers.rows, null, 2)}
</pre>
<p>.shape data</p>
<pre>
	{JSON.stringify(page.data, null, 2)}

</pre>
