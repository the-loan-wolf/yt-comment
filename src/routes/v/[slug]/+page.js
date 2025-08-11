// /** @type {import('./$types').PageLoad} */
// export async function load({ fetch, params }) {
// 	let posts = [];
// 	try {
// 		if (params) {
// 			const res = await fetch('/api/comments', {
// 				method: 'POST',
// 				body: JSON.stringify({ vidID: `${params.slug}` }),
// 				headers: {
// 					'content-type': 'application/json'
// 				}
// 			});
// 			posts = await res.json();
// 			console.log(posts.comments);
// 			// return { posts };
// 		} else return;
// 	} catch (err) {
// 		console.error('Error loading comments:', err);
// 	}
// 	return { posts };
// }

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return { post: params.slug };
}
