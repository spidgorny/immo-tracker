import styles from "../../styles/Home.module.css";

export function Layout({ children }) {
	return <div className={styles.container}>
		<div className={styles.mainLeft}>
			{children}
		</div>
	</div>;
}
