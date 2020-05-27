import fetch, { RequestInit } from 'node-fetch';
import { APISearchRequest } from './api-types/APISearchRequest';
import { APISearchResult } from './api-types/APISearchResult';
import { HAnimeSearch } from './HAnimeSearch';
import { APITags } from './api-types/APITags';
import { APIShortVideoInfo } from './api-types/APIShortVideoInfo';
import { HAnimeVideo } from './HAnimeVideo';
import AbortController from 'abort-controller';

const tag_aliases: { [key: string]: APITags } = {
    '3-d': '3d',
    'big breasts': 'big boobs',
    'large breasts': 'big boobs',
    'large boobs': 'big boobs',
    'big boob': 'big boobs',
    'large boob': 'big boobs',
    'large breast': 'big boobs',
    'huge boobs': 'big boobs',
    'huge boob': 'big boobs',
    'huge breast': 'big boobs',
    'huge breasts': 'big boobs',
    'blowjob': 'blow job',
    'bj': 'blow job',
    'breast job': 'boob job',
    'breastjob': 'boob job',
    'boobjob': 'boob job',
    'cream pie': 'creampie',
    'footjob': 'foot job',
    'futa': 'futanari',
    'gang bang': 'gangbang',
    'handjob': 'hand job',
    'lolicon': 'loli',
    'mindbreak': 'mind break',
    'neko mimi': 'nekomimi',
    'kemonomimi': 'nekomimi',
    'kemono mimi': 'nekomimi',
    'netorare': 'ntr',
    'point of view': 'pov',
    'point-of-view': 'pov',
    'rim job': 'rimjob',
    'rim-job': 'rimjob',
    'schoolgirl': 'school girl',
    'school-girl': 'school girl',
    'shotacon': 'shota',
    'soft core': 'softcore',
    'swim suit': 'swimsuit',
    'otoko': 'trap',
    'otokonoko': 'trap',
    'josou': 'trap',
    'otoko noko': 'trap',
    'otoko no musume': 'trap',
    'uncen': 'uncensored',
    'water sports': 'watersports',
    'water-sports': 'watersports',
    'xray': 'x-ray',
    'x ray': 'x-ray'
};

export type SearchConfig = { [P in keyof Omit<APISearchRequest, 'search_text'>]?: APISearchRequest[P] } & { search_text: string }

export class HAnimeAPI {
    constructor(private options?: {
        fetch_options?: RequestInit,
        timeout?: number
    }) {
        this.options = options ?? {};

        if (!this.options.timeout) this.options.timeout = 5000;
        if (!this.options.fetch_options) this.options.fetch_options = {};
    }

    private get_fetch_options(options: RequestInit): RequestInit {
        return Object.assign({},
            this.options.fetch_options,
            options,
            {
                headers: Object.assign({},
                    this.options.fetch_options?.headers ?? {},
                    options.headers ?? {}
                )
            }
        );
    }

    private get_tags_from_search(query: string): [ string, string[] ] {
        const tags = new Set<string>();

        APITags.forEach(tag => {
            const regex = new RegExp(`\\b${tag}\\b`, 'ig');

            query = query.replace(regex, () => {
                tags.add(tag);

                return '';
            });
        });

        Object.entries(tag_aliases).forEach(([ alias, tag ]) => {
            const regex = new RegExp(`\\b${alias}\\b`, 'ig'); 

            query = query.replace(regex, () => {
                tags.add(tag);

                return '';
            });
        });

        return [ query.replace(/\s+/g, ' '), [...tags] ];
    }

    public async search(query: string, config?: Omit<SearchConfig, 'search_text'> & { auto_tag?: boolean }): Promise<HAnimeSearch>
    public async search(config: SearchConfig): Promise<HAnimeSearch>

    public async search(config_or_query: string | SearchConfig, config?: Omit<SearchConfig, 'search_text'> & { auto_tag?: boolean }): Promise<HAnimeSearch> {
        let api_config: APISearchRequest;

        if (typeof config_or_query == 'string') {
            let tags = [];

            if (config?.auto_tag ?? true) [ config_or_query, tags ] = this.get_tags_from_search(config_or_query);

            api_config = Object.assign({
                search_text: config_or_query,
                tags_mode: 'AND',
                brands: [],
                blacklist: [],
                order_by: 'created_at_unix',
                ordering: 'desc'
            }, config, {
                tags: [...new Set<string>([...tags, ...(config?.tags ?? [])])],
            });
        } else {
            api_config = Object.assign({
                tags: [],
                tags_mode: 'AND',
                brands: [],
                blacklist: [],
                order_by: 'created_at_unix',
                ordering: 'desc'
            }, config_or_query);
        }

        return new HAnimeSearch(await this.api_search(api_config));
    }

    private async api_search(config: APISearchRequest): Promise<APISearchResult> {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), this.options.timeout);

        const result = await fetch('https://search.htv-services.com/', this.get_fetch_options({
            method: 'POST',
            body: JSON.stringify(config),
            headers: {
                'Content-Type': 'application/json'
            },
            signal: controller.signal
        }));

        clearTimeout(timeout);

        return result.json();
    }

    public async get_video(video: APIShortVideoInfo | string): Promise<HAnimeVideo> {
        const slug = typeof video == 'string' ? video : video.slug;

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), this.options.timeout);

        const video_info = await fetch(`https://members.hanime.tv/rapi/v7/video?id=${slug}`, this.get_fetch_options({
            method: 'GET',
            signal: controller.signal
        }));

        clearTimeout(timeout);

        return new HAnimeVideo(await video_info.json());
    }
}