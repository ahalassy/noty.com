/******************************************************************************
 *
 *   Copyright Adam Halassy, Budapest, HUN.
 *   This is an unpublished work. All rights reserved.
 *
 * ---------------------------------------------------------------------------
 *   This source is part of the Noty project
 * 
 *****************************************************************************/

export function getCookie(name: string): string | false {
    name = `${name}=`;
    var result = decodeURIComponent(document.cookie)
        .split(';')
        .map(v => v.trim())
        .find(v => v.indexOf(name) === 0)

    return result
        ? result.substring(name.length)
        : false;
}

export function removeCookie(
    name: string,
    path?: string,
    domain?: string
): void {
    document.cookie = encodeURIComponent(name) +
        "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
        (domain ? "; domain=" + domain : "") +
        (path ? "; path=" + path : "");

}