import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import React, {useState} from 'react'
import styles from './slider.module.css';

const CostSlider = ({onChange}) => {

    const [grocerySliderValue, setGrocerySliderValue] = useState(0);
    const [transportationSliderValue, setTransportationSliderValue] = useState(0);
    const [recurringSliderValue, setRecurringSliderValue] = useState(0);
    const [otherSliderValue, setOtherSliderValue] = useState(0);

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
    const handleOtherSliderChange = (value) => {
        setOtherSliderValue(value);
        onChange(value, 'other');
    }
    return (
        <div className={styles.slider}>
            <label>Grocery</label>
            <Slider
                value={grocerySliderValue}
                className="slider"
                min={0}
                max={10000}
                step={500}
                dots={true}
                onChange={handleGrocerySliderChange}
            />
            <label>Transportation</label>
            <Slider
                value={transportationSliderValue}
                className="slider"
                min={0}
                max={10000}
                step={500}
                dots={true}
                onChange={handleTransportationSliderChange}
            />
            <label>Recurring</label>
            <Slider
                value={recurringSliderValue}
                className="slider"
                min={0}
                max={10000}
                step={500}
                dots={true}
                onChange={handleRecurringSliderChange}
            />
            <label>Other</label>
            <Slider
                value={otherSliderValue}
                className="slider"
                min={0}
                max={10000}
                step={500}
                dots={true}
                onChange={handleOtherSliderChange}
            />
        </div>
    );
};


export default CostSlider