import styles from "./PeopleListWithSearchHOC.module.scss";
import Loader from "../Loader/Loader";
import InputSearch from "../forms/InputSearch/InputSearch";
import type { IFriend } from "@/models/friend.model";
import { forwardRef, type ComponentType, type MouseEventHandler } from "react";

// TODO: Подумать о том, имеет ли смысл засунуть сюда проверку на отсутствие элементов списка

// * HOC для создания списка с поиском из передаваемых компонентов

function PeopleListWithSearchHOC<T>(
	PersonComponent: ComponentType<T>,
	people: IFriend[] | any[], // !WARNING: Вместо any должен быть другой тип
	isLoading: boolean,
	fnClickList?: MouseEventHandler<HTMLDivElement>,
) {
	return forwardRef<HTMLDivElement, Omit<T, "person">>((props, ref) => {
		const onClickList: MouseEventHandler<HTMLDivElement> = (e) => {
			fnClickList?.(e);
		};

		return (
			<div className={styles.people_list}>
				<InputSearch
					placeholder="Имя пользователя"
					style={{ marginBottom: 25 }}
				/>
				{isLoading && <Loader />}
				{people && (
					<div
						className={styles.people}
						ref={ref}
						onClick={onClickList}
					>
						{people.map((person) => (
							<PersonComponent
								key={person.login}
								person={person}
								{...(props as T)}
							/>
						))}
					</div>
				)}
			</div>
		);
	});
}

export default PeopleListWithSearchHOC;
