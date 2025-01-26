import React from 'react';
import { Chrono } from 'react-chrono';

const items = [
    {
        title: "Jun. 2018",
        cardTitle: "Graduation",
        cardSubtitle: "Graduation with IM bachnlor degree",
        cardDetailedText: "This is the first event on the timeline.This is the first event on the timeline.This is the first event on the timeline.This is the first event on the timeline.",
    },
    {
        title: "Apr. 2019",
        cardTitle: "First Job",
        cardSubtitle: "Event 2 Subtitle",
        cardDetailedText: "This is the second event on the timeline.",
    },
    {
        title: "Jun. 2020",
        cardTitle: "Second Job",
        cardSubtitle: "Event 3 Subtitle",
        cardDetailedText: "This is the third event on the timeline.",
    },
    {
        title: "Sep. 2022",
        cardTitle: "Event 3",
        cardSubtitle: "Event 3 Subtitle",
        cardDetailedText: "This is the third event on the timeline.",
    },
    {
        title: "Feb. 2025",
        cardTitle: "Australia",
        cardSubtitle: "Event 3 Subtitle",
        cardDetailedText: "This is the third event on the timeline.",
    }
];

const HorizontalTimeline = () => {


    return (

        <Chrono
            className="custom-chrono"
            items={items}
            theme={{
                primary: "#7E57C2",            // Softer purple for primary elements
                secondary: "#F06292",          // Pastel pink for secondary highlights
                cardBgColor: "#FFF9C4",        // Soft pastel yellow for card background
                cardForeColor: "#333333",      // Dark gray for card text
                titleColor: "white",           // Keep as white for titles
                titleColorActive: "black",     // Keep as black for active titles
                toolbarBgColor: "#263238",     // Blue-gray for toolbar background
                toolbarBtnBgColor: "#E57373",  // Softer red for toolbar buttons
                toolbarTextColor: "white",     // White for text on toolbar
            }}
            mode="HORIZONTAL"
            cradWidth={150}
            itemWidth={300}
            showSingle
            disableNavOnKey
            enableLayoutSwitch={false}
        />

    );
};

export default HorizontalTimeline;