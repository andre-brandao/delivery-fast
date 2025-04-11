<script lang="ts">
	import { page } from '$app/state';

	function link(href: string) {
		const isActive = href === page.url.pathname;
		if (isActive) {
			return {
				href,
				class: 'btn btn-primary'
			};
		}
		return {
			href,
			class: 'btn'
		};
	}
</script>

<main class="flex w-full items-center justify-around gap-3 p-1">
	<div>
		<a {...link('/map')}>Home</a>
	</div>
	<div>
		<a {...link('/map/motoboy')}>Motoboy</a>
	</div>
	<div>
		<a {...link('/map/orders')}>Pedidos</a>
	</div>

	<div>
		<a {...link('/map/routes')}>Routes</a>
	</div>
</main>
