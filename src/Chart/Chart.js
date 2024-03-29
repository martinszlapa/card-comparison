import data from '.././Data/data.json';
import React from 'react';
import { Line, Colors } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import 'chart.js/auto';
import styles from './Chart.module.css';
import calculateRewards from ".././Data/calculateRewards";




const Chart = ({ cost, selectedCards}) => {

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

    const rgbaColoursTransparent = [
        'rgba(255, 128, 128, 0.1)', // Dark Red
        'rgba(128, 255, 128, 0.1)', // Dark Green
        'rgba(128, 128, 255, 0.1)', // Dark Blue
        'rgba(255, 255, 128, 0.1)', // Dark Yellow
        'rgba(255, 179, 102, 0.1)', // Dark Orange
        'rgba(153, 51, 153, 0.1)',  // Dark Purple
        'rgba(255, 140, 149, 0.1)', // Dark Pink
        'rgba(0, 128, 128, 0.1)',   // Dark Teal
        'rgba(139, 35, 35, 0.1)',   // Dark Brown
        'rgba(64, 64, 64, 0.1)',    // Dark Gray
        'rgba(0, 0, 0, 0.1)',       // Black (90% transparent)
    ];

    const cardDatasets = data.cards.map((card) => {
        const rewardsData = Array.from({length: 12}, (_, index) => calculateRewards(
            card, cost.grocery, cost.transportation, cost.recurring, cost.restaurantEntertainment, cost.other, index + 1
        ));

        return {
            label: card.longName,
            data: rewardsData,
            backgroundColor: rgbaColoursTransparent[card.index-1],
            borderColor: rgbaColours[card.index-1],
            borderWidth: 7,
            fill : false
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
                card, cost.grocery, cost.transportation, cost.recurring, cost.restaurantEntertainment,  cost.other, index + 1
            ));

            return {
                label: card.longName,
                data: rewardsData,
                backgroundColor: rgbaColoursTransparent[card.index-1],
                borderColor: rgbaColours[card.index-1],
                borderWidth: 7,
                fill: false
            }
        })

        setChartData({
            labels: Array.from({length:12}, (_, index) => (index + 1).toString()),
            datasets: updatedCardDatasets
        });
    }, [cost, selectedCards]);


    function handleResize(width, height){

    }

    return (
        <Line data={chartData}
            options={{
                maintainAspectRatio: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Months',
                            font: {
                                size: 20
                            }
                        },
                        grid: {
                            borderWidth: 5,
                        }
                    },
                    y: {
                        title: {
                            display: false,
                            text: 'Total Rewards',
                            font: {
                                size: 20
                            }
                        },
                        grid:{
                            borderWidth: 5,
                        },
                        beginAtZero: true,
                    },
                },
                plugins: {
                    colors:{
                        enabled: true,
                        forceOverride: true
                    },
                    title: {
                        display: true,
                        text: 'Total Rewards ($)',
                        font: {
                            size: 20
                        }
                    },
                    legend: {
                        display: false,
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
    );

}

export default Chart