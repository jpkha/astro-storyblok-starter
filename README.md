<div align="center">
	<a  href="https://www.storyblok.com?utm_source=github.com&utm_medium=readme&utm_campaign=storyblok-astro" align="center">
		<img  src="https://a.storyblok.com/f/88751/1500x500/7974d6bc34/storyblok-astro.png" width="300" height="100" alt="Storyblok + Astro">
	</a>
</div>

The repository is based on new Project structure on Storyblok. 
You can use it as a template to start your own project with Storyblok, Astro and Netlify.

## Usage

> If you are first-time user of Storyblok, read the [Getting Started](https://www.storyblok.com/docs/guide/getting-started?utm_source=github.com&utm_medium=readme&utm_campaign=storyblok-astro) guide to get a project ready in less than 5 minutes.

> For further information on [@storyblok/astro](https://github.com/storyblok/storyblok-astro) check the [repository](https://github.com/storyblok/storyblok-astro)


## Installation

Here the code to `astro.config.mjs`, replace the `STORYBLOK_TOKEN_ACCESS` in your `.env` file

```js
import { defineConfig } from "astro/config";
import storyblok from "@storyblok/astro";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify/functions";
import { loadEnv } from "vite";
const { PUBLIC_ENV, STORYBLOK_TOKEN_ACCESS} = loadEnv(import.meta.env.MODE, process.cwd(), "");
export default defineConfig({
  output: PUBLIC_ENV === 'preview' ? 'server' : 'static',
  adapter: PUBLIC_ENV === 'preview' ? netlify() : undefined,
  integrations: [
    storyblok({
      accessToken: STORYBLOK_TOKEN_ACCESS,
      bridge: PUBLIC_ENV !== 'production',
      components: {
        page: "storyblok/Page",
        feature: "storyblok/Feature",
        grid: "storyblok/Grid",
        teaser: "storyblok/Teaser",
      },
    }),
    tailwind(),
  ],
});
```

You can check the `.env.example`
```
PUBLIC_ENV=preview
STORYBLOK_TOKEN_ACCESS=<your token access>
```


## Dynamic Slug

<u>ATTENTION</u> : In this repository I'm using `[...path].astro` instead of `[slug].astro`. 
 
In my opinion, using `[...path].astro` provide more flexibility with Storyblok, for further [informations](https://docs.astro.build/en/core-concepts/routing/). 
Briefly, with `[...path]` you can generate any path depth you need.




## Development

You can use this command `npm run dev-sb', in order to launch the server and the proxy so you can embedded your localhost in Storyblok
```
"dev-sb": "astro dev & local-ssl-proxy --source 3010 --target 3000 --cert localhost.pem --key localhost-key.pem"
```

If you haven't set any https://localhost:3010 yet, you can check :

- [Setting up Dev Server with HTTPS Proxy On macOS](https://www.storyblok.com/faq/setup-dev-server-https-proxy)
- [Setting up Dev Server with HTTPS Proxy On Windows](https://www.storyblok.com/faq/setup-dev-server-https-windows)


## Deployment

### What the purpose of `PUBLIC_ENV` ?
If you deploy your project in static for production, you won't see any change from Storyblok.
If you set up one environment for production and another one for the preview mode which will be in SSR you can check your change before deploying in production.

>In this repository I use Netlify but you can use any [other adapter](https://docs.astro.build/en/guides/server-side-rendering) instead
