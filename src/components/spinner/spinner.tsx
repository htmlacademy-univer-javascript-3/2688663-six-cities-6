import styles from '.spinner.module.css'
import spinner from './spinner.png';

export default function Spinner() {
    return (
        <div className={styles.SpinnerContainer}>
            <img src={spinner} className={styles.image} />
        </div>
    );
};
