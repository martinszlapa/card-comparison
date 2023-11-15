import React, {useEffect, useState} from 'react'
import Select from 'react-select'
import Form from 'react-bootstrap/Form'
import data from './utils/Data'
import styles from './select.module.css';
import Cookies from 'js-cookie';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


const CardSelect = ({onChange}) => {

    const selectCookieValue = Cookies.get('select');

    const initialSelectValue = selectCookieValue ? JSON.parse(selectCookieValue) : [
        {"value": "BMO", "label": "BMO Student Cashback Mastercard"},
        {"value": "RBC", "label": "RBC Cash Back Mastercard"},
        {"value": "CIBC", "label": "CIBC Dividend Visa Card for Students"}
    ];

    const [selectedCards, setSelectedCards] = useState(initialSelectValue);
    const [showPointsCards, setShowPointsCards] = useState(Cookies.get('showPointsCards') ? Cookies.get('showPointsCards') : false);

    const [modalShown, setModalShown] = useState(Cookies.get('modalShown') ? Cookies.get('modalShown') : false);

    const options = data.cards
        .filter((card) => card.points === false || card.points === showPointsCards)
        .map((card) => ({
            value: card.institution,
            label: card.longName,
        }));

    const handleSelectChange = (selectedCards) => {
        setSelectedCards(selectedCards);
        onChange(selectedCards);
    }

    const handleToggleSwitch = (e) => {
        setShowPointsCards(e.target.checked);
        Cookies.set('showPointsCards', e.target.checked, {expires: 7})
        let newCardArray = [...selectedCards];

        for (let i = 0; i < selectedCards.length; i++) {
            if (selectedCards[i].points === true && e.target.checked === false) {
                newCardArray.splice(i, 1);
            }
        }

        setSelectedCards(newCardArray);
    }

    const handleModalClose = () => {
        setModalShown(true);
        Cookies.set('modalShown', true, {expires: 7});
    }

    useEffect(() => {
        Cookies.set('select', JSON.stringify(selectedCards), {expires: 7});
    }, [selectedCards])


    return (
        <div className={styles.selectContainer}>
            <h3>Select a card...</h3>
            <Select className={styles.select}
                    isMulti
                    options={options}
                    value={selectedCards}
                    onChange={handleSelectChange}
            />
            <Form>
                <Form.Check
                    type="switch"
                    id="points-switch"
                    className={styles.switch}
                    label="Show cash-equivalent points cards"
                    onChange={handleToggleSwitch}
                />
            </Form>

            {modalShown === false && showPointsCards === true && (<Modal show={showPointsCards} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>A note about cash-equivalent points cards</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Please note that the value of cash-equivalent points shown here is not guaranteed.
                        Whilst the value shown is representative of the average value of points, the actual value may
                        change depending on where the points are spent, current offers from credit card providers,
                        and changes in policy. For example, some points may only be redeemable for full value when used for
                        travel, gift card purchases, or paying off a credit card. Please see the credit card provider's
                         website for more information. Thank you!
                    </div>
                </Modal.Body>
            </Modal>)}
        </div>
    )
}

export default CardSelect