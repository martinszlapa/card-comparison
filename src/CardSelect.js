import React, {useState} from 'react'
import Select from 'react-select'
import data from './utils/Data'
import styles from './select.module.css';

const options = data.cards.map((card) => ({
    value: card.institution,
    label: card.longName,
}));

const CardSelect = ({onChange}) => {
    const [selectedCards, setSelectedCards] = useState([]);
    const handleSelectChange = (selectedCards) => {
        setSelectedCards(selectedCards);
        onChange(selectedCards);
    }
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