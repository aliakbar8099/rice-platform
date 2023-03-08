export function validatePhoneNumber(phoneNumber: string) {
    const regex = /^(\0098|98|0)?9\d{9}$/;
    return regex.test(phoneNumber);
}

let seconds = 120
export function countdown(): any {
    if (seconds > 0) {
        seconds--;
    } else {
        return false
    }

    return seconds
}