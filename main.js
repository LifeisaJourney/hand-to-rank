// This function returns an integer representation of the hand.
// The first number is the high-level hand: 
//  9 - Royal Flush
//  8 - Straight Flush
//  7 - 4 of a Kind 
//  6 - Full House
//  5 - Flush
//  4 - Straight
//  3 - 3 of a Kind
//  2 - 2 pairs
//  1 - 1 pair
//  0 - High Card
// Then after that the values in priority order of the rest of the cards
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

const sortHand = (hand) => {
    hand = [...hand];
    hand.sort((a,b) => {
        const cardValueA= cardValueHashmap[a.rank];
        const cardValueB= cardValueHashmap[b.rank];

        return cardValueB-cardValueA;
    })
    return hand;
}

const handToRank = (hand) => {

    
    // Pair
    for (let card in hand) {
        const cardValue = cardValueHashmap[card];
        if (hand[card] === 2) {
            return cardValue + 13;
        }
    }

    // High card 
    let handRank = "0";
    const sortedHand = sortHand(hand);
    for (let card of sortedHand) {
        let cardValue = cardValueHashmap[card.rank];
        handRank += cardValue.toString().padStart(2, "0");
    }

    return handRank;
}

module.exports = {handToRank, sortHand}