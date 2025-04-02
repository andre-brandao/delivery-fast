<script lang="ts">
	import '../app.css';

	let { children } = $props();

	import auth from '$lib/client/auth-client';
	const session = auth.useSession();

	const org = auth.useActiveOrganization();
</script>

<div class="flex flex-col items-center justify-center">
	{#if $session.data}
		<div class="flex w-full items-center justify-around">
			<a href="/">
				{$session?.data?.user.name}
				<!-- {$session?.data?.user.email} -->
			</a>
			<a href="/org">
				{#if $org?.data?.name}
					{$org.data.name}
				{/if}
			</a>
			<a href="/map"> Map </a>

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
		<a href="/login"> Login </a>
	{/if}

	<a href="/api/auth/reference">API</a>
</div>

{@render children()}
