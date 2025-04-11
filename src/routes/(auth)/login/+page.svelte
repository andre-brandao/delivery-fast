<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	import auth, { getErrorMessage } from '$lib/client/auth-client';
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	import { Mail, Lock, ArrowRight, User, CheckCircle } from 'lucide-svelte';

	let email = $state('eu@andrebrandao.dev');
	let password = $state('senha123');
	let showPassword = $state(false);
	let loading = $state(false);
	// let name = $state('André');

	let msg = $state('');
	const login = async (e: Event) => {
		loading = true;
		e.preventDefault(); // Prevent default form submission
		const { data, error } = await auth.signIn.email({
			email,
			password
			// name,
		});
		if (error?.code) {
			alert(getErrorMessage(error.code, 'en'));
		} else {
			// Handle successful login
			msg = 'Login successful!'; // Set success message
			// Optionally redirect or perform other actions here
			goto('/');
		}
	};
</script>

<div class="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-slate-100 md:flex-row">
	<div class="flex w-full items-center justify-center p-8">
		<div class="w-full max-w-md" in:fly={{ y: 20, duration: 700, delay: 300 }}>
			<div class="mb-8 text-center">
				<h1 class="mb-2 text-3xl font-bold text-gray-800">log in</h1>
				<p class="text-gray-500">Coloque seus dados para realizar o login</p>
			</div>

			<div class="bg-base-100 rounded-2xl p-8 shadow-xl">
				<form onsubmit={login} class="space-y-6">
					<div class="space-y-2">
						<label for="email" class="flex items-center gap-2 text-sm font-medium text-gray-700">
							<Mail size={16} class="text-primary/70" />
							Email Address
						</label>
						<div class="relative">
							<input
								type="email"
								id="email"
								placeholder="seuemail@email.com"
								class="focus:ring-primary/30 focus:border-primary w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 outline-none focus:ring-2"
								bind:value={email}
								required
							/>
						</div>
					</div>

					<div class="space-y-2">
						<label for="password" class="flex items-center gap-2 text-sm font-medium text-gray-700">
							<Lock size={16} class="text-primary/70" />
							Senha
						</label>
						<div class="relative">
							<input
								type={showPassword ? 'text' : 'password'}
								id="password"
								placeholder="••••••••"
								class="focus:ring-primary/30 focus:border-primary w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 outline-none focus:ring-2"
								bind:value={password}
								required
							/>
						</div>
					</div>

					<button
						class="bg-primary hover:bg-primary/90 text-base-100 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-all duration-200 {loading
							? 'opacity-80'
							: ''}"
						type="submit"
						disabled={loading}
					>
						{#if loading}
							<div
								class="border-base-100 h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"
							></div>
							Logando...
						{:else}
							Login
							<ArrowRight size={18} />
						{/if}
					</button>
				</form>
			</div>

			<div class="mt-6 text-center">
				<p class="text-gray-600">
					Não tem uma conta?
					<a href="/signup" class="text-primary hover:text-primary/80 font-medium transition-colors"
						>Criar</a
					>
				</p>
			</div>
		</div>
	</div>
</div>
