import React from 'react';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

function Loading(props) {
    return (
        <div
            style={{
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center"
            }} 
        >
            <HourglassEmptyIcon 
                style={{
                    width:"400px",
                    height:"400px",
                    color:"rgb(216, 214, 214)",
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"center",
                    alignItems:"center"
                }} 
            />
        </div>
    );
}

export default Loading;