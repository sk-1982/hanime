export const APIOrdering = [
    'created_at_unix',
    'views',
    'likes',
    'released_at_unix',
    'title_sortable'
] as const;

export type APIOrdering = (typeof APIOrdering)[number];