import React from 'react';

export default function({name}) {

	return (
		<div className="chat-header">
			<div className="user-info">
				<div className="user-name">{name}</div>
			</div>
		</div>
	);

}
