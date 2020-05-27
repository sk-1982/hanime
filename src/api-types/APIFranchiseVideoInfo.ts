export type APIFranchiseVideoInfo = {
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