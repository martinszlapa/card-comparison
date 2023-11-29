import React, {useEffect, useState} from 'react';
import CostSliders from './Slider/Slider';
import CardSelect from "./CardSelect/CardSelect";
import Chart from "./Chart/Chart";
import data from "././Data/data.json";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Cookies from 'js-cookie';

import Joyride, {STATUS} from 'react-joyride';


const Home = () => {
    const tourState = {
        steps: [
            {
                target: '.selectTarget',
                content: <strong>Select credit cards to be compared here. You can select as many as you'd like.
                Toggle the slider to choose whether cash-equivalent points cards are shown, or if you'd only like to see
                cards that give direct cashback rewards.</strong>,
                placement: 'bottom',
            },
            {
                target: '.sliderTarget',
                content: <strong>Enter your monthly spending here. Different cards have different benefits based on how you spend your money, so try a variety of combinations to see what fits your needs.</strong>,
                placement: 'bottom',
            },
            {
                target: '.chartTarget',
                content: <strong>The rewards you will earn each month from each credit card are shown here. Try hovering over the line to see the exact value for a particular card!</strong>,
                placement: 'bottom',
            }
        ]
    }

    const [showTour, setShowTour] = useState(!Cookies.get('tourShown'));
    const costCookieValue = Cookies.get('cost')

    const initialCostValue =
        costCookieValue ? JSON.parse(costCookieValue) : {
            grocery: 0,
            transportation: 0,
            recurring: 0,
            restaurantEntertainment: 0,
            other: 0
        }

    const selectCookieValue = Cookies.get('select');
    const initialSelectValue = selectCookieValue ? JSON.parse(selectCookieValue).map(
        (card) => data.cards.find((c) => c.longName === card.label)) : [];

    const [cost, setCost] = useState(initialCostValue);

    const [selectedCards, setSelectedCards] = useState(initialSelectValue);

    function startTour() {
        setShowTour(true);
    }

    function handleSliderChange(value, type) {
        console.log(value);
        if (type === 'grocery') {
            setCost((cost) => ({
                ...cost,
                grocery: value
            }))
        } else if (type === 'transportation') {
            setCost((cost) => ({
                ...cost,
                transportation: value
            }))
        } else if (type === 'recurring') {
            setCost((cost) => ({
                ...cost,
                recurring: value
            }))
        } else if (type === 'restaurantEntertainment') {
            setCost((cost) => ({
                ...cost,
                restaurantEntertainment: value
            }))
        } else if (type === 'other') {
            setCost((cost) => ({
                ...cost,
                other: value
            }));
        }
    }

    useEffect(() => { // Update cost cookie
        Cookies.set('cost', JSON.stringify(cost), {expires: 7});
    }, [cost]);

    useEffect(() => { // Update tour cookie
        if (STATUS.FINISHED) Cookies.set('tourShown', true, {expires: 7});
    }, [STATUS.FINISHED]);

    function handleSelectChange(selectedCards) {
        // set data to use selected cards
        setSelectedCards(
            selectedCards.map((card) => data.cards.find((c) => c.longName === card.label))
        )
    }

    const handleJoyrideCallback = (data) => {
        const {status} = data;
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            // Need to set our running state to false, so we can restart if we click start again.
            Cookies.set('tourShown', true, {expires: 7});
        }
    }

    return (
        <div>
            <Joyride
                steps={tourState.steps}
                run={showTour}
                continuous={true}
                scrollToFirstStep={true}
                showProgress={true}
                showSkipButton={true}
                styles={{
                    options: {}
                }}
                callback={handleJoyrideCallback}
            />
            <Container fluid>
                <Row className="m-3">
                    <Col xs={12} md={12} lg={3} xl={3}>
                        <div className="selectTarget m-3">
                            <CardSelect onChange={handleSelectChange}/>
                        </div>
                        <div className="sliderTarget m-3">
                            <CostSliders onChange={handleSliderChange}/>
                        </div>
                    </Col>
                    <Col xs={12} md={12} lg={9} xl={9} className="p-4">
                        <div className="chartTarget h-100">
                            <Chart
                                cost={cost}
                                selectedCards={selectedCards}
                            />
                        </div>
                    </Col>
                </Row>


            </Container>
        </div>
    )
}

export default Home;