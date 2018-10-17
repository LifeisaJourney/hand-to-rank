const { sortHand, handToValue, cardToValue, handToRankFrequency } = require('./main');

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

test('cardToValue converts a card to a value', () => {
    expect(
        cardToValue('J')
    ).toBe(11);
});

test('returns a 00605030201 for a hand including 2, 3, 4, 6, 7', () => {
    expect(
        handToValue([
            { suit: 'diamonds', rank: '2'},
            { suit: 'clubs', rank: '3'},
            { suit: 'spades', rank: '4'},
            { suit: 'diamonds', rank: '6'},
            { suit: 'diamonds', rank: '7'},
        ])
    ).toBe(
        "00706040302"
    );
});

test('handToRankFrequency converts a hand to an object of rank frequency', () => {
    expect(
        handToRankFrequency([
            { suit: 'diamonds', rank: '2'},
            { suit: 'clubs', rank: '3'},
            { suit: 'spades', rank: '4'},
            { suit: 'diamonds', rank: '6'},
            { suit: 'clubs', rank: '6'},
        ])
    ).toEqual(
        {
            2: 1,
            3: 1,
            4: 1,
            6: 2
        }
    );
});

test('returns correctly for a pair in a hand', () => {
    expect(
        handToValue([
            { suit: 'diamonds', rank: '3'},
            { suit: 'clubs', rank: '3'},
            { suit: 'spades', rank: '4'},
            { suit: 'diamonds', rank: '6'},
            { suit: 'diamonds', rank: '7'},
        ])
    ).toBe(
        "10706040303"
    );
});

test('returns correctly for two pair', () => {
    expect(
        handToValue([
            { suit: 'diamonds', rank: 'J'},
            { suit: 'clubs', rank: 'J'},
            { suit: 'spades', rank: 'A'},
            { suit: 'diamonds', rank: 'A'},
            { suit: 'diamonds', rank: '7'},
        ])
    ).toBe(
        "21414111107"
    );
});

test('returns correctly for three of a kind', () => {
    expect(
        handToValue([
            { suit: 'diamonds', rank: 'J'},
            { suit: 'clubs', rank: 'J'},
            { suit: 'spades', rank: 'J'},
            { suit: 'diamonds', rank: 'A'},
            { suit: 'diamonds', rank: '7'},
        ])
    ).toBe(
        "31411111107"
    );
});
