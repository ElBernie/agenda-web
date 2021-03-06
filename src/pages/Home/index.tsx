/** @format */
import './style.css';
import gql from 'graphql-tag';
import { useApolloClient } from '@apollo/client';
import { useMemo, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import Loader from 'react-loader-spinner';
import Navbar from '../../components/navar';
import { useReactToPrint } from 'react-to-print';
const Home = () => {
	const apolloClient = useApolloClient();
	const componentRef = useRef(null);
	const print = useReactToPrint({ content: () => componentRef.current });
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
			{!loading ? <Navbar printHandle={print} /> : null}
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
				<div
					ref={componentRef}
					style={{
						width: '100%',
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					{events.map((event: any) => {
						return (
							<>
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
										??{' '}
										{DateTime.fromISO(event.startingDate).toLocaleString({
											hour: '2-digit',
											minute: '2-digit',
										})}{' '}
										(
										<span style={{ fontStyle: 'italic' }}>
											{DateTime.fromISO(
												event.startingDate
											).toRelativeCalendar()}
											)
										</span>
										{event.mandatory ? (
											<p style={{ fontStyle: 'italic', color: 'red' }}>
												pr??sence requise
											</p>
										) : (
											<p style={{ fontStyle: 'italic', color: 'green' }}>
												pr??sence souhait??e mais non requise
											</p>
										)}
									</p>
								</div>
							</>
						);
					})}
				</div>
			) : (
				'rien a afficher'
			)}
		</div>
	);
};

export default Home;
