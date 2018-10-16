const { sortHand, handToRank } = require('./main');

test('sortHand', () => {
    expect(
        sortHand([
            { suit: 'diamonds', rank: 'Q'},
            { suit: 'clubs', rank: '3'},
            { suit: 'spades', rank: '8'},
            { suit: 'diamonds', rank: 'J'},
            { suit: 'diamonds', rank: '7'},
        ])
    ).toEqual(
        [
            { suit: 'diamonds', rank: 'Q'},
            { suit: 'diamonds', rank: 'J'},
            { suit: 'spades', rank: '8'},
            { suit: 'diamonds', rank: '7'},
            { suit: 'clubs', rank: '3'},
        ]
    );
});

test('sortHand should not change the original hand', () => {
    const handToSort = [
        { suit: 'diamonds', rank: 'Q'},
        { suit: 'clubs', rank: '3'},
        { suit: 'spades', rank: '8'},
        { suit: 'diamonds', rank: 'J'},
        { suit: 'diamonds', rank: '7'},
    ]
    const sortedHand = sortHand(handToSort);

    expect(handToSort).toEqual(
        [
            { suit: 'diamonds', rank: 'Q'},
            { suit: 'clubs', rank: '3'},
            { suit: 'spades', rank: '8'},
            { suit: 'diamonds', rank: 'J'},
            { suit: 'diamonds', rank: '7'},
        ]

    )
})

test('returns a 00605030201 for a hand including 2, 3, 4, 6, 7', () => {
    expect(
        handToRank([
            { suit: 'diamonds', rank: '2'},
            { suit: 'clubs', rank: '3'},
            { suit: 'spades', rank: '4'},
            { suit: 'diamonds', rank: '6'},
            { suit: 'diamonds', rank: '7'},
        ])
    ).toBe(
        "00605030201"
    );
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