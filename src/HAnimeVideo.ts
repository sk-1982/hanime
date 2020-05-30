import { APIVideo } from './api-types/APIVideo';
import strip_html from 'string-strip-html';
import { HAnimeAPI } from './HAnimeAPI';

export class HAnimeVideo {
    constructor(private video: APIVideo) {}

    public get titles() {
        return this.video.hentai_video.titles;
    }

    public get name() {
        return this.video.hentai_video.name;
    }

    public get views() {
        return this.video.hentai_video.views;
    }

    public get interests() {
        return this.video.hentai_video.interests;
    }

    public get poster_url() {
        return HAnimeAPI.get_image_url(this.video.hentai_video.poster_url, 100, 'cps')
    }

    public get cover_url() {
        return HAnimeAPI.get_image_url(this.video.hentai_video.cover_url, 100, 'cps')
    }

    public get video_url() {
        return `https://hanime.tv/videos/hentai/${this.video.hentai_video.slug}`;
    }

    public get duration() {
        return this.video.hentai_video.duration_in_ms;
    }

    public get brand() {
        return this.video.hentai_video.brand;
    }

    public get rating() {
        return this.video.hentai_video.rating;
    }

    public get likes() {
        return this.video.hentai_video.likes;
    }

    public get dislikes() {
        return this.video.hentai_video.dislikes;
    }

    public get downloads() {
        return this.video.hentai_video.downloads;
    }

    public get monthly_rank() {
        return this.video.hentai_video.monthly_rank;
    }

    public get created_at() {
        return new Date(this.video.hentai_video.created_at);
    }

    public get released_at() {
        return new Date(this.video.hentai_video.released_at);
    }

    public get description() {
        return strip_html(this.video.hentai_video.description);
    }

    public get tags() {
        return this.video.hentai_tags;
    }

    public get franchise() {
        return this.video.hentai_franchise;
    }

    public get franchise_videos() {
        return this.video.hentai_franchise_hentai_videos;
    }

    public get next_video() {
        return this.video.next_hentai_video;
    }

    public get next_random_video() {
        return this.video.next_random_hentai_video;
    }

    public get data() {
        return this.video;
    }
}