import { APIOrdering } from './APIOrdering';
import { APITags } from './APITags';

export interface APISearchRequest {
    search_text: string,
    tags: APITags[],
    tags_mode?: 'AND' | 'OR',
    brands: string[],
    blacklist: APITags[],
    order_by?: APIOrdering,
    ordering?: 'desc' | 'asc',
    page?: number
}