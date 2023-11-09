import React, {useEffect, useState} from 'react'
import Select from 'react-select'
import Form from 'react-bootstrap/Form'
import data from './utils/Data'
import styles from './select.module.css';
import Cookies from 'js-cookie';


const CardSelect = ({onChange}) => {

    const selectCookieValue = Cookies.get('select');

    const initialSelectValue = selectCookieValue ? JSON.parse(selectCookieValue) : [];

    const [selectedCards, setSelectedCards] = useState(initialSelectValue);
    const [showPointsCards, setShowPointsCards] = useState(false);

    const options = data.cards
        .filter((card) => card.points === false || card.points === showPointsCards )
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
                    defaultChecked={showPointsCards}
                    type="switch"
                    id="points-switch"
                    className={styles.switch}
                    label="Show cash-equivalent points cards"
                    onChange={handleToggleSwitch}
                />
            </Form>
        </div>
    )
}

export default CardSelect