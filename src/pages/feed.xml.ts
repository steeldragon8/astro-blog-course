import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

const parser = new MarkdownIt();

export async function GET(content: APIContext) {
    const posts = await getCollection('blog');
    return rss({
        title: "Angel Lopez's Blog",
        description: "I wirte abour web development",
        site: content.site?.toString() || "https://angellopez.mx",
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.date,
            link: `/blog/${post.slug}`,
            content: sanitizeHtml(parser.render(post.body)),
        }))
    })
}