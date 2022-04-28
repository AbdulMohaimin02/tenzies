import React from "react";
import "./Die.css"

export default function Die(props){

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }


    return (
        <div className="die" style={styles} onClick={() => props.hold(props.id)}>
            <p>{props.value}</p>
        </div>
    );

}

