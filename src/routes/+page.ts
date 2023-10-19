import type {  PageLoad } from './$types';

export const load: PageLoad = async ({  url }) => {
    return {
        url: url.searchParams.get('url'),
        gitpodifiedUrl: `https://gitpod.io/#${url.searchParams.get('url')}`
    }
}