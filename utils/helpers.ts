export function validatePhoneNumber(phoneNumber: string) {
    const regex = /^(\0098|98|0)?9\d{9}$/;
    return regex.test(phoneNumber);
}