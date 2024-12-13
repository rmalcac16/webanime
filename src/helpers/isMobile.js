export const isMobile = (userAgent) => {
    const lowerUserAgent = userAgent.toLowerCase();
    return /mobile|android.+mobile|iphone|ipod|blackberry|opera mini|windows phone|iemobile|palm|webos/i.test(
        lowerUserAgent
    );
};
