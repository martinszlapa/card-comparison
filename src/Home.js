import React, {useState} from 'react';
import CostSliders from './CostSliders';
import CardSelect from "./CardSelect";
import CardChart from "./CardChart";
import data from "./utils/Data.json";
const Home = () => {
    const [cost, setCost] = useState({
        grocery: 0,
        transportation: 0,
        recurring: 0,
        restaurantEntertainment: 0,
        other: 0
    })

    const [selectedCards, setSelectedCards] = useState([]);

    function handleSliderChange(value, type){
        console.log(value);
        if (type === 'grocery') {
            setCost({
                ...cost,
                grocery: value
            })
        }
        else if (type === 'transportation') {
            setCost({
                ...cost,
                transportation: value
            })
        }
        else if (type === 'recurring') {
            setCost({
                ...cost,
                recurring: value
            })
        }
        else if (type === 'restaurantEntertainment') {
            setCost({
                ...cost,
                restaurantEntertainment: value
            })
        }
        else if (type === 'other') {
            setCost({
                ...cost,
                other: value
            })
        }
    }

    function handleSelectChange(selectedCards){
        // set data to use selected cards
        setSelectedCards(
            selectedCards.map((card) => data.cards.find((c) => c.longName === card.label))
        )
    }

    return(
        <div>
            <h1>Home</h1>
            <CostSliders onChange={handleSliderChange}/>
            <CardSelect onChange={handleSelectChange}/>
            <CardChart
                cost={cost}
                selectedCards={selectedCards}
                handleSliderChange={handleSliderChange}
                handleSelectChange={handleSelectChange}
            />
        </div>
    )
}

export default Home;