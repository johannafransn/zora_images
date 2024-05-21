//TODO: make use of a better algo to calculate distance this might not be 100% accurate
//Calculates the distance between 2 lat/long coordinates
export const buildUrl = (baseUrl: string, params: { [key: string]: any }, requiredParams: string[]) => {
    const query = Object.keys(params)
        .filter(key => requiredParams.includes(key) ? true : (params[key] !== null && params[key] !== ''))
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    return `${baseUrl}?${query}`;
};