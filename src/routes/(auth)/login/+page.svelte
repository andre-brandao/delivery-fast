<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	import auth, { getErrorMessage } from '$lib/client/auth-client';
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	import { Mail, Lock, ArrowRight, User, CheckCircle } from 'lucide-svelte';

	let email = $state('eu@andrebrandao.dev');
	let password = $state('senha123');
	let showPassword = $state(false)
	let loading = $state(false)
	// let name = $state('André');

	let msg = $state('');
	const login = async (e: Event) => {
		loading = true
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

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col md:flex-row">
	<div class="w-full  flex items-center justify-center p-8">
	  <div class="w-full max-w-md" in:fly={{ y: 20, duration: 700, delay: 300 }}>
		<div class="text-center mb-8">
		  <h1 class="text-3xl font-bold text-gray-800 mb-2">log in</h1>
		  <p class="text-gray-500">Coloque seus dados para realizar o login</p>
		</div>
		
		<div class="bg-base-100 rounded-2xl shadow-xl p-8">
		  <form onsubmit={login} class="space-y-6">
			<div class="space-y-2">
			  <label for="email" class="text-sm font-medium text-gray-700 flex items-center gap-2">
				<Mail size={16} class="text-primary/70" />
				Email Address
			  </label>
			  <div class="relative">
				<input 
				  type="email" 
				  id="email" 
				  placeholder="seuemail@email.com"
				  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 outline-none"
				  bind:value={email} 
				  required 
				/>
			  </div>
			</div>
			
			<div class="space-y-2">
			  <label for="password" class="text-sm font-medium text-gray-700 flex items-center gap-2">
				<Lock size={16} class="text-primary/70" />
				Senha
			  </label>
			  <div class="relative">
				<input 
				  type={showPassword ? "text" : "password"} 
				  id="password" 
				  placeholder="••••••••"
				  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 outline-none"
				  bind:value={password} 
				  required 
				/>

			  </div>
			</div>
			

			<button 
			  class="w-full bg-primary hover:bg-primary/90 text-base-100 font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 {loading ? 'opacity-80' : ''}"
			  type="submit"
			  disabled={loading}
			>
			  {#if loading}
				<div class="w-5 h-5 border-2 border-base-100 border-t-transparent rounded-full animate-spin"></div>
				Logando...
			  {:else}
				Login
				<ArrowRight size={18} />
			  {/if}
			</button>
		  </form>
		  
		 
		</div>
		
		<div class="text-center mt-6">
		  <p class="text-gray-600">
			Não tem uma conta? 
			<a href="/signup" class="font-medium text-primary hover:text-primary/80 transition-colors">Criar</a>
		  </p>
		</div>
	  </div>
	</div>
  </div>