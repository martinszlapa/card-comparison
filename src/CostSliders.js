import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import React, {useState} from 'react'
import styles from './slider.module.css';
import Cookies from 'js-cookie';
import {BsFillBasketFill, BsFillBusFrontFill, BsFillPhoneFill, BsFilm, BsThreeDots} from 'react-icons/bs';

const CostSliders = ({onChange}) => {

    const costCookieValue = Cookies.get('cost');

    const [sliderMax, setSliderMax] = useState(5000);

    const initialCostValue = costCookieValue ? JSON.parse(costCookieValue) : {
        grocery: 0,
        transportation: 0,
        recurring: 0,
        restaurantEntertainment: 0,
        other: 0
    }

    const [grocerySliderValue, setGrocerySliderValue] = useState(initialCostValue.grocery);
    const [transportationSliderValue, setTransportationSliderValue] = useState(initialCostValue.transportation);
    const [recurringSliderValue, setRecurringSliderValue] = useState(initialCostValue.recurring);
    const [otherSliderValue, setOtherSliderValue] = useState(initialCostValue.other);
    const [restaurantEntertainmentSliderValue, setRestaurantEntertainmentSliderValue] = useState(initialCostValue.restaurantEntertainment);

    const handleGrocerySliderChange = (value) => {
        setGrocerySliderValue(value);
        onChange(value, 'grocery');
    }
    const handleTransportationSliderChange = (value) => {
        setTransportationSliderValue(value);
        onChange(value, 'transportation');
    }
    const handleRecurringSliderChange = (value) => {
        setRecurringSliderValue(value);
        onChange(value, 'recurring');
    }
    const handleRestaurantEntertainmentSliderChange = (value) => {
        setRestaurantEntertainmentSliderValue(value);
        onChange(value, 'restaurantEntertainment');
    }
    const handleOtherSliderChange = (value) => {
        setOtherSliderValue(value);
        onChange(value, 'other');
    }
    return (
        <div className={styles.sliderContainer}>
            <label> <BsFillBasketFill/> Grocery: {grocerySliderValue} $ / month</label>
            <Slider
                value={grocerySliderValue}
                className={styles.slider}
                min={0}
                max={sliderMax}
                onChange={handleGrocerySliderChange}
            />
            <label> <BsFillBusFrontFill/> Transportation: {transportationSliderValue} $ / month</label>
            <Slider
                value={transportationSliderValue}
                className={styles.slider}
                min={0}
                max={sliderMax}
                ariaValueTextFormatterForHandle={(value) => value.toString()}
                onChange={handleTransportationSliderChange}
            />
            <label> <BsFillPhoneFill/> Recurring: {recurringSliderValue} $ / month</label>
            <Slider
                value={recurringSliderValue}
                className={styles.slider}
                min={0}
                max={sliderMax}
                onChange={handleRecurringSliderChange}
            />
            <label> <BsFilm/> Restaurant/Entertainment: {restaurantEntertainmentSliderValue} $ / month</label>
            <Slider
                value={restaurantEntertainmentSliderValue}
                className={styles.slider}
                min={0}
                max={sliderMax}
                onChange={handleRestaurantEntertainmentSliderChange}
            />
            <label> <BsThreeDots/> Other: {otherSliderValue} $ / month</label>
            <Slider
                value={otherSliderValue}
                className={styles.slider}
                min={0}
                max={sliderMax}
                onChange={handleOtherSliderChange}
            />
        </div>
    );
};


export default CostSliders