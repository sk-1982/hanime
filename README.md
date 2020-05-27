# HAnime API
A NodeJS module written in TypeScript to access hanime's undocumented API.

# Usage
```js
const { HAnimeAPI } = require('hanime');
const api = new HAnimeAPI();

const results = await api.search('query');

const video = await api.get_video(results.videos[0]);
```

# Documentation

### `class HAnimeAPI`: main API class
#### `constructor(options?)`
* `options` (optional):
    * `options.fetch_options`: options to pass to [`node-fetch`](https://github.com/node-fetch/node-fetch)
    * `options.timeout`: timeout, in ms, for fetch requests
#### `async search(query: string, config?: SearchConfig): Promise<HAnimeSearch>`: preforms a search
* `query`: query to search for
* `config` (optional): search config
    * `config.tags: string[]`: tags to search for
    * `config.tags_mode: 'AND' | 'OR'`: search for videos that have every tag provided, or at least one tag provided
    * `config.brands: string[]`: video publishers to search for
    * `blacklist: string[]`: tags to exclude
    * `order_by: string`: search ordering, one of `'created_at_unix', 'views', 'likes', 'released_at_unix', 'title_sortable'`
    * `ordering: 'desc' | 'asc'`: ordering for `order_by`
    * `page: number`: page to search on (0-indexed)
    * `auto_tag: boolean`: whether to convert search queries to tags. Example: query `'futa trap title'` turns into tags `['futanari', 'trap']` and query `'title'`. Default: `true`
#### `async search(config: SearchConfig): Promise<HAnimeSearch>`: preforms a search
* `config`: search config
    * `config.search_text: string`: text to search for
    * `config.tags: string[]`: tags to search for
    * `config.tags_mode: 'AND' | 'OR'`: search for videos that have every tag provided, or at least one tag provided
    * `config.brands: string[]`: video publishers to search for
    * `blacklist: string[]`: tags to exclude
    * `order_by: string`: search ordering, one of `'created_at_unix', 'views', 'likes', 'released_at_unix', 'title_sortable'`
    * `ordering: 'desc' | 'asc'`: ordering for `order_by`
    * `page: number`: page to search on (0-indexed)
#### `async get_video(video: APIShortVideoInfo | string): Promise<HAnimeVideo>`: gets full video info given a short info from a search query, or a slug

### `class HAnimeSearch`: results from a search
#### `page: number`: the current page of this search
#### `pages: number`: the total number of pages for this search
#### `hits_per_page: number`: the number of videos in a page
#### `hits: number`: the total number of videos for this search
#### `videos: APIShortVideoInfo[]`: a list of short video info objects

### `class HAnimeVideo`: video info
#### `titles: APITitle[]`: the different titles for this video in different languages
#### `name: string`: the name of this video
#### `views: number`: the number of views this video has
#### `interests: number`: the number of interests this video has
#### `poster_url: string`: the url for the vertical poster of this video
#### `cover_url: string`: the url for the horizontal cover preview of this video
#### `video_url: string`: the url for the actual video
#### `duration: number`: the duration of this video, in ms. May be 0
#### `brand`: gets the animator of the video. Has the following properties:
* `count: number`: number of videos this brand has on the site
* `email: string`: email, may be null
* `id: number`: internal id of this brand
* `logo_url: string`: logo, may be null
* `slug: string`: internal slug
* `title: string`: name of brand
* `website_url: string`: website, may be null
#### `rating: number`: rating of the video
#### `likes: number`: number of likes
#### `dislikes: number`: number of dislikes
#### `downloads: number`: number of downloads
#### `monthly_rank: number`: monthly rank of this video
#### `created_at: Date`: date this video was created
#### `released_at: Date`: date this video was released
#### `description: string`: plaintext description of the video
#### `tags`: array of tags. Each element has the following properties:
* `id: number`: internal id of this tag
* `text: string`: the tag
* `count: number`: ?
* `description: string`: "witty" description of this tag
#### `franchise`: which franchise this video is from. Has the following properties
* `id: number`
* `name: string`
* `slug: string`
* `title: string`
#### `franchise_videos: APIFranchiseVideoInfo[]`: other videos in thie franchise
#### `next_video: APIFranchiseVideoInfo`: next-up video
#### `next_random_video: APIFranchiseVideoInfo`: random video
#### `data`: raw data returned by API

# Types

#### `APITitle`
```ts
type APITitle = {
    lang: string, // en, x-jat (romanji), ja, ko
    kind: string, // main, official, syn
    title: string
}
```

#### `APIFranchiseVideoInfo`
```ts
type APIFranchiseVideoInfo = {
    brand: string,
    brand_id: string,
    cover_url: string,
    created_at: string,
    created_at_unix: number,
    dislikes: number,
    downloads: number,
    duration_in_ms: number | 0,
    id: string,
    interests: number,
    is_banned_in: string,
    is_censored: boolean,
    is_hard_subtitled: boolean,
    likes: number,
    monthly_rank: number,
    name: string,
    poster_url: string,
    preview_url: null, // TODO: what is this supposed to be?
    primary_color: null, // TODO: what is this supposed to be?
    rating: number | null,
    released_at: string,
    released_at_unix: number,
    slug: string,
    views: number
}
```

#### `APIShortVideoInfo`
```ts
export type APIShortVideoInfo = {
    brand: string,
    brand_id: number,
    cover_url: string,
    created_at: number,
    description: string,
    dislikes: number,
    downloads: number,
    duration_in_ms: number | 0,
    id: number,
    interests: number,
    is_censored: boolean,
    likes: number,
    monthly_rank: number,
    name: string,
    poster_url: string,
    rating: number,
    released_at: number,
    slug: string,
    tags: APITags[],
    titles: string[],
    views: number
};
```

#### `APITags`
```ts
export const APITags = [
    '3d',
    'ahegao',
    'anal',
    'bdsm',
    'big boobs',
    'blow job',
    'bondage',
    'boob job',
    'censored',
    'comedy',
    'cosplay',
    'creampie',
    'dark skin',
    'facial',
    'fantasy',
    'filmed',
    'foot job',
    'futanari',
    'gangbang',
    'glasses',
    'hand job',
    'harem',
    'hd',
    'horror',
    'incest',
    'inflation',
    'lactation',
    'loli',
    'maid',
    'masturbation',
    'milf',
    'mind break',
    'mind control',
    'monster',
    'nekomimi',
    'ntr',
    'nurse',
    'orgy',
    'plot',
    'pov',
    'pregnant',
    'public sex',
    'rape',
    'reverse rape',
    'rimjob',
    'scat',
    'school girl',
    'shota',
    'softcore',
    'swimsuit',
    'teacher',
    'tentacle',
    'threesome',
    'toys',
    'trap',
    'tsundere',
    'ugly bastard',
    'uncensored',
    'vanilla',
    'virgin',
    'watersports',
    'x-ray',
    'yaoi',
    'yuri'
] as const;

export type APITags = (typeof APITags)[number];
```