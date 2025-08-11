<script>
	import CommentBox from './commentBox.svelte';

	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	// state
	let loading = $state(true);
	let commentTree = $state([]);

	$effect(async () => {
		loading = true;
		const res = await fetch('/api/comments', {
			method: 'POST',
			body: JSON.stringify({ vidID: data.post }),
			headers: { 'content-type': 'application/json' }
		});
		const fetchData = await res.json();

		let jsonString = JSON.stringify(fetchData.comments);

		let sortedComments = fetchData.comments.toSorted((a, b) => b.like_count - a.like_count);

		commentTree = buildCommentTree(sortedComments);

		loading = false;

		function buildCommentTree(comments) {
			const map = new Map();

			comments.forEach((c) => map.set(c.id, { ...c, replies: [] }));

			const roots = [];

			map.forEach((comment) => {
				if (comment.parent === 'root') {
					roots.push(comment);
				} else {
					const parent = map.get(comment.parent);
					if (parent) {
						parent.replies.push(comment);
					}
				}
			});

			return roots;
		}
	});
</script>

{#if loading}
	<div>
		<p>Loading comments... Hold Tight!</p>
		<p>Can take long if number of comments is large</p>
	</div>
{:else}
	<div class="bg-blue-500">
		{#each commentTree as comment, i (comment.id)}
			{#if comment.parent == 'root'}
				<CommentBox
					username={comment.author}
					likes={comment.like_count}
					content={comment.text}
					rank={i + 1}
					time={comment.timestamp}
					avatar={comment.author_thumbnail}
					repliesCount={comment.replies.length}
					replies={comment.replies}
				/>
			{/if}
		{/each}
	</div>
{/if}
