export function getTrailerId(url: string | undefined) {
    if (!url) {
        return undefined;
    } else {
        const youtubeRegex = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
        const match = url.match(youtubeRegex);
        if (match) {
            const videoId = match[1];
            return videoId;
        } else {
            return undefined;
        }
    }
}