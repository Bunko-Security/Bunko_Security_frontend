import styles from "./page.module.scss";
import Image from "next/image";
import { NextPage } from "next";

const Home: NextPage = () => {
	return (
		<main className={styles.info}>
			<h1 className={styles.title}>Bunko Security Filemanager</h1>
      
			<section className={styles.positive_features}>
				<Image
					src="/main/defense.png"
					alt=""
					width={291}
					height={307}
				/>
				<div className={styles.block_text}>
					<h3 className={styles.subtitle}>Безопасность</h3>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ut, veritatis
						accusamus rem dolores distinctio eius iure hic debitis explicabo, alias obcaecati
						voluptate. Similique, reiciendis! Ipsa esse aliquid placeat quidem!
					</p>
				</div>
			</section>

      <section className={styles.positive_features}>
				<Image
					src="/main/speed.png"
					alt=""
					width={275}
					height={275}
				/>
				<div className={styles.block_text}>
					<h3 className={styles.subtitle}>Скорость без границ</h3>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ut, veritatis
						accusamus rem dolores distinctio eius iure hic debitis explicabo, alias obcaecati
						voluptate. Similique, reiciendis! Ipsa esse aliquid placeat quidem!
					</p>
				</div>
			</section>

      <section className={styles.positive_features}>
				<Image
					src="/main/free.png"
					alt=""
					width={282}
					height={175}
				/>
				<div className={styles.block_text}>
					<h3 className={styles.subtitle}>Бесплатно</h3>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ut, veritatis
						accusamus rem dolores distinctio eius iure hic debitis explicabo, alias obcaecati
						voluptate. Similique, reiciendis! Ipsa esse aliquid placeat quidem!
					</p>
				</div>
			</section>

      <section className={styles.positive_features}>
				<Image
					src="/main/accessible.png"
					alt=""
					width={300}
					height={250}
				/>
				<div className={styles.block_text}>
					<h3 className={styles.subtitle}>Доступность</h3>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ut, veritatis
						accusamus rem dolores distinctio eius iure hic debitis explicabo, alias obcaecati
						voluptate. Similique, reiciendis! Ipsa esse aliquid placeat quidem!
					</p>
				</div>
			</section>

      <section className={styles.positive_features}>
				<Image
					src="/main/certification.png"
					alt=""
					width={290}
					height={251}
				/>
				<div className={styles.block_text}>
					<h3 className={styles.subtitle}>Сертифицированность</h3>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ut, veritatis
						accusamus rem dolores distinctio eius iure hic debitis explicabo, alias obcaecati
						voluptate. Similique, reiciendis! Ipsa esse aliquid placeat quidem!
					</p>
				</div>
			</section>

      <section className={styles.positive_features}>
				<Image
					src="/main/help.png"
					alt=""
					width={350}
					height={223}
				/>
				<div className={styles.block_text}>
					<h3 className={styles.subtitle}>Техподдержка</h3>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ut, veritatis
						accusamus rem dolores distinctio eius iure hic debitis explicabo, alias obcaecati
						voluptate. Similique, reiciendis! Ipsa esse aliquid placeat quidem!
					</p>
				</div>
			</section>
		</main>
	);
};

export default Home;
