import React, { useState, useContext } from 'react';
import styles from './PlaylistModal.module.css';
import AuthContext from '../../store/auth-context';
import { toast } from 'react-toastify';

const PlaylistModal = ({ setModalHandler }) => {
	const [name, setname] = useState('');
	const auth = useContext(AuthContext);

	//Toast satt men behöver lägga till en check om den gick igenom eller inte. Verkar som om MongoDB gör dubblettkontrollen.
	const addPlaylist = async () => {
		const result = fetch('/api/playlist/createplaylist', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({ playlist_name: name }),
		})
			.then((data) => data.json())
			.then((data) => {
				auth.setUserHandler(data);
			});

		toast.success('Playlist added!', {
			autoClose: 2500,
			hideProgressBar: true,
		});
		setModalHandler();
	};

	return (
		<>
			<div className={styles.overlay} onClick={() => setModalHandler()}></div>
			<div className={styles.form}>
				<label className={styles.label}>New playlist</label>
				<input
					className={`${styles.input} ${styles.inputFocus}`}
					type='text'
					placeholder='enter name'
					value={name}
					onChange={(event) => setname(event.target.value)}
				/>
				<button className={styles.button} onClick={addPlaylist}>
					Confirm
				</button>
			</div>
		</>
	);
};

export default PlaylistModal;
