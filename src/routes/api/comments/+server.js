// src/routes/api/posts/+server.js
import { exec } from 'node:child_process';
import fs from 'node:fs';

export async function POST({ request }) {
	const req = await request.json();
	const posts = req.vidID;
	return new Promise((resolve) => {
		exec(
			`yt-dlp --write-comments --skip-download https://www.youtube.com/watch?v=${posts} -o comments-cache/${posts}`,
			(error, stdout, stderr) => {
				if (error) {
					resolve(new Response(JSON.stringify({ error: stderr }), { status: 500 }));
					return;
				}
				try {
                    const jsonData = fs.readFileSync(`./comments-cache/${posts}.info.json`, "utf8");
                    const parsed = JSON.parse(jsonData);
                    resolve(new Response(JSON.stringify(parsed), { status: 200 }));
                } catch (e) {
                    resolve(new Response(JSON.stringify({ error: e.message }), { status: 500 }));
                }
			}
		);
	});
}
