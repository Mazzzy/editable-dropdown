import React from 'react';
import './listing-style.css';
import SelectableListItem from './list-item';

const SelectableListing = ({ mainList, selectedList, handleChange }) => {
    const handleSelection = ({listItem, selected}) => {
        const isItemFound = checkItemExists(listItem.value);
        if (!isItemFound) {
            handleChange(listItem);
        }
    }
    const checkItemExists = (value) => {
        return selectedList.some(el => el.value === value)
    }
    return (<div className='selectable-listing'>
        {mainList.map(listItem => {
            const { value } = listItem;
            const isItemFound = checkItemExists(value);
            return (
                <SelectableListItem key={value} isItemFound={isItemFound} listItem={listItem} handleSelection={handleSelection}/>
            )}
        )}
    </div>);
};
export default SelectableListing