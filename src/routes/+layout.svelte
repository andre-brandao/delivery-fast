<script lang="ts">
	import '../app.css';

	let { children } = $props();

	import auth from '$lib/client/auth-client';
	const session = auth.useSession();
</script>

<div>
	{#if $session.data}
		<div>
			<p>
				{$session?.data?.user.name}
			</p>
			<p>
				{$session?.data?.user.email}
			</p>
			<button
			class="btn btn-primary"
				onclick={async () => {
					await auth.signOut();
				}}
			>
				Signout
			</button>
		</div>
	{:else}
	<a href="/login">
	
		Login
		</a>
	{/if}
</div>

{@render children()}
