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
            <Container className={"m-5"}>
                <Row>
                    <Col lg={3}>
                        <CardSelect onChange={handleSelectChange}/>
                    </Col>
                    <Col>
                        <CostSliders onChange={handleSliderChange}/>
                    </Col>
                </Row>
                    <CardChart
                        cost={cost}
                        selectedCards={selectedCards}
                        handleSliderChange={handleSliderChange}
                        handleSelectChange={handleSelectChange}
                    />


            </Container>
        </div>
    )
}

export default Home;