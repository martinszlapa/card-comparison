import data from './utils/Data';
import React from 'react';
import { Bar, Chart, Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import 'chart.js/auto';
import CostSlider from './CostSlider';
import CardSelect from "./CardSelect";
import styles from './chart.module.css';



const calculateRewards = (card, grocery, transportation, recurring, other, months) => {
    let finalRewards = 0;

    if (card.institution === "BMO"){

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

    else if (card.institution === "CIBC" && card.longName === "CIBC Dividend Visa Card for Students"){
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

    else if (card.institution === "RBC"){
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
    return finalRewards;
}


const CardChart = () => {

    const rgbaColours = [
        'rgba(255, 0, 0, 1)',     // Red (fully opaque)
        'rgba(0, 255, 0, 1)',     // Green (fully opaque)
        'rgba(0, 0, 255, 1)',     // Blue (fully opaque)
        'rgba(255, 255, 0, 1)',   // Yellow (fully opaque)
        'rgba(255, 165, 0, 1)',   // Orange (fully opaque)
        'rgba(128, 0, 128, 1)',   // Purple (fully opaque)
        'rgba(255, 192, 203, 1)', // Pink (fully opaque)
        'rgba(0, 128, 128, 1)',   // Teal (fully opaque)
        'rgba(165, 42, 42, 1)',   // Brown (fully opaque)
        'rgba(0, 0, 0, 1)',       // Black (fully opaque)
        'rgba(255, 255, 255, 1)', // White (fully opaque)
        'rgba(0, 0, 0, 0)',       // Fully transparent
    ];

    const [cost, setCost] = useState({
        grocery: 0,
        transportation: 0,
        recurring: 0,
        other: 0
    })

    const [selectedCards, setSelectedCards] = useState([]);

    const cardDatasets = data.cards.map((card) => {
        const rewardsData = Array.from({length: 12}, (_, index) => calculateRewards(
            card, cost.grocery, cost.transportation, cost.recurring, cost.other, index + 1
        ));

        return {
            label: card.longName,
            data: rewardsData,
            backgroundColor: rgbaColours[card.index-1],
            borderColor: rgbaColours[card.index-1],
            borderWidth: 1,
        }
    })

    const [chartData, setChartData] = useState({
        labels: Array.from({length:12}, (_, index) => (index + 1).toString()),
        datasets: cardDatasets
    }

    );

    useEffect(() => {

        const updatedCardDatasets = selectedCards.map((card) => {
            const rewardsData = Array.from({length: 12}, (_, index) => calculateRewards(
                card, cost.grocery, cost.transportation, cost.recurring, cost.other, index + 1
            ));

            return {
                label: card.longName,
                data: rewardsData,
                backgroundColor: rgbaColours[card.index-1],
                borderColor: rgbaColours[card.index-1],
                borderWidth: 1,
            }
        })

        setChartData({
            labels: Array.from({length:12}, (_, index) => (index + 1).toString()),
            datasets: updatedCardDatasets
        });
    }, [cost, selectedCards]);

    function handleSliderChange(value, type){
        console.log(value);
        if (type === 'grocery') {
            setCost({
                ...cost,
                grocery: value
            })
        }
        else if (type === 'transportation') {
            setCost({
                ...cost,
                transportation: value
            })
        }
        else if (type === 'recurring') {
            setCost({
                ...cost,
                recurring: value
            })
        }
        else if (type === 'other') {
            setCost({
                ...cost,
                other: value
            })
        }
    }

    function handleSelectChange(selectedCards){
        // set data to use selected cards
        setSelectedCards(
            selectedCards.map((card) => data.cards.find((c) => c.longName === card.label))
        )
    }

    return (
    <div className={styles.container}>
        <div className={styles.optionsContainer}>
            <CardSelect onChange={handleSelectChange}/>
            <CostSlider onChange={handleSliderChange}/>
        </div>
        <Line data={chartData}
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: 'Accumulated Rewards',
                        font: {
                            size: 20
                        }
                    },
                    legend: {
                        display: false
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: true
                },
                }
            }
              className={styles.chart}
        />
    </div>
    );

}

export default CardChart