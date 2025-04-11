<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex h-screen flex-col items-center justify-center">
	<a href="/org" class="link">Go to Organizations</a>

	<p>Welcome to the main page!</p>
</div>
