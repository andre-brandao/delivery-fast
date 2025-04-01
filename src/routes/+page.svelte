<script lang="ts">
	import { page } from '$app/state';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	import { ShapeStream, Shape, type ShapeStreamOptions, type Row } from '@electric-sql/client';
	import { Live } from '$lib/client/shape.svelte';

	let intervael: number | undefined = $state();
	onMount(() => {
		intervael = setInterval(() => {
			fetch('/api/user', {
				method: 'POST'
			});
		}, 5000);
	});

	onDestroy(() => {
		clearInterval(intervael);
	});
	const liveUsers = new Live({
		url: `http://localhost:3000/v1/shape`,
		// url: "/api/live/user"
		params: {
			table: 'user',
			where: 'age > $1',
			// columns: ['id', 'name', 'email'],
			params: ['18'],
			replica: 'full'
		}
	});
	// const d = useShape({
	// 	url: `http://localhost:3000/v1/shape`,
	// 	// url: "/api/live/user"
	// 	params: {
	// 		table: 'user',
	// 		where: 'age > $1',
	// 		// columns: ['id', 'name', 'email'],
	// 		params: ['18'],
	// 		replica: 'full'
	// 	}
	// });

	const deleteUsers = async () => {
		await fetch('/api/user', {
			method: 'DELETE'
		});
	};

	// The callback runs every time the Shape data changes.
</script>

<button onclick={deleteUsers}>Delete Users</button>
<p>shape</p>
<pre>
	{JSON.stringify(liveUsers.rows, null, 2)}
</pre>
<p>.shape data</p>
<pre>
	{JSON.stringify(page.data, null, 2)}

</pre>
