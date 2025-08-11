<script>
	import { ThumbsUp, MessageCircle } from 'lucide-svelte';
	import CommentBox from './commentBox.svelte';

	let { username, likes, content, rank, time, avatar, repliesCount, replies } = $props();

	const epoch = time * 1000;

	const istDate = new Date(epoch).toLocaleString('en-IN', {
		timeZone: 'Asia/Kolkata',
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	});
</script>

<div class="mx-auto max-w-4xl p-4 pr-0">
	<div class="rounded-l-lg border-y border-l border-gray-200 bg-gray-50 p-4 pr-0">
		<div class="flex items-start gap-3">
			<!-- User Avatar -->
			<!-- <div class="flex-shrink-0">
				<img src={avatar} alt="User avatar" class="h-12 w-12 rounded object-cover" />
			</div> -->

			<!-- Content -->
			<div class="min-w-0 flex-1">
				<div class="mb-2 flex flex-col md:gap-3 md:flex-row md:items-center">
					<div class="flex-shrink-0">
						<img src={avatar} alt="User avatar" class="h-12 w-12 rounded-full object-cover" />
					</div>
					<div class="flex flex-col gap-2 text-sm text-gray-600 md:flex-row md:items-center">
						<span class="font-medium text-blue-600">{username}</span>
						<span class="hidden md:inline">|</span>
						<span>{istDate}</span>
					</div>
					<span class="text-sm font-medium text-gray-500">#{rank}</span>
				</div>

				<!-- Post Content -->
				<div class="mb-3">
					<p class="text-sm leading-relaxed text-gray-900">
						{content}
					</p>
				</div>

				<!-- Engagement -->
				<div class="mb-3 flex items-center gap-4">
					<div class="flex items-center gap-1 text-sm text-gray-600">
						<ThumbsUp size={16} />
						<span class="font-medium">{likes}</span>
					</div>
				</div>

				<!-- Load Replies -->
				{#if repliesCount}
					<button class="flex items-center gap-1 text-sm text-blue-600 transition-colors">
						<MessageCircle size={16} />
						<span>{repliesCount} replies</span>
					</button>
				{/if}

				{#if replies.length > 0}
					<div id="replies">
						{#each replies as reply, i (reply.id)}
							<CommentBox
								username={reply.author}
								likes={reply.like_count}
								content={reply.text}
								rank={i + 1}
								time={reply.timestamp}
								avatar={reply.author_thumbnail}
								replies={reply.replies}
							/>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
