/** @format */

import gql from 'graphql-tag';
import { useApolloClient } from '@apollo/client';
import { useMemo, useState } from 'react';
import { DateTime } from 'luxon';
const Home = () => {
	const apolloClient = useApolloClient();
	const [loading, setLoading] = useState(true);
	const [events, setEvents] = useState({});

	useMemo(async () => {
		console.log('CALL');
		setLoading(true);
		const loadEvents = await apolloClient.query({
			query: gql`
				query events {
					events {
						name
						startingDate
					}
				}
			`,
			fetchPolicy: 'network-only',
		});
		console.log(loadEvents);
		if (loadEvents.data.events && loadEvents.data.events.length > 0) {
			let eventsList = [];
			loadEvents.data.events.forEach((element) => {
				console.log(element);
				eventsList.push(element);
			});
			setEvents(eventsList);
		}
	}, []);
	return (
		<div
			style={{
				background: 'white',
				display: 'flex',
				height: '100%',
				width: '100%',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			{events.length > 0
				? events.map((event) => {
						return (
							<div
								style={{
									backgroundColor: 'lightgray',
									width: '90%',
									margin: 10,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}
							>
								<h2>{event.name}</h2>
								<p>
									Le {new Date(event.startingDate).toLocaleDateString()} à{' '}
									{new Date(event.startingDate).toLocaleTimeString()} (
									{DateTime.fromISO(event.startingDate).toRelativeCalendar()})
								</p>
							</div>
						);
				  })
				: 'rien a afficher'}
		</div>
	);
};

export default Home;
