<script lang="ts">
	import type { PageData } from '../$types';

	let { data }: { data: PageData } = $props();

	import auth, { getErrorMessage } from '$lib/client/auth-client';

	const orgs = auth.useListOrganizations();
	const current = auth.useActiveOrganization();
	let name = $state('New Org');
	let slug = $state('new-org');

	const createOrg = async () => {
		const { error } = await auth.organization.create({
			name,
			slug,
			// logo: ""
			metadata: {
				description: 'New Org Description',
				address: 'New Org Address',
				phone: '1234567890'
			}
		});

		if (error?.code) {
			alert(getErrorMessage(error.code, 'en'));
			return;
		}

		$orgs.refetch();
	};
</script>

<main class="flex">
	<div class="flex flex-col items-center justify-center">
		{#if $orgs.data}
			{#each $orgs.data as org}
				<button
					class="btn btn-primary"
					onclick={() =>
						auth.organization.setActive({
							organizationSlug: org.slug
						})}
				>
					{org.name}
				</button>
			{/each}
		{/if}
		{#if $orgs.error}
			<p>{$orgs.error}</p>
		{/if}
		{#if $orgs.isPending || $orgs.isRefetching}
			<p>Loading...</p>
		{/if}

		<p>---</p>
	</div>

	<div>
		{#if $current.data}
			<h1>Current Organization</h1>
			<div>
				<p>Members</p>
				{#each $current.data.members as member}
					<p>{member.email}</p>
				{/each}
			</div>
		{/if}
		{#if $current.error}
			<p>{$current.error}</p>
		{/if}
		{#if $current.isPending || $current.isRefetching}
			<p>Loading...</p>
		{/if}
	</div>
</main>

<!-- new org -->
<div class="flex flex-col items-center justify-center">
	<h1>Create New Organization</h1>
	<form onsubmit={createOrg}>
		<div>
			<label for="name">Name</label>
			<input type="text" id="name" class="input" bind:value={name} required />
		</div>
		<div>
			<label for="slug">Slug</label>
			<input type="text" id="slug" class="input" bind:value={slug} required />
		</div>

		<button class="btn" type="submit">Create Organization</button>
	</form>
	<!-- {#if $orgs.data}
		<p>{JSON.stringify($orgs.data)}</p>
	{/if}
	{#if $orgs.error}
		<p>{$orgs.error}</p>
	{/if}
	{#if $orgs.isPending || $orgs.isRefetching}
		<p>Loading...</p>
	{/if} -->
</div>
