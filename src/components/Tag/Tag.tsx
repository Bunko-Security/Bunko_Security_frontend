import styles from "./Tag.module.scss";
import { FC } from "react";
import IconTag from "/public/tag/icon-delete-tag.svg"

interface TagProps {
	text: string;
}

const Tag: FC<TagProps> = ({ text }) => {
	return (
		<div className={styles.tag}>
      <IconTag className={styles.icon} />
			<span className={styles.tag_text}>{text}</span>
		</div>
	);
};

export default Tag;
