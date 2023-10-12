const calculateRewards = function(card, grocery, transportation, recurring, restaurantEntertainment, other, months){
    let finalRewards = 0;
    if (card.longName === "BMO Student Cashback Mastercard"){

        let groceryRewards = 0;
        let transportationRewards = 0;
        let recurringRewards = 0;
        let otherRewards = 0;

        for (let i = 0; i < months; i++){
            if (groceryRewards < card.groceryRewardCap){
                groceryRewards += grocery * card.groceryCashback;
            }
            else{
                groceryRewards += grocery * card.otherCashback;
            }
            if (transportationRewards < card.transportationRewardCap){
                transportationRewards += transportation * card.transportationCashback;
            }
            else{
                transportationRewards += transportation * card.otherCashback;
            }
            if (recurringRewards < card.recurringRewardCap){
                recurringRewards += recurring * card.recurringCashback;
            }
            else{
                recurringRewards += other * card.otherCashback;
            }

            otherRewards += other * card.otherCashback;
        }
        finalRewards = groceryRewards + transportationRewards + recurringRewards + otherRewards;
    }

    else if (card.longName === "CIBC Dividend Visa Card for Students"){
        let rewards = 0;

        let totalRewardEligible = 0;
        let totalSpendingEligible = 0;
        for (let i = 0; i < months; i++){
            if (totalSpendingEligible < card.overallCapYearly && totalRewardEligible < card.rewardCapYearly){
                rewards += grocery * card.groceryCashback + transportation * card.transportationCashback + recurring * card.recurringCashback + other * card.otherCashback;
            }
            else{
                rewards += (grocery + transportation + recurring + other) * card.otherCashback;
            }
            totalRewardEligible += grocery + transportation + recurring;
            totalSpendingEligible += grocery + transportation + recurring + other;
        }

        finalRewards = rewards;
    }

    else if (card.longName === "Scotiabank Momentum Visa Infinite Card"){

        let totalCashback = 0;

        for (let month = 1; month <= months; month++) {
            // Calculate cashback for 4% category (Grocery and Recurring Bill Payments)
            let cashback4Percent = 0;
            if (grocery + recurring <= card.annualCap4Percent / 12) {
                cashback4Percent = (grocery + recurring) * 0.04;
            } else {
                cashback4Percent = (card.annualCap4Percent / 12) * 0.04;
            }

            // Calculate cashback for 2% category (Gas and Daily Transit)
            let cashback2Percent = 0;
            if (transportation <= card.annualCap2Percent / 12) {
                cashback2Percent = transportation * 0.02;
            } else {
                cashback2Percent = (card.annualCap2Percent / 12) * 0.02;
            }

            // Calculate cashback for 1% category (All other spending)
            const remainingMonthlySpending =
                other - (card.annualCap4Percent / 12 - cashback4Percent) - (card.annualCap2Percent / 12 - cashback2Percent);
            let cashback1Percent = 0;
            if (remainingMonthlySpending > 0) {
                cashback1Percent = remainingMonthlySpending * 0.01;
            }

            // Calculate total monthly cashback
            const totalMonthlyCashback = cashback4Percent + cashback2Percent + cashback1Percent;

            // Add monthly cashback to the total
            totalCashback += totalMonthlyCashback;

            // Reduce annual caps based on the cashback earned
            card.annualCap4Percent -= cashback4Percent;
            card.annualCap2Percent -= cashback2Percent;

            // Break the loop if annual caps are exhausted
            if (card.annualCap4Percent <= 0 && card.annualCap2Percent <= 0) {
                break;
            }
        }

        finalRewards = totalCashback;
    }

    else if (card.longName === "RBC Cash Back Mastercard"){
        let cumulativeGrocery = 0;
        let cumulativeOther = 0;

        let groceryRewards = 0;
        let otherRewards = 0;

        for (let i = 0; i < months; i++){
            if (cumulativeGrocery < card.grocerySpendingCapYearly && groceryRewards < card.groceryRewardCap){
                groceryRewards += grocery * card.groceryCashbackMax;
            }
            else{
                groceryRewards += grocery * card.otherCashbackMin;
            }

            // This doesn't make any sense, but it's what the RBC website says.
            // Amount of money increases when you spend more money.
            if (cumulativeOther < card.nonGroceryCapYearly && otherRewards < card.nonGroceryEarningsCap){
                otherRewards += (transportation + recurring + other) * card.otherCashbackMin;
            }
            else{
                otherRewards += (transportation + recurring + other) * card.otherCashbackMin;
            }

            cumulativeOther += transportation + recurring + other;
            cumulativeGrocery += grocery;
        }

        finalRewards = groceryRewards + otherRewards;
    }

    else if (card.longName === "HSBC +Rewards Mastercard"){
        let rewards = 0;
        rewards += other * card.otherCashback * months;
        rewards += restaurantEntertainment * card.restaurantEntertainmentCashback * months;
        finalRewards = rewards;
    }
    return finalRewards;
}

export default calculateRewards;