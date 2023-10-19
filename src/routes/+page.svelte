<script lang="ts">
	import CodeDetails from '$lib/CodeDetails.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const suggestions = [
		{
			name: 'jacobparis/new',
			url: 'https://github.com/jacobparis/new',
		},
		{
			name: 'remix-run/indie-stack',
			url: 'https://github.com/remix-run/indie-stack',
		},
	];
</script>

<main class="px-2">
	<div class="flex flex-col items-center">
		<div class="py-4 lg:py-12" />
		<img src="/gitpod.svg" width="100" height="100" alt="Gitpod Logo" />

		<h1 class="text-7xl font-bold text-gray-900">Gitpodify</h1>
	</div>

	<form>
		<div class="grid grid-rows-1 place-items-center">
			<div class="space-y-4 py-4">
				<label for="url" class="block">
					Enter the URL to any GitHub, GitLab or Bitbucket repository,
					branch, or pull/merge request.
				</label>

				<ul
					class="mx-auto flex max-w-3xl flex-wrap space-x-4 text-sm lg:max-w-4xl">
					{#each suggestions as suggestion (suggestion.name)}
						<li>
							<a
								href={`?url=${suggestion.url}`}
								class="text-sky-600 underline hover:text-sky-500">
								{suggestion.name}
							</a>
						</li>
					{/each}
				</ul>

				<input
					id="url"
					type="text"
					name="url"
					value={data.url || ''}
					class="w-full rounded-full border px-4 py-2 text-xl" />
			</div>

			<div class="flex space-x-4">
				<button
					type="submit"
					class="rounded-xl bg-gray-200 px-4 py-2 hover:bg-gray-100">
					Get Gitpodified Links
				</button>
			</div>
		</div>
	</form>

	{#if data.url}
		{@const htmlCode = `<a href=\"${data.gitpodifiedUrl}\" target=\"_blank\" rel=\"noreferrer nofollow\">\n  Open in Gitpod\n</a>`}
		<div class="pb-32">
			<h2
				class="mx-auto mt-8 mb-4 max-w-3xl text-4xl font-bold text-gray-800 lg:max-w-4xl">
				Links
			</h2>

			<div class="mx-auto mb-4 max-w-3xl lg:max-w-4xl">
				<a
					href={data.gitpodifiedUrl}
					target="_blank"
					rel="noreferrer nofollow"
					class=" text-sky-600 underline hover:text-sky-500">
					{data.gitpodifiedUrl}
				</a>
			</div>

			<CodeDetails summary="HTML" code={htmlCode} />

			<CodeDetails
				summary="Markdown"
				code="[Open in Gitpod]({data.gitpodifiedUrl})" />

			<h2
				class="mx-auto mt-8 mb-4 max-w-3xl text-4xl font-bold text-gray-800 lg:max-w-4xl">
				Buttons
			</h2>

			<div class="mx-auto mb-4 max-w-3xl lg:max-w-4xl">
				<a
					href={data.gitpodifiedUrl}
					target="_blank"
					rel="noreferrer nofollow"
					class="rounded-2xl">
					<img
						alt="Open in Gitpod"
						width="200"
						height="56"
						src="/open-in-gitpod.svg" />
				</a>
			</div>

			<CodeDetails
				summary="HTML"
				code={`<a href="${data.gitpodifiedUrl}" target="_blank" rel="noreferrer nofollow"> \n  <img\n    alt="Open in Gitpod"\n    width="200"\n    height="56"\n    src="https://gitpod.io/button/open-in-gitpod.svg"\n  />\n</a>`} />

			<CodeDetails
				summary="Markdown"
				code={`[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](${data.gitpodifiedUrl})`} />

			<h2
				class="mx-auto mt-8 mb-4 max-w-3xl text-4xl font-bold text-gray-800 lg:max-w-4xl">
				Badges
			</h2>

			<div class="mx-auto mb-4 max-w-3xl lg:max-w-4xl">
				<a
					href={data.gitpodifiedUrl}
					target="_blank"
					rel="noreferrer nofollow"
					class="rounded">
					<img
						alt="Contribute with Gitpod"
						width="200"
						height="56"
						src="/contribute-with-gitpod.svg" />
				</a>
			</div>

			<CodeDetails
				summary="HTML"
				code={`<a href="${data.gitpodifiedUrl}" target="_blank" rel="noreferrer nofollow"> \n  <img\n    alt="Contribute with Gitpod"\n    width="200"\n    height="56"\n    src="https://img.shields.io/badge/Contribute%20with-Gitpod-908a85?logo=gitpod"\n  />\n</a>`} />

			<CodeDetails
				summary="Markdown"
				code={`[![Contribute with Gitpod](https://img.shields.io/badge/Contribute%20with-Gitpod-908a85?logo=gitpod)](${data.gitpodifiedUrl})`} />

			<h2
				class="mx-auto mt-8 mb-4 max-w-3xl text-4xl font-bold text-gray-800 lg:max-w-4xl">
				Configuration files
			</h2>

			<CodeDetails
				summary=".gitpod.yml"
				code={`
# Commands to start on workspace startup
tasks:
- init: yarn install
  command: yarn build
# Ports to expose on workspace startup
ports:
- port: 8000
  onOpen: open-preview
`}>
				<a
					class="text-sky-600 underline hover:text-sky-500"
					href="https://www.gitpod.io/docs/references/gitpod-yml">
					Reference docs
				</a>
			</CodeDetails>
		</div>
	{:else}
		<div class="py-32" />
	{/if}

	<footer class="py-4 text-center">
		Made with ❤️ by
		<a
			href="https://twitter.com/intent/follow?screen_name=jacobmparis"
			target="_blank"
			rel="noreferrer nofollow"
			class=" text-sky-600 underline hover:text-sky-500">
			Jacob Paris
		</a>
	</footer>
</main>
