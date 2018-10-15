// This function should return an integer representation of the hand:
//  - High card: 1 - 13, based on face value (J = 10, Q = 11, K = 12, A = 13)
//  - 14 - Pair of 2s
//  - 15 - Pair or 3s
//  - ...
//  - 22 - Pair of 10s
//  - 23 - Pair of Js
//  - 24 - Pair of Qs
//  - 25 - Pair of Ks
handToRank = (hand) => {

    let cardValueHashmap = {
        2: 1,
        3: 2,
        4: 3,
        5: 4,
        6: 5,
        7: 6,
        8: 7,
        9: 8,
        10: 9,
        J: 10,
        Q: 11,
        K: 12,
        A: 13
    }
    // Pair
    for (let card in hand) {
        const cardValue = cardValueHashmap[card];
        if (hand[card] === 2) {
            return cardValue + 13;
        }
    }

    // High card 
    let highestNum = 0
    for (card in hand) {
        let cardValue = cardValueHashmap[card]
        if (cardValue > highestNum) {

            highestNum = cardValue
        }
    }

    return highestNum
}

module.exports = handToRank