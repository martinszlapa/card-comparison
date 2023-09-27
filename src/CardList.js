import React from 'react';
import data from './utils/Data.json';
import './CardList.css';
const CardList = () => {
    return (
        <div className={"cardList"}>

            {data.cards.map((card) => (
                <div key={card.longName} className={"listEntry"}>
                    <img src={card.image} alt={card.longName} className={"cardImage"}/>
                    <p>{card.longName}</p>
                </div>
            ))
            }
        </div>
    )
}

export default CardList;