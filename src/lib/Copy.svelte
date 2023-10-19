<script lang="ts">
	import { copy } from 'svelte-copy';

	export let code: string;

	let copied = false;
	let timeout: ReturnType<typeof setTimeout>;

	function onCopy() {
		clearTimeout(timeout);
		copied = true;
		timeout = setTimeout(() => (copied = false), 3000);
	}
</script>

<button
	use:copy={code}
	on:svelte-copy={onCopy}
	aria-label="Copy code to clipboard"
	class="p-1 transition-all duration-100 ease-in-out">
	<div class="rounded-xl border px-3 py-2 hover:bg-gray-100">
		{#if copied}
			<span class="flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					><g fill="none"
						><path
							d="M5 13l4 4L19 7"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round" /></g
					></svg>
				<span class="px-2"> Copied to clipboard </span>
			</span>
		{:else}
			<span class="flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="12"
					viewBox="0 0 24 24">
					<g
						stroke-linejoin="round"
						stroke-linecap="round"
						stroke-width="2"
						fill="none"
						stroke="currentColor">
						<rect
							x="9"
							y="9"
							width="13"
							height="13"
							rx="2"
							ry="2" />
						<path
							d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
					</g>
				</svg>
				<span class="px-2">Copy to clipboard</span>
			</span>
		{/if}
	</div>
</button>
