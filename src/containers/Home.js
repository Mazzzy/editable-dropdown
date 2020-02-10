import React from 'react';
import EditableInputDropdown from '../components/editable-input-dropdown/EditableInputDropdown';
import './Home.css';

const data = {
    "item 1" : ['1', '11', '111'],
    "item 2" : ['2', '22', '222'],
    "item 3" : ['3', '33', '333']
}

function Home() {
  return (
    <EditableInputDropdown listData={data} />
  );
}

export default Home;