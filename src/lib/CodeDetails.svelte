<script lang="ts">
	import Copy from './Copy.svelte';

	export let summary: string;
	export let code: string;
</script>

<details>
	<summary class="mx-auto mb-1 max-w-3xl text-gray-800 lg:max-w-4xl">
		{summary}
	</summary>

	<div class="mx-auto flex max-w-3xl items-baseline gap-x-2 lg:max-w-4xl">
		<Copy {code} />
		<slot />
	</div>

	<div class="mb-4 py-2 bg-[#f9f9f9]">
		<pre
			class="mx-auto max-w-3xl overflow-x-scroll pb-4 lg:max-w-4xl">{code}</pre>
	</div>
</details>
