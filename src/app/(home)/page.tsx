import styles from "./page.module.scss";
import Image from "next/image";
import type { NextPage } from "next";

const HomePage: NextPage = () => {
	return (
		<main className={styles.info}>
			<h1 className={styles.title}>Bunko Security Filemanager</h1>
      <span />
			<p className={styles.description}>
				<span>BSF</span> — это современная платформа для обмена файлами, созданная с упором на
				безопасность передачи данных. В процессе разработки был изучен опыт аналогичных проектов для
				выявления их сильных и слабых сторон с целью создания более совершенного и актуального
				продукта в этой области. В настоящее время файлообменник находится на своем начальном этапе
				разработки, но у создателей много планов и инновационных идей для дальнейшего развития
				своего детища!
			</p>

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
						Наш продукт использует надёжные алгоритмы шифрования для Ваших файлов и ключей, чтобы
						обезопасить Ваши данные во время передачи между устройством и сервером. Также всё
						шифрование происходит на стороне клиента, то есть в Вашем браузере! Следовательно,
						данные не смогут быть прочитаны злоумышленниками, даже если они проникнут на сервера!
					</p>
				</div>
			</section>

			<section className={styles.positive_features}>
				<Image
					src="/main/speed.png"
					alt=""
					width={325}
					height={250}
				/>
				<div className={styles.block_text}>
					<h3 className={styles.subtitle}>Скорость без границ</h3>
					<p>
						Сервера готовы к Вашей нагрузке! Также постоянно происходит оптимизация шифрования на
						стороне браузера, чтобы сделать отправку и получение файлов еще быстрее!
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
						На данном этапе разработки наш продукт абсолютно бесплатен и никак не ограничивает Ваши
						возможности! Пользуйтесь, пока можете!
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
						Файлообменник готов к работе в любом месте на нашей планете! Также будет проходить
						постепенная локализация под множество языков мира!
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
						Использование сертифицированных алгоритмов шифрования гарантирует надёжность передачи
						данных и их сохранность! В будущем планируется сертификация в разных странах мира у
						самых разных организаций! Роспатент не за горами!
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
						Внимание к пользователям и близкое общение с ними — залог любого успешного проекта.
						Поэтому мы организовали круглосуточную систему технической поддержки, которая готова
						выслушать любую Вашу проблему и помочь ее решить в кратчайшие сроки. Также Вы можете
						писать свои пожелания на нашу почту! Ждем с нетерпением Ваших отзывов!
					</p>
				</div>
			</section>
		</main>
	);
};

export default HomePage;
