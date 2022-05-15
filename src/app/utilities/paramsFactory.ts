// const API_KEY = "8d56366dc6f44df4cafd884aaed4d9ff";
const ALT_KEY = "7c6b62b0bbb25ed3782f7985397aa4f4";
export const ITEM_MAX_LIMIT = "20";

export function paramsFactory(name?: string, offset?: string): URLSearchParams {
    if (name && offset) {
        return new URLSearchParams({
            nameStartsWith: name,
            offset,
            limit: ITEM_MAX_LIMIT,
            apikey: ALT_KEY,
        });
    } else if (name) {
        return new URLSearchParams({
            nameStartsWith: name,
            limit: ITEM_MAX_LIMIT,
            apikey: ALT_KEY,
        });
    } else if (offset) {
        return new URLSearchParams({
            offset,
            limit: ITEM_MAX_LIMIT,
            apikey: ALT_KEY,
        });
    } else {
        return new URLSearchParams({
            limit: ITEM_MAX_LIMIT,
            apikey: ALT_KEY,
        });
    }
}
