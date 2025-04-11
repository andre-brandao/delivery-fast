<script lang="ts">
	import '../app.css';

	let { children } = $props();

	import auth from '$lib/client/auth-client';
	import { Building2, Map } from 'lucide-svelte';
	const session = auth.useSession();

	const org = auth.useActiveOrganization();

	$inspect($session);
</script>

<nav class="bg-base-200 border-primary/20 sticky top-0 z-50 w-full border-b shadow-sm">
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<div class="flex items-center">
			<a href="/" class="text-secondary flex items-center gap-2 text-xl font-bold"> Rota88 </a>
		</div>

		<div class="items-center gap-4 md:flex">
			<a href="/map" class="btn btn-sm btn-ghost hover:bg-primary/10 flex items-center gap-1.5">
				<Map class="h-4 w-4" />
				Map
			</a>
			<a href="/org" class="btn btn-sm btn-ghost hover:bg-primary/10 flex items-center gap-1.5">
				<Building2 class="h-4 w-4" />
				Organizations
			</a>
		</div>

		<div class="flex items-center gap-2">
			{#if $session?.data?.user.name}
				<div class="dropdown dropdown-end">
					<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
						<div class="w-10 rounded-full">
							<img
								alt="Tailwind CSS Navbar component"
								src={$session?.data?.user.image ??
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
				<a href="/login" class="btn btn-primary btn-sm"> Login </a>
			{/if}
		</div>
	</div>
</nav>

{@render children()}
