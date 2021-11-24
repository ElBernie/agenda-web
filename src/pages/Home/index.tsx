/** @format */
import './style.css';
import gql from 'graphql-tag';
import { useApolloClient } from '@apollo/client';
import { useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import Loader from 'react-loader-spinner';
const Home = () => {
	const apolloClient = useApolloClient();
	const [loading, setLoading] = useState(true);
	const [events, setEvents] = useState([]);

	useMemo(async () => {
		setLoading(true);
		const loadEvents = await apolloClient.query({
			query: gql`
				query events {
					events {
						name
						startingDate
						mandatory
					}
				}
			`,
			fetchPolicy: 'network-only',
		});
		console.log(loadEvents);
		if (loadEvents.data.events && loadEvents.data.events.length > 0) {
			let eventsList: any = [];
			loadEvents.data.events.forEach((element: any) => {
				console.log(element);
				eventsList.push(element);
			});
			setEvents(eventsList);
			setLoading(false);
		}
	}, []);
	return (
		<div id='page'>
			{loading ? (
				<div
					style={{
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<Loader type='Puff' color='#00BFFF' height={100} width={100} />
					<p>Chargement de l'agenda en cours</p>
				</div>
			) : events.length > 0 ? (
				events.map((event: any) => {
					return (
						<div className='event'>
							<h2>{event.name}</h2>
							<p>
								Le{' '}
								{DateTime.fromISO(event.startingDate).toLocaleString({
									month: 'numeric',
									year: 'numeric',
									day: 'numeric',
									weekday: 'long',
								})}{' '}
								à{' '}
								{DateTime.fromISO(event.startingDate).toLocaleString({
									hour: '2-digit',
									minute: '2-digit',
								})}{' '}
								(
								<span style={{ fontStyle: 'italic' }}>
									{DateTime.fromISO(event.startingDate).toRelativeCalendar()})
								</span>
								{event.mandatory ? (
									<p style={{ fontStyle: 'italic', color: 'red' }}>
										présence requise
									</p>
								) : (
									<p style={{ fontStyle: 'italic', color: 'green' }}>
										présence souhaitée mais non requise
									</p>
								)}
							</p>
						</div>
					);
				})
			) : (
				'rien a afficher'
			)}
		</div>
	);
};

export default Home;
