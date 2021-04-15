import React from 'react';

const Link = ({ className, href, children }) => {
    const onClick = (event) => {
        if (event.metaKey || event.ctrlKey) { // these are both boolean properties.This will check if control key in windows and cmd key in mac is pressed when we click on the link. 
            return; //Browser will do it's normal function like open the link in new tab.
        }
        event.preventDefault();
        window.history.pushState({}, '', href); //changes the url. Its a built in function

        //Mysterious code: It is for communicating over to the Route component that some data(url) is changed
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    };

    return <a
        onClick={onClick}
        className={className}
        href={href}>
        {children}
    </a>;
}

export default Link;