import React from 'react';


function createLink(Title,Src){
    return (
        <a href={Src}>{Title}</a>
    );
}

function Links(props){
    
    const listOfLinks = [];
    
    Object.entries(props.listOfLink).forEach(([key,value]) => {
        listOfLinks.push(createLink(key,value))
    });
    const listOfHeader = listOfLinks.map((el)=> {
        return (<>
        <div className='li_div'>
            <li className="">{el}</li>
            <div className='under_line'></div>
        </div>    
        </>
        );
    });

    return (
        listOfHeader
    );
}

export default Links;