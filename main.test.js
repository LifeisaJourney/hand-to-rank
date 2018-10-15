const handToRank = require('./main');

test('returns a 7 for a hand including 2, 3, 4, 6, 7', () => {
    expect(
        handToRank({
            2: 1,
            3: 1,
            4: 1,
            6: 1,
            7: 1
        })
    ).toBe(6);
});

test( 'returns a 10 for a hand including 10, 9, 8, 7, 5', () => {
    expect(
        handToRank({
            10: 1,
            9: 1,
            8: 1,
            7: 1,
            5: 1
        })
    ).toBe(9);
});

test( 'when the high card is a face card', () => {
    expect(
        handToRank({
            K: 1,
            9: 1,
            8: 1,
            7: 1,
            5: 1
        })
    ).toBe(12);
});

test( 'returns pair for hand including 2, 2, 3, 4, 5', () => {
    expect(
        handToRank({
            2: 2,
            3: 1,
            4: 1,
            5: 1
        })
    ).toBe(14);
});

test( 'returns pair for hand including J, J, 3, 4, 5', () => {
    expect(
        handToRank({
            J: 2,
            3: 1,
            4: 1,
            5: 1
        })
    ).toBe(23);
});