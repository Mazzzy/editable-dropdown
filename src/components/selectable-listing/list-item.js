import React from 'react';

const SelectableListItem = (props) => {
    
    const [selected, setSelected] = React.useState(false);
  
	const changeSelection = () => {
        const { listItem } = props;
        setSelected(prevSelected => !prevSelected);
        props.handleSelection({ listItem, selected });
    }
  
    const { listItem: { id, value }, isItemFound } = props;
    return (
        // <button 
        //     type="button"
        //     className={isItemFound? 'selected-item' : ''}
        //     onClick= {() => this.changeSelection()}
        // >
        //     { value? value: id }
        // </button>
        !isItemFound ? <button 
        type="button"
        className={isItemFound? 'selected-item' : ''}
        onClick= {changeSelection}
    >
        { value? value: id }
    </button> : ''
    );
};
export default SelectableListItem;