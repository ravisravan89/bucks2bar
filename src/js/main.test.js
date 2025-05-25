// src/js/main.test.js

describe('Username validation regex', () => {
    // Same regex as in main.js
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    test('Valid username passes', () => {
        expect(regex.test('Abcdef1@')).toBe(true);
        expect(regex.test('Password1!')).toBe(true);
        expect(regex.test('A1b2c3d$')).toBe(true);
    });

    test('Username missing uppercase fails', () => {
        expect(regex.test('abcdef1@')).toBe(false);
    });

    test('Username missing special character fails', () => {
        expect(regex.test('Abcdef12')).toBe(false);
    });

    test('Username missing number fails', () => {
        expect(regex.test('Abcdefg@')).toBe(false);
    });

    test('Username less than 8 characters fails', () => {
        expect(regex.test('Ab1@e')).toBe(false);
        expect(regex.test('A1b@c')).toBe(false);
    });

    test('Username with invalid characters fails', () => {
        expect(regex.test('Abcdef1@ ')).toBe(false); // space not allowed
        expect(regex.test('Abcdef1@#')).toBe(false); // # not in allowed special chars
    });
});