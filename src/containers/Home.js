import React, { useState } from 'react';
import ContentEditable from 'react-contenteditable';
import './Home.css';

function Home() {
  const [boxHtml, setBoxHtml] = useState("");
  
  const handleChange = evt => {
    
    setBoxHtml(evt.target.value);
    var sel = document.getSelection(),
        nd = sel.anchorNode,
        // text = nd.textContent.slice( 0, sel.focusOffset );
        text = nd.textContent;
    console.log('On text ', text)
  };

  const handleFocus = evt => {
    setBoxHtml("<ul><li></li></ul>");
  }

  return (
    <div className='home-container'>
        <ContentEditable
            html={boxHtml}         // innerHTML of the editable div
            disabled={false}        // use true to disable edition
            onChange={handleChange} // handle innerHTML change
            onFocus={handleFocus}
        />
    </div>
  );
}

export default Home;