import data from './utils/Data';
import React from 'react';
import { Bar, Chart, Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import 'chart.js/auto';
import CostSlider from './CostSlider';
import CardSelect from "./CardSelect";
import styles from './chart.module.css';



const calculateRewards = (card, grocery, transportation, recurring, other, year) => {

    let groceryRewards = 0;
    let transportationRewards = 0;
    let recurringRewards = 0;
    let otherRewards = 0;

    if (true) { //card.institution === "BMO"
        for (let i = 0; i < year; i++){
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
        return groceryRewards + transportationRewards + recurringRewards + otherRewards;
    }
    else return 200;
}


const CardChart = () => {
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
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
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
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
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
    <div>
        <CardSelect onChange={handleSelectChange}/>
        <CostSlider onChange={handleSliderChange}/>
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
                    }
                },
                }
            }
              className={styles.chart}
        />
    </div>
    );

}

export default CardChart