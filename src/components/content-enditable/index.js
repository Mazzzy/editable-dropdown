import React from 'react';
import ReactContentEditable from "react-contenteditable";

const keys = ['ArrowDown', 'ArrowUp', 'Enter'];
export default class ContentEditable extends React.Component {
    onKeyDown = (event) => {
        if(!this.props.showDataList) return;

        if(keys.includes(event.key)) {
            event.stopPropagation();
            event.preventDefault();
        }
        const itemLength = this.props.dropdownData.length;
        switch(event.key) {
        case 'ArrowDown': {
            this.props.setFocusedItem(item => (itemLength - 1 === item || item === null) ? 0 : item + 1);
            break;
        }
        case 'ArrowUp': {
            this.props.setFocusedItem(item => (item === 0 || item === null) ? itemLength - 1 : item - 1);
            break;
        }
        case 'Enter': {
            const text = this.props.getItemText(this.props.dropdownData[this.props.focusedItem]);
            this.props.handleOptionClick(text);
            break;
        }
        default:
            break;
        }
    }
    render() {
        return <ReactContentEditable
            innerRef={this.props.editableElem}
            html={this.props.boxHtml}         
            disabled={this.props.disabled}        
            onChange={this.props.handleChange} 
            onFocus={this.props.handleFocus}
            onKeyDown={this.onKeyDown}
        />
    }
}