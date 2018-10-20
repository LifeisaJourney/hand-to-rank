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
let rankValueHashmap = {
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

const rankToValue = (rank) => {
	const value = rankValueHashmap[rank]
	return value;
}

const sortHand = (hand) => {
	hand = [...hand];
	hand.sort((a, b) => {
		const cardValueA = rankToValue(a.rank);
		const cardValueB = rankToValue(b.rank);

		return cardValueB - cardValueA;
	})
	return hand;
}

const handToString = hand => {
	let str = '';
	const sortedHand = sortHand(hand);
	for (let card of sortedHand) {
		let cardValue = rankToValue(card.rank);
		str += cardValue.toString().padStart(2, "0");
	}
	return str;
}

const handHasFlush = hand => {
	return (
		hand[0].suit === hand[1].suit &&
		hand[1].suit === hand[2].suit &&
		hand[2].suit === hand[3].suit &&
		hand[3].suit === hand[4].suit
	);
};

const handHasStraight = hand => {
	const sortedHand = sortHand(hand);
	let arrayOfRank = [];
	for (let card of sortedHand) {
		arrayOfRank.push(rankToValue(card.rank));
	}
	return (
		arrayOfRank[0] - arrayOfRank[1] === 1 &&
		arrayOfRank[1] - arrayOfRank[2] === 1 &&
		arrayOfRank[2] - arrayOfRank[3] === 1 &&
		arrayOfRank[3] - arrayOfRank[4] === 1
	);
}

const handHasFullHouse = hand => {
	const rankFrequency = handToRankFrequency(hand);
	const frequencyValues = Object.values(rankFrequency);
	return (
		(frequencyValues[0] === 2 && frequencyValues[1] === 3) ||
		(frequencyValues[0] === 3 && frequencyValues[1] === 2)
	);
}

const handHasThreeOfAKind = hand => {
  const rankFrequency = handToRankFrequency(hand);
  for (let rank in rankFrequency) {
    if (rankFrequency[rank] === 3) {
      return true;
    }
  }
  return false;
}

const handHasTwoPair = hand => {
  const rankFrequency = handToRankFrequency(hand);
  let numberOfPairs = 0;
  for (let rank in rankFrequency) {
    if (rankFrequency[rank] === 2) {
      numberOfPairs += 1;
    }
  }
  return numberOfPairs === 2;
}

const handHasOnePair = hand => {
  const rankFrequency = handToRankFrequency(hand);
  let numberOfPairs = 0;
  for (let rank in rankFrequency) {
    if (rankFrequency[rank] === 2) {
      numberOfPairs += 1;
    }
  }
  return numberOfPairs === 1;
}

const handToValue = (hand) => {
	let baseValue = 0;
	if (handHasFullHouse(hand)) {
		baseValue = 6;
	} else if (handHasFlush(hand)) {
		baseValue = 5;
	} else if (handHasStraight(hand)) {
		baseValue = 4;
	} else if (handHasThreeOfAKind(hand)) {
    baseValue = 3;
  } else if (handHasTwoPair(hand)) {
    baseValue = 2;
  } else if (handHasOnePair(hand)) {
    baseValue = 1;
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
	rankToValue,
	handToRankFrequency
};