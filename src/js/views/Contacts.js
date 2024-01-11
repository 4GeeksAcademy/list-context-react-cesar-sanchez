import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import { ModalUpdate } from "../component/ModalUpdate.js";

export const Contacts = () => {
	const { store, actions } = useContext(Context);
	const [state, setState] = useState({
		showModal: false,
		contactIdToDelete: null,
		showModalUpdate: false,
		contactId: null,
		full_name: null,
		email: null,
		address: null,
		phone: null
	});

	useEffect(() => {
		{
			actions.getAllAgenda();
		}
	}, []);
	//console.log(store.contacts);
	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{store.contacts.map(item => (
							<ContactCard
								key={item.id}
								full_name={item.full_name}
								address={item.address}
								phone={item.phone}
								email={item.email}
								onDelete={() => setState({ showModal: true, contactIdToDelete: item.id })}
								onUpdate={() =>
									setState({
										showModalUpdate: true,
										contactIdToUpdate: item.id,
										full_name: item.full_name,
										phone: item.phone,
										address: item.address,
										email: item.email
									})
								}
							/>
						))}
					</ul>
				</div>
			</div>
			<Modal show={state.showModal} id={state.contactIdToDelete} onClose={() => setState({ showModal: false })} />
			<ModalUpdate
				show={state.showModalUpdate}
				id={state.contactId}
				full_name={state.full_name}
				phone={state.phone}
				address={state.address}
				email={state.email}
				onUpdate={updatedContact => actions.updateContact(state.contactIdToUpdate, updatedContact)}
				onClose={() => setState({ showModalUpdate: false })}
			/>
		</div>
	);
};
