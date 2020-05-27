import { APIFranchiseVideoInfo } from './APIFranchiseVideoInfo';
import { APITags } from './APITags';
import { APIVideoInfo } from './APIVideoInfo';

export type APIVideo = {
    brand: {
        count: number,
        email: string | null,
        id: number,
        logo_url: string | null,
        slug: string,
        title: string,
        website_url: string | null,
    },
    bs: any, // advertising related stuff
    env: any, // mobile app / premium related stuff
    hentai_franchise: {
        id: number,
        name: string,
        slug: string,
        title: string
    },
    hentai_franchise_hentai_videos: APIFranchiseVideoInfo[],
    hentai_tags: {
        id: number,
        text: APITags,
        count: number,
        description: string
    }[],
    hentai_video: APIVideoInfo,
    hentai_video_storyboards: {
        frame_height: number,
        frame_width: number,
        id: number,
        num_horizontal_frames: number,
        num_total_frames: number,
        num_total_storyboards: number,
        num_vertical_frames: number,
        sequence: number,
        url: string
    }[],
    next_hentai_video: APIFranchiseVideoInfo,
    next_random_hentai_video: APIFranchiseVideoInfo,
    player_base_url: string,
    playlist_hentai_videos: null | any, // TODO
    playlists: null | any, // TODO
    session_token: string,
    session_token_expire_time_unix: number,
    similar_playlists_data: {
        playlists: {
            count: number,
            created_at: string,
            custom_poster_url: string | null,
            hentai_video_slug: string,
            id: number,
            is_mutable: boolean,
            poster_url: string,
            slug: string,
            title: string,
            total_duration: number,
            total_size: number,
            updated_at: string,
            user_id: number,
            views: number,
            visibility: string
        }[],
        users_data: { [user: string]: {
            id: number,
            name: string,
            slug: string
        } }
    },
    user: null | any, // TODO,
    user_search_option: null | any, // TODO
    user_setting: null | any, // TODO
    watch_later_playlist_hentai_videos: null | any, // TODO
    x_token: null | any // TODO
}