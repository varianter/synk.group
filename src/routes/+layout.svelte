<script>
  import '../app.css';
  import Header from '../components/header.svelte';
</script>

<div class="h-full flex flex-col bg-brand-beige font-light font-serif">
  <Header />
  <main class="grow-1 h-full">
    <slot />
  </main>
</div>
