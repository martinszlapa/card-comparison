import React, {useEffect, useState} from 'react';
import CostSliders from './CostSliders';
import CardSelect from "./CardSelect";
import CardChart from "./CardChart";
import data from "./utils/Data.json";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Cookies from 'js-cookie';

import Joyride from 'react-joyride'
import Button from "react-bootstrap/Button";


const Home = () => {

    const state = {
        steps : [
            {
                target: '.cardSelectContainer',
                content: 'Choose your cards here',
                placement: 'top',
            },
            {
                target: '.spendingSliderContainer',
                content: 'Adjust your spending here',
                placement: 'top',
            }
        ]
    }

    const [tourOpen, setTourOpen] = useState(false);

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
        setTourOpen(true);
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


    function handleSelectChange(selectedCards) {
        // set data to use selected cards
        setSelectedCards(
            selectedCards.map((card) => data.cards.find((c) => c.longName === card.label))
        )
    }

    return (
        <div>
            <Button onClick={startTour}>Start Tour</Button>
            <Joyride
                steps={state.steps}
                run={tourOpen}
                continuous={true}
                scrollToFirstStep={true}
                showProgress={true}
                showSkipButton={true}
                styles={{
                    options: {

                    }
                }}
            />
            <Container fluid className={"d-grid gap-3"}>
                <Row className="justify-content-center">
                    <Col xs={12} md={6} lg={4} xl={3} className="mt-5">
                        <CardSelect onChange={handleSelectChange} className="cardSelect"/>
                    </Col>
                    <Col xs={15} md={8} lg={6} xl={5} className="m-3">
                        <CostSliders onChange={handleSliderChange} className={"slider"}/>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={12} md={9} lg={9} xl={9}>
                        <CardChart
                            cost={cost}
                            selectedCards={selectedCards}
                        />
                    </Col>
                </Row>


            </Container>
        </div>
    )
}

export default Home;