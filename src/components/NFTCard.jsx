import React from 'react';
import styles from '../styles/NFTCard.module.css'

function NFTCard(props) {
    return (
        <div className={styles.nftcard}>
            <img src={props.imgURL}>
            </img>
            <p>{props.name}</p>
        </div>

    );
}

export default NFTCard;