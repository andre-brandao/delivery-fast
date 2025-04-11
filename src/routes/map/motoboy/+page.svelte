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
	import { bike, motoboy } from '$lib/client/icons.svelte';

	import type { Motoboy } from '$lib/server/db/schema';
	import { getRestaurant } from '../realTime.svelte';

	const restaurant = getRestaurant();

	const cicleStatus = async (row: { id: string; location: string; status: string }) => {
		switch (row.status) {
			case 'available':
				await api.motoboy.update(row.id, row.location, 'busy');

				break;
			case 'busy':
				await api.motoboy.update(row.id, row.location, 'unavailable');
				break;
			case 'unavailable':
				await api.motoboy.update(row.id, row.location, 'available');
				break;

			default:
				break;
		}
	};
</script>

<ul class="list bg-base-100 rounded-box max-h-[80vh] overflow-y-scroll shadow-md">
	<li class="p-4 pb-2 text-xs tracking-wide opacity-60">Motoboys</li>
	<button class="btn" onclick={api.motoboy.deleteAll}>Delete Motoboyy</button>

	{#each restaurant.motoboys.rows as row (row.id)}
		{@const [lat, long] = parseEWKB(row.location)}
		<li class="list-row">
			<div class="rounded-box size-10">
				{@render motoboy(row.status as Motoboy['status'])}
			</div>
			<div>
				<div>{row.status}</div>
				<div class="text-xs font-semibold uppercase opacity-60">{row.status}</div>
			</div>
			<p class="list-col-wrap text-xs">
				{row.location} - {lat} - {long}
			</p>
			<button
				class="btn btn-square btn-ghost"
				onclick={() => {
					if (!row.id || !row.status) return;
					cicleStatus({
						id: row.id.toString(),
						location: `${lat},${long}`,
						status: row.status?.toString() ?? 'busy'
					});
				}}
			>
				<svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					><g
						stroke-linejoin="round"
						stroke-linecap="round"
						stroke-width="2"
						fill="none"
						stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g
					></svg
				>
				Teste
			</button>
			<button class="btn btn-square btn-ghost">
				<svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					><g
						stroke-linejoin="round"
						stroke-linecap="round"
						stroke-width="2"
						fill="none"
						stroke="currentColor"
						><path
							d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
						></path></g
					></svg
				>
			</button>
		</li>
	{/each}
</ul>
