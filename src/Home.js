import React, {useEffect, useState} from 'react';
import CostSliders from './CostSliders';
import CardSelect from "./CardSelect";
import CardChart from "./CardChart";
import data from "./utils/Data.json";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Cookies from 'js-cookie';

import Joyride, {STATUS} from 'react-joyride';


const Home = () => {

    const tourState = {
        steps: [
            {
                target: '.select',
                content: <strong>Select credit cards to be compared here. You can select as many as you'd like</strong>,
                placement: 'bottom',
            },
            {
                target: '.slider',
                content: <strong>Enter your monthly spending here. Different cards have different benefits based on how you spend your money, so try a variety of combinations to see what fits your needs.</strong>,
                placement: 'bottom',
            },
            {
                target: '.chart',
                content: <strong>The rewards you will earn each month from each credit card are shown here. Try hovering over the line to see the exact value for a particular card!</strong>,
                placement: 'bottom',
            }
        ]
    }

    const [showTour, setShowTour] = useState(Cookies.get('tourShown') ? false : true);

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
            <Container fluid className={"d-grid gap-3"}>
                <Row className="justify-content-center">
                    <Col xs={12} md={6} lg={4} xl={3} className="mt-5">
                        <div className="select">
                            <CardSelect onChange={handleSelectChange}/>
                        </div>
                    </Col>
                    <Col xs={15} md={8} lg={6} xl={5} className="m-3">
                        <div className="slider">
                            <CostSliders onChange={handleSliderChange}/>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={12} md={9} lg={9} xl={9}>
                        <div className="chart">
                            <CardChart
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