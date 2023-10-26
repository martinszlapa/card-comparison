import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import data from './utils/Data'
import styles from './select.module.css';
import Cookies from 'js-cookie';

const options = data.cards.map((card) => ({
    value: card.institution,
    label: card.longName,
}));

const CardSelect = ({onChange}) => {
    const selectCookieValue = Cookies.get('select');

    const initialSelectValue = selectCookieValue ? JSON.parse(selectCookieValue) : [];

    const [selectedCards, setSelectedCards] = useState(initialSelectValue);
    const handleSelectChange = (selectedCards) => {
        setSelectedCards(selectedCards);
        onChange(selectedCards);
    }

    useEffect( () => {
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
        </div>
    )
}

export default CardSelect