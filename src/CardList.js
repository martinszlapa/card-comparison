import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import data from './utils/Data.json';
import mapping from './utils/FieldMapping.json';
import './CardList.css';


const CardList = () => {
    const [show, setShow] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [search, setSearch] = useState("");

    const handleClose = () => {
        setShow(false)
        setSelectedCard(null)
    };
    const handleShow = (card) => {
        setShow(true)
        setSelectedCard(card)
    };

    return (
        <div className={"list"}>
            <Form.Group className={"searchBar"}>
                <Form.Control
                    type="text"
                    placeholder="Search... "
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Form.Group>
            {data.cards
                    .filter((card) =>
                    {
                        return card.longName.toLowerCase().includes(search.toLowerCase())
                    })
                    .map((card) => (
                <Row>
                    <Col xs={12} md={6} lg={4} xl={3}  key={card.longName} className={"listEntry"}>
                    <img src={card.image} alt={card.longName} className={"cardImage"}/>
                    <h2>{card.longName}</h2>
                    {card.visibleKeys.map((key) => (
                        <p key={key}><strong>{mapping[key]}:</strong> {card[key]}</p>
                    ))
                    }
                    <Button variant={"primary"} onClick={() => handleShow(card)}>
                        Card Details
                    </Button>
                    </Col>
                </Row>
            ))
            }

            {selectedCard != null && (<Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Card details for {selectedCard.longName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <img src={selectedCard.image} alt={selectedCard.longName} className={"cardImage"}/>
                        {selectedCard.modalKeys.map((key) => (
                            <p key={key}><strong>{mapping[key]}:</strong> {selectedCard[key]}</p>
                        ))
                        }
                    </div>
                </Modal.Body>
            </Modal>)}
        </div>
    )
}
export default CardList;