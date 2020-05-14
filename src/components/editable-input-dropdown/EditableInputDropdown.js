import React, { useState, useRef, useEffect } from 'react';
import ContentEditable from '../content-enditable';
import './EditableInputDropdown.css';

import SelectableList from '../selectable-listing';

const getItemText = (value) => `item ${value}`;


function createElement( str ) {
  var elem = document.createElement('div');
  elem.innerHTML = str;

  return elem;
}


function processUL(ul) {
  let generatedArr = []
  if (!ul.childNodes || ul.childNodes.length === 0) return;

  // Iterate LIs
  for (var itemi=0; itemi<ul.childNodes.length; itemi++) {
    var item = ul.childNodes[itemi];
    if (item.nodeName === "LI") {
      let txt = item.innerText;
      if( txt !== "") {
        generatedArr.push({ id: itemi, value: txt.trim()});
      }
    }
  }
  return generatedArr;
}

function EditableInputDropdown({ listData, bubbleList }) {
  const [focusedItem, setFocusedItem] = React.useState(null);
  const [boxHtml, setBoxHtml] = useState("");
  const [showDataList, setShowDataList] = useState(false);
  const [dropdownData, setDropdownData] = useState([]);
  const editableElem = useRef(null);
  const [currentNode, setCurrentNode] = useState(null);
  useEffect(() => {
    // update selected list stuff
    function updateSelectedDataList() {
      let item = createElement(boxHtml);
      if(item.childNodes.length){
        let arr = processUL(item.childNodes[0])
        if(arr.length) {
          setSelectedList(arr);
        }
      }
    }
    if(boxHtml){
      updateSelectedDataList();
    } 
 }, [boxHtml]);

  const handleChange = evt => {
    let sel = document.getSelection(),
      nd = sel.anchorNode,
      text = nd.textContent;

    if(nd.tagName === 'DIV') {
      // to handle removal of bullet condition when no text entered
      setTimeout(()=> {
        formatDoc('insertHTML', '<ul><li></li></ul>'); 
        let updatedHTML = boxHtml.replace(/<div>/gi,'').replace(/<\/div>/gi,'')
        setBoxHtml(updatedHTML);
      },0);
    } else {
      setBoxHtml(evt.target.value);
    }
        
    if(text) {
      let filteredData = listData[text];
      setCurrentNode(nd)
      if(filteredData) {
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

  // for dropdown stuff
  const handleOptionClick = async txt => {
    let isFormated = await formatCurrentTxt(txt);
    if(isFormated) {
      setShowDataList(false);
      setFocusedItem(null);
    }
  }

  const formatCurrentTxt = async (txt) => {
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

  // bubbles related stuff
  const [selectedList, setSelectedList] = useState([]);
  const handleMenuItemChange = async (newValue) => {
    let updatedVal = newValue.value + '\r\n';
    if(!boxHtml) { 
      await editableElem.current.focus(); 
      //updatedVal = newValue.value;
    } 

    let isFormatted = formatDoc('insertText', updatedVal); 
    if(isFormatted) {
      setSelectedList([...selectedList, newValue])
    }
  }

  const formatDoc = (sCmd, sValue) => {
    return document.execCommand(sCmd, false, sValue); 
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
        editableElem={editableElem}
        boxHtml={boxHtml}         
        disabled={false}        
        handleChange={handleChange} 
        handleFocus={handleFocus}
        showDataList={showDataList}
        dropdownData={dropdownData}
        setFocusedItem={setFocusedItem}
        getItemText={getItemText}
        focusedItem={focusedItem}
        handleOptionClick={handleOptionClick}
      />
        { showDataList ? 
          <div className='data-list' >
            <ul>
              {dropdownData.map((value, index) => {
                const itemText = getItemText(value);
                return (
                <li className={index === focusedItem ? 'li-active' : ''} onMouseEnter={() => setFocusedItem(index)} key={value} onClick={() => handleOptionClick(itemText)}>{itemText}</li>
              )
                })}
            </ul>
          </div>
        : '' }
     </div>
    </>
  );
}

export default EditableInputDropdown;