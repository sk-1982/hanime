import { APITags } from './APITags';

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