import React from 'react';

class SelectableListItem extends React.Component{
    state = {
  	    selected: false,
    }
  
	changeSelection = () => {
        const { selected } = this.state;
        const { listItem } = this.props;
        this.setState({selected: !selected});
        this.props.handleSelection({ listItem, selected });
    }
  
	render(){
        const { listItem, isItemFound } = this.props;
        const { id, value } = listItem;
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
            onClick= {() => this.changeSelection()}
        >
            { value? value: id }
        </button> : ''
		);	
    }
};
export default SelectableListItem;