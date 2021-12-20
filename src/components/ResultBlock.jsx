import React from 'react';
import styles from './ResultBlock.module.scss';

function ResultBlock({title,snippet}) {
  const url = `https://en.wikipedia.org/wiki/${title}`
  return (
    <div className={styles.wrapper}>
        <h2>{title}</h2>
        <div className={styles.body}>
           <p dangerouslySetInnerHTML={{ __html:snippet}}></p>
        </div>
        <div className={styles.footer}>
            <a href={url} target='_blank' rel="noreferrer">Read More</a>
        </div>
    </div>
  );
}

export default ResultBlock;
