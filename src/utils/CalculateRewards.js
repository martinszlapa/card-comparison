const calculateRewards = function (card, grocery, transportation, recurring, restaurantEntertainment, other, months) {
    let finalRewards = 0;
    if (card.longName === "BMO Student Cashback Mastercard") {
        other += restaurantEntertainment;
        other += transportation;

        let groceryRewards = 0;
        let transportationRewards = 0;
        let recurringRewards = 0;
        let otherRewards = 0;

        for (let i = 0; i < months; i++) {
            if (groceryRewards < card.groceryRewardCap) {
                groceryRewards += grocery * card.groceryCashback;
            } else {
                groceryRewards += grocery * card.otherCashback;
            }
            if (recurringRewards < card.recurringRewardCap) {
                recurringRewards += recurring * card.recurringCashback;
            } else {
                recurringRewards += other * card.otherCashback;
            }

            otherRewards += other * card.otherCashback;
        }
        finalRewards = groceryRewards + transportationRewards + recurringRewards + otherRewards;
    } else if (card.longName === "CIBC Dividend Visa Card for Students") {
        let rewards = 0;
        other += restaurantEntertainment;


        let totalSpending = 0;
        let totalEligible = 0;
        for (let i = 0; i < months; i++) {
            if (totalEligible < card.eligibleSpendingCap && totalSpending < card.overallSpendingCap) {
                rewards += grocery * card.groceryCashback + transportation * card.transportationCashback + recurring * card.recurringCashback + other * card.otherCashback;
            } else {
                rewards += (grocery + transportation + recurring + other) * card.otherCashback;
            }
            totalEligible += grocery + transportation + recurring;
            totalSpending += grocery + transportation + recurring + other;
        }

        finalRewards = rewards;
    } else if (card.longName === "Scotiabank Momentum Visa Infinite Card") {

        let rewards = 0;
        other += restaurantEntertainment;

        let totalEligible4 = 0;
        let totalEligible2 = 0;

        for (let month = 1; month <= months; month++) {

            // Calculate cashback for 4% category (Grocery and Recurring Bill Payments)
            if (totalEligible4 < card.annualCap4Percent) {
                rewards += (grocery + recurring) * card.groceryRecurringCashback;
            } else {
                rewards += (grocery + recurring) * card.otherCashback;
            }

            // Calculate cashback for 2% category (Gas and Daily Transit)
            if (totalEligible2 <= card.annualCap2Percent) {
                rewards += transportation * card.transportationCashback;
            } else {
                rewards += transportation * card.otherCashback;
            }

            // Calculate cashback for 1% category (All other spending)
            rewards += other * card.otherCashback;

            totalEligible4 += grocery + recurring;
            totalEligible2 += transportation;
        }
        finalRewards = rewards;
    } else if (card.longName === "RBC Cash Back Mastercard") {
        let cumulativeGrocery = 0;
        let cumulativeOther = 0;

        let rewards = 0;
        other += restaurantEntertainment + transportation + recurring;


        for (let i = 0; i < months; i++) {
            if (cumulativeGrocery < card.grocerySpendingCapYearly) {
                rewards += grocery * card.groceryCashback;
            } else {
                rewards += grocery * card.otherCashbackAboveCap;
            }

            // This doesn't make any sense, but it's what the RBC website says.
            // Amount of money increases when you spend more money.
            if (cumulativeOther < card.otherSpendingCapYearly) {
                rewards += other * card.otherCashbackBelowCap;
            } else {
                rewards += other * card.otherCashbackAboveCap;
            }

            cumulativeOther += other;
            cumulativeGrocery += grocery;
        }

        finalRewards = rewards;
    } else if (card.longName === "HSBC +Rewards Mastercard") {
        let rewards = 0;
        rewards += other * card.otherCashback * months;
        rewards += restaurantEntertainment * card.restaurantEntertainmentCashback * months;
        finalRewards = rewards;
    } else if (card.longName === "TD Rewards Visa Card") {
        other += transportation;
        let points = 0;
        let rewards = 0;

        for (let i = 1; i < months; i++) {
            if (points < card.pointsCap) {
                points += grocery * card.groceryPoints;
                points += recurring * card.recurringPoints;
                points += restaurantEntertainment * card.restaurantPoints;
            }
            else{
                points += (grocery + recurring + restaurantEntertainment) * card.otherPoints;
            }

            points += other * card.otherPoints;
        }

        rewards += points / card.pointsPerDollar;
        finalRewards = rewards;
    }

    else if (card.longName === "RBC ION+ Visa Card") {
        let points = card.welcomePoints;
        if ( months >= 3 && ((grocery + restaurantEntertainment + recurring + transportation + other) * 3) > 500){
            points += 3500;
        }
        for (let i = 1; i < months; i++){
            points += grocery * card.groceryPoints;
            points += restaurantEntertainment * card.restaurantPoints;
            points += transportation * card.transportationPoints;
            points += other * card.otherPoints;
        }

        finalRewards = points * card.averagePointValue;
    }

    return finalRewards;


}

export default calculateRewards;