<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	import auth from '$lib/client/auth-client';

	let email = $state('eu@andrebrandao.dev');
	let password = $state('senha123');
	let name = $state('André');

	let msg = '';
	const login = async (e: SubmitEvent) => {
		e.preventDefault();
		const res = await auth.signUp.email({
			email,
			password,
			name
		});
		console.log(res);
		if (res.error?.message) {
			msg = res.error.message;
		} else {
			msg = 'Sign up successful!';
		}
	};
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<h1>Sign Up</h1>
	<form onsubmit={login}>
		<div>
			<label for="name">Name</label>
			<input type="text" id="name" class="input" bind:value={name} required />
		</div>
		<div>
			<label for="email">Email</label>
			<input type="email" id="email" class="input" bind:value={email} required />
		</div>
		<div>
			<label for="password">Password</label>
			<input type="password" id="password" class="input" bind:value={password} required />
		</div>
	

		<button class="btn" type="submit">Sign Up</button>
	</form>

	{#if data}
		<p>{JSON.stringify(data)}</p>
	{/if}
	<a href="/login">Login</a>
</div>
