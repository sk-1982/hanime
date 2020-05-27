import { APIFranchiseVideoInfo } from './APIFranchiseVideoInfo';
import { APITitle } from './APITitle';
import { APITags } from './APITags';

export type APIVideoInfo = APIFranchiseVideoInfo & {
    hentai_tags: {
        id: number,
        text: APITags
    }[],
    is_visible: boolean,
    titles: APITitle[],
    description: string
};