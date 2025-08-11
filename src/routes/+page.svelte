<script>
	import { goto } from '$app/navigation';
	import { Button } from './components/ui/button/index.js';
	import { Input } from './components/ui/input/index.js';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from './components/ui/card/index.js';
	import { PlayCircle, Search } from 'lucide-svelte';

	let videoId = $state('');
	let isLoading = $state(false);

	let { slug } = $state('');

	function handleSubmit(e) {
		e.preventDefault();
		slug = e.target[0].value;
		if (slug.trim()) {
			goto(`/v/${slug.trim()}`);
		}
	}

	const isButtonDisabled = $derived(isLoading || !videoId.trim())
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
	<div class="mx-auto max-w-2xl pt-12">
		<!-- Header Section -->
		<div class="mb-8 text-center">
			<div class="mb-4 flex items-center justify-center md:gap-3">
				<PlayCircle class="h-16 w-16 md:h-8 md:w-8 text-red-600" />
				<h1 class="text-3xl font-bold text-slate-900">YouTube Comment Viewer</h1>
			</div>
			<p class="text-lg text-slate-600">Enter a YouTube video ID to view and analyze comments</p>
		</div>

		<!-- Main Card -->
		<Card class="border-0 bg-white/80 shadow-xl backdrop-blur-sm">
			<CardHeader class="pb-6 text-center">
				<CardTitle class="text-xl text-slate-800">Get Started</CardTitle>
				<CardDescription class="text-slate-600">
					Paste your YouTube video ID below to load comments
				</CardDescription>
			</CardHeader>

			<CardContent>
				<form onsubmit={handleSubmit} class="space-y-4">
					<div class="space-y-2">
						<label for="video-id" class="text-sm font-medium text-slate-700"> Video ID </label>
						<div class="relative">
							<!-- Using Svelte bind:value for two-way data binding -->
							<Input
								id="video-id"
								type="text"
								bind:value={videoId}
								placeholder="e.g., dQw4w9WgXcQ"
								class="h-12 border-slate-200 pl-10 text-base focus:border-red-500 focus:ring-red-500"
								required
							/>
							<Search
								class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400"
							/>
						</div>
						<p class="text-xs text-slate-500">
							Find the video ID in the YouTube URL after "v=" or "youtu.be/"
						</p>
					</div>

					<!-- Using derived state for disabled attribute -->
					<Button
						type="submit"
						class="h-12 w-full bg-red-600 text-base font-semibold text-white hover:bg-red-700"
						disabled={isButtonDisabled}
					>
						{#if isLoading}
							<div class="flex items-center gap-2">
								<div
									class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
								></div>
								Loading Comments...
							</div>
						{:else}
							<div class="flex items-center gap-2">
								<PlayCircle class="h-4 w-4" />
								View Comments
							</div>
						{/if}
					</Button>
				</form>
			</CardContent>
		</Card>

		<div class="mx-auto max-w-4xl space-y-8 p-6">
			<!-- /* Main heading */ -->
			<div class="space-y-4 text-center">
				<h2 class="text-3xl font-bold text-gray-900 md:text-4xl">Reddit-Style YouTube Comments</h2>
				<p class="text-lg leading-relaxed text-gray-600">
					This app provides a Reddit-like experience for reading YouTube comments, making it easier
					to browse and engage with video discussions.
				</p>
			</div>

			<!-- /* Experimental notice */ -->
			<div class="rounded-lg border border-amber-200 bg-amber-50 p-4">
				<div class="flex items-center gap-2">
					<span class="text-2xl">🚧</span>
					<p class="font-medium text-amber-800">Application is in experimental phase</p>
				</div>
			</div>

			<!-- {/* Current limitations */} -->
			<div class="rounded-lg border border-blue-200 bg-blue-50 p-6">
				<h3 class="mb-4 text-xl font-semibold text-blue-900">Current Limitations</h3>
				<ul class="space-y-3 text-blue-800">
					<li class="flex items-start gap-3">
						<span class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-400"></span>
						<span>
							YouTube has different types of links and we don't want to handle all those types, so
							only video IDs are allowed.
						</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-400"></span>
						<span>We are not using the official YouTube API, so scraping comments takes time.</span>
					</li>
				</ul>
			</div>

			<!-- {/* Missing features */} -->
			<div class="rounded-lg border border-gray-200 bg-gray-50 p-6">
				<h3 class="mb-4 text-xl font-semibold text-gray-900">Upcoming Features</h3>
				<ul class="space-y-3 text-gray-700">
					<li class="flex items-start gap-3">
						<span class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400"></span>
						<span>Hiding all replies after clicking on root comment</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400"></span>
						<span>Caching scraped comments for faster subsequent responses</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400"></span>
						<span>Decorating others routes, right now only homepage looks good</span>
					</li>
				</ul>
			</div>
		</div>

		<!-- Footer -->
		<div class="mt-8 text-center text-sm text-slate-500">
			<p>Read YouTube comments with ease</p>
		</div>
	</div>
</div>