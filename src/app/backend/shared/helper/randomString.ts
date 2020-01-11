export function randomString(panjang) {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    let text = "";
    for (let i = 0; i < panjang; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}