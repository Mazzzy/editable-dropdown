import React, { useState, useRef } from 'react';
import ContentEditable from 'react-contenteditable';
import './EditableInputDropdown.css';

import SelectableList from '../selectable-listing';

function EditableInputDropdown({ listData, bubbleList }) {
  const [boxHtml, setBoxHtml] = useState("");
  const [showDataList, setShowDataList] = useState(false);
  const [dropdownData, setDropdownData] = useState([]);
  const editableElem = useRef(null);

  const [currentNode, setCurrentNode] = useState(null);
  
  const handleChange = evt => {
    setBoxHtml(evt.target.value);
    let sel = document.getSelection(),
        nd = sel.anchorNode,
        // text = nd.textContent.slice( 0, sel.focusOffset );
        text = nd.textContent;
    if(text) {
        let filteredData = listData[text];
        setCurrentNode(nd)
        if(filteredData) {
            // setCurrentNode(nd)
            setTimeout(() => {
                setDropdownData(filteredData);
                setShowDataList(true);
            }, 1000)
        } else {
            setShowDataList(false);
            setDropdownData(filteredData);
        } 
    }
    
  };

  const handleFocus = evt => {
    if(!boxHtml) {
        setBoxHtml("<ul><li></li></ul>");
    }
  }

  const handleKeyUp = evt => {
    let sel = document.getSelection(),
        nd = sel.anchorNode,
        text = nd.textContent;
    console.log('KEY UP ', nd)
    // if(text) {
    //     setCurrentNode(nd)
    // }
  }

  const handleItemClick = async evt => {
    let txt = evt.target.innerText;
    let isFormated = await formatCurrentTxt(txt);
    console.log('Done ', isFormated)
    if(isFormated) {
        setShowDataList(false);
    }
  }

  const formatCurrentTxt = async (txt) => {
    console.log('Current Elem ', editableElem.current)
    if(currentNode) {
        currentNode.textContent = txt;
        return await setCaretAndFocus(txt.length);
    }
  }

  const setCaretAndFocus = async (caretPos) => {
    let range = document.createRange();
    let sel = window.getSelection();

    range.setStart(currentNode, caretPos);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);

    editableElem.current.focus();
    let updatedHTML = editableElem.current.innerHTML;
    setBoxHtml(updatedHTML);
    return true;
  }

  // formatDoc('insertText', txt);
  const formatDoc = (sCmd, sValue) => {
    editableElem.current.focus()
    document.execCommand(sCmd, false, sValue); 
  }

  // bubbles related stuff
  const [selectedList, setSelectedList] = useState([]);
  const handleMenuItemChange = async (newValue) => {
    console.log('Item ', newValue)
    let isFormated = await formatCurrentTxt(newValue.value);
    console.log('Done ', isFormated)
    if(isFormated) {
        setSelectedList([...selectedList, newValue])
        let changeEvent = new Event('change');
        // Dispatch it.
        editableElem.current.dispatchEvent(changeEvent);
    }
  }
  

  return (
    <>
    <div className='list-container'>
        <SelectableList 
            mainList={bubbleList} 
            selectedList={selectedList} 
            handleChange={(newValue) => {
                handleMenuItemChange(newValue)
            }}
        />
    </div>
    <div className='editable-container'>
        <ContentEditable
            innerRef={editableElem}
            html={boxHtml}         
            disabled={false}        
            onChange={handleChange} 
            onFocus={handleFocus}
            //onKeyUp={handleKeyUp}
        />
        { showDataList ? 
          <div className='data-list'>
            <ul>
                {dropdownData.map((e, ind) => (
                    <li key={ind} onClick={handleItemClick}>item {e}</li>
                ))}
            </ul>
          </div>
        : '' }
    </div>
    </>
  );
}

export default EditableInputDropdown;