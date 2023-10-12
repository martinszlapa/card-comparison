import data from './utils/Data';
import React from 'react';
import { Bar, Chart, Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import 'chart.js/auto';
import CostSlider from './CostSlider';
import CardSelect from "./CardSelect";
import styles from './chart.module.css';
import calculateRewards from "./utils/CalculateRewards";




const CardChart = () => {

    const rgbaColours = [
        'rgba(255, 128, 128, 1)', // Dark Red
        'rgba(128, 255, 128, 1)', // Dark Green
        'rgba(128, 128, 255, 1)', // Dark Blue
        'rgba(255, 255, 128, 1)', // Dark Yellow
        'rgba(255, 179, 102, 1)', // Dark Orange
        'rgba(153, 51, 153, 1)',  // Dark Purple
        'rgba(255, 140, 149, 1)', // Dark Pink
        'rgba(0, 128, 128, 1)',   // Dark Teal
        'rgba(139, 35, 35, 1)',   // Dark Brown
        'rgba(64, 64, 64, 1)',    // Dark Gray
        'rgba(0, 0, 0, 1)',       // Black (fully opaque)
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
            card, cost.grocery, cost.transportation, cost.recurring, cost.restaurantEntertainment, cost.other, index + 1
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
                card, cost.grocery, cost.transportation, cost.recurring, cost.restaurantEntertainment, cost.other, index + 1
            ));

            return {
                label: card.longName,
                data: rewardsData,
                backgroundColor: rgbaColours[card.index-1],
                borderColor: rgbaColours[card.index-1],
                borderWidth: 5,
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
        else if (type === 'restaurantEntertainment') {
            setCost({
                ...cost,
                restaurantEntertainment: value
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
                        x: {
                            title: {
                                display: true,
                                text: 'Months',
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Accumulated Rewards (CAD)',
                            },
                            beginAtZero: true,
                        },
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                    tooltip: {
                        enabled: true,
                        mode: 'nearest', // Display tooltips for each data point
                        intersect: false,

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