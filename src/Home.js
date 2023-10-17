import React, {useState} from 'react';
import CostSliders from './CostSliders';
import CardSelect from "./CardSelect";
import CardChart from "./CardChart";
import data from "./utils/Data.json";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Home = () => {
    const [cost, setCost] = useState({
        grocery: 0,
        transportation: 0,
        recurring: 0,
        restaurantEntertainment: 0,
        other: 0
    })

    const [selectedCards, setSelectedCards] = useState([]);

    function handleSliderChange(value, type) {
        console.log(value);
        if (type === 'grocery') {
            setCost({
                ...cost,
                grocery: value
            })
        } else if (type === 'transportation') {
            setCost({
                ...cost,
                transportation: value
            })
        } else if (type === 'recurring') {
            setCost({
                ...cost,
                recurring: value
            })
        } else if (type === 'restaurantEntertainment') {
            setCost({
                ...cost,
                restaurantEntertainment: value
            })
        } else if (type === 'other') {
            setCost({
                ...cost,
                other: value
            })
        }
    }

    function handleSelectChange(selectedCards) {
        // set data to use selected cards
        setSelectedCards(
            selectedCards.map((card) => data.cards.find((c) => c.longName === card.label))
        )
    }

    return (
        <div>
            <Container fluid className={"d-grid gap-3"}>
                <Row className="justify-content-center">
                    <Col  xs={12} md={6} lg={4} xl={3} className="mt-5">
                        <CardSelect onChange={handleSelectChange}/>
                    </Col>
                    <Col  xs={15} md={8} lg={6} xl={5} className="m-3">
                        <CostSliders onChange={handleSliderChange}/>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={12} md={9} lg={9} xl={9}>
                    <CardChart
                        cost={cost}
                        selectedCards={selectedCards}
                        handleSliderChange={handleSliderChange}
                        handleSelectChange={handleSelectChange}
                    />
                    </Col>
                </Row>


            </Container>
        </div>
    )
}

export default Home;