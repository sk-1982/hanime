import { APISearchResult } from './api-types/APISearchResult';
import { APIShortVideoInfo } from './api-types/APIShortVideoInfo';

export class HAnimeSearch {
    private _videos: APIShortVideoInfo[];

    constructor(private api_result: APISearchResult) {
        this._videos = JSON.parse(api_result.hits);
    }

    public get page() {
        return this.api_result.page;
    }

    public get pages() {
        return this.api_result.nbPages;
    }

    public get hits_per_page() {
        return this.api_result.hitsPerPage;
    }

    public get hits() {
        return this.api_result.nbHits;
    }

    public get videos() {
        return this._videos;
    }
}