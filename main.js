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
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14
};

const cardToValue = (card) =>{
  const value = cardValueHashmap[card]
  return value;
}

const sortHand = (hand) => {
    hand = [...hand];
    hand.sort((a,b) => {
        const cardValueA = cardToValue(a.rank);
        const cardValueB = cardToValue(b.rank);

        return cardValueB - cardValueA;
    })
    return hand;
}

const handToString = hand => {
    let str = '';
    const sortedHand = sortHand(hand);
    for (let card of sortedHand) {
        let cardValue = cardToValue(card.rank);
        str += cardValue.toString().padStart(2, "0");
    }
    return str;
}

const handToValue = (hand) => {
    let baseValue = 0;
    const rankFrequency = handToRankFrequency(hand);

    // Check for three of a kind
    for (let rank in rankFrequency) {
        if (rankFrequency[rank] === 3) {
            baseValue = 3;
        }
    }

    // Check for pair
    let numberOfPairs = 0;
    for (let rank in rankFrequency) {
        if (rankFrequency[rank] === 2) {
            numberOfPairs += 1;
        }
    }

    if (numberOfPairs === 1) {
        baseValue = 1;
    } else if (numberOfPairs === 2) {
        baseValue = 2;
    }

    return baseValue + handToString(hand);
}

const handToRankFrequency = (hand) => {
    const rankFrequency = {};
    for (let card of hand) {
        if (rankFrequency[card.rank]) {
            rankFrequency[card.rank] += 1
        } else {
            rankFrequency[card.rank] = 1;
        }
    }

    return rankFrequency;

}


module.exports = {
    handToValue,
    sortHand,
    cardToValue,
    handToRankFrequency
};