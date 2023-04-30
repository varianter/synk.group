<script lang="ts">
	import UserIcon from '../components/icons/user.svelte';
	import { MenuIcon } from 'svelte-feather-icons';
	const date = new Date();
	const options: any = { weekday: 'long', day: 'numeric', month: 'long' };
	const formattedDate = date.toLocaleDateString('nb-NO', options);
</script>

<header class="p-8 grid items-center text-3xl">
	<nav class="flex justify-between">
		<div class="flex gap-x-12 items-center">
			<button class="hover:bg-black/10 p-3 rounded-xl transition">
				<MenuIcon size="20" />
			</button>
			<div><span class="font-medium">Synk.</span>Variant</div>
		</div>

		<div class="flex items-center gap-x-12">
			<span>{formattedDate}</span>
			<UserIcon />
		</div>
	</nav>
</header>
