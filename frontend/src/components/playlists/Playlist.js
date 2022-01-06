//Först måste vi hämta den aktiva användaren
const activeUser = await fetch('/');

//sen måste vi välja arrayen med spellistor från den specifika användaren
const allPlaylists = activeUser.playlists;

//Rendera sedan ut alla spellistorna som finns innuti arrayen

const Playlists = () => {
	return <h1>Abdulla</h1>;
};

export default Playlists;
