<script lang="ts">
	import '../app.css';

	let { children } = $props();

	import auth from '$lib/client/auth-client';
	const session = auth.useSession();

	const org = auth.useActiveOrganization();
</script>

<div class="navbar bg-base-100 shadow-sm">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">Rota88</a>
	</div>
	<div class="flex items-center gap-2">
		<a href="/map" class="link"> Map </a>
		<a href="/org" class="link"> Orgs </a>
		{#if $session?.data?.user.name}
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						<img
							alt="Tailwind CSS Navbar component"
							src={$session?.data?.user.name ??
								'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
						/>
					</div>
				</div>
				<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
				<ul
					tabindex="0"
					class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 space-y-1 p-2 shadow"
				>
					<li>
						<a href="/" class="justify-between">
							Profile
							<span class="badge">New</span>
						</a>
					</li>
					<li>
						<a href="/org">
							{#if $org?.data?.name}
								{$org.data.name}
							{:else}
								Orgs
							{/if}
						</a>
					</li>
					<li>
						<a href="/api/auth/reference">API</a>
					</li>
					<li>
						<button
							class="btn btn-primary"
							onclick={async () => {
								await auth.signOut();
							}}
						>
							Signout
						</button>
					</li>
				</ul>
			</div>
		{:else}
			<a href="/login"> Login</a>
		{/if}
	</div>
</div>


{@render children()}
