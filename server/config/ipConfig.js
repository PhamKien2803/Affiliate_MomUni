export function getClientIp(req) {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(',')[0] : req.ip;
    return ip;
}

export function anonymizeIp(ip) {
    if (ip.includes(".")) {
        return ip.split(".").slice(0, 3).join(".") + ".0";
    } else if (ip.includes(":")) {
        return ip.split(":").slice(0, -1).join(":") + ":0";
    }
    return ip;
};
