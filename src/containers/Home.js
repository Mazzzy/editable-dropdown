import React from 'react';
import EditableInputDropdown from '../components/editable-input-dropdown/EditableInputDropdown';
import './Home.css';

const data = {
    "item 1" : ['1', '11', '111'],
    "item 2" : ['2', '22', '222'],
    "item 3" : ['3', '33', '333']
}

const bubbleList = [
    { "id": "101", "value": "item 1" },
    { "id": "102", "value": "The quick brown fox jumps over the lazy dog" },
    { "id": "103", "value": "item 3" }
]

function Home() {
  return (
    <div className='home-container'>
        <EditableInputDropdown listData={data} bubbleList={bubbleList}/>
    </div>
    
  );
}

export default Home;