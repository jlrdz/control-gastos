import styles from "./index.module.scss";

/**
 * Reusable Card component with neumorphism dark style.
 * Wraps any content inside a consistent styled container.
 */
export default function Card({ children, className = "" }) {
    return <div className={`${styles.card} ${className}`}>{children}</div>;
}
