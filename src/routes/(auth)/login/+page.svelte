<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	import auth from '$lib/client/auth-client';

	let email = $state('eu@andrebrandao.dev');
	let password = $state('senha123');
	// let name = $state('André');

	let msg = $state('');
	const login = async (e: Event) => {
		e.preventDefault(); // Prevent default form submission
		const { data, error } = await auth.signIn.email({
			email,
			password
			// name,
		});
		if (error) {
			console.error('Login error:', error);
			msg = error.message ?? 'Login failed'; // Set error message
		} else {
			// Handle successful login
			msg = 'Login successful!'; // Set success message
			// Optionally redirect or perform other actions here
		}
	};
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<h1>Sign In</h1>
	<form onsubmit={login}>
		<div>
			<label for="email">Email</label>
			<input type="email" id="email" class="input" bind:value={email} required />
		</div>

		<div>
			<label for="password">Password</label>
			<input type="password" id="password" class="input" bind:value={password} required />
		</div>

		<button class="btn" type="submit">Login</button>
	</form>

	{#if data}
		<p>{JSON.stringify(data)}</p>
	{/if}

    <a href="/signup">Sign Up</a>
</div>
