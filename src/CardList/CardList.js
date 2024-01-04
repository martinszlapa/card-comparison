import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import data from '.././Data/data.json';
import mapping from '.././Data/FieldMapping.json';
import styles from './CardList.module.css';


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

    function isDecimal(n) {
        return Number(n) === n && n % 1 !== 0;
    }

    return (
        <div className={styles.list}>

            <Container>
                <Row>
                    <Form.Group className={styles.searchBar}>
                        <Form.Control
                            type="text"
                            placeholder="Search... "
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    {data.cards
                        .filter((card) => {
                            return card.longName.toLowerCase().includes(search.toLowerCase())
                        })
                        .map((card) => (

                            <Col xs={12} md={12} lg={6} xl={6} key={card.longName} >
                                <div className={styles.listEntry}>
                                    <img src={"/CardImages/"+card.image} alt={card.longName} className={styles.cardImage}/>
                                    <h3>{card.longName}</h3>
                                    {card.visibleKeys.map((key) => (
                                        <p key={key}><strong>{mapping[key]}:</strong> {card[key]}</p>
                                    ))
                                    }
                                    <Button className={styles.modalButton} variant={"primary"}
                                            onClick={() => handleShow(card)}>
                                        Card Details
                                    </Button>
                                </div>
                            </Col>

                        ))
                    }
                </Row>
            </Container>

            {selectedCard != null && (<Modal show={show} onHide={handleClose} dialogClassName={styles.largeModalContent}>
                <Modal.Header closeButton>
                    <Modal.Title>Card details for {selectedCard.longName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.modalBody}>
                        <img src={"/CardImages/"+selectedCard.image} alt={selectedCard.longName} className={styles.cardImage}/>
                        {selectedCard.modalKeys.map((key) => (
                            <p key={key}><strong>{mapping[key]}: </strong>
                                {isDecimal(selectedCard[key])? String((selectedCard[key]*100).toFixed(2)) + '%' : selectedCard[key]}
                            </p>
                        ))
                        }
                    </div>
                </Modal.Body>
            </Modal>)}
        </div>
    )
}
export default CardList;