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

export function numberToSmerinke(number: number): string {
    const smerinkeDigits = ['ᒐ', '⎓', 'ꑍ', '৫', 'ꍌ', 'ꎭ', 'ಠ', 'Θ', '෴', '卐'];
    const digitsArr = String(number).split('');
    const smerinkeArr = digitsArr.map((digit: any) => smerinkeDigits[digit]);
    return smerinkeArr.join('');
}

export function smerinkeToNumber(smerinkeString: string): number {
    const smerinkeDigits = ['ᒐ', '⎓', 'ꑍ', '৫', 'ꍌ', 'ꎭ', 'ಠ', 'Θ', '෴', '卐'];
    const smerinkeArr = smerinkeString.split('');
    const digitsArr = smerinkeArr.map(smerinke => smerinkeDigits.indexOf(smerinke));
    const number = parseInt(digitsArr.join(''), 10);
    return number;
}
