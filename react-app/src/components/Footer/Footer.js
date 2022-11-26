import React from 'react';
import './Footer.css';

export default function Footer() { // export to be globally available to other files
    return (
        <div className="Footer">
            <p> A Budgeting App by Eric Peltzman </p>
            <span id ="github_link">
                <a href="https://github.com/ericpeltzman">
                    <i className="fab fa-github"></i>
                </a>
            </span>
            <span id ="linkedin_link">
                <a href="https://www.linkedin.com/in/eric-peltzman/"> 
                    <i className="fab fa-linkedin"></i>
                </a>
                </span>
        </div>
    );
};
           
                