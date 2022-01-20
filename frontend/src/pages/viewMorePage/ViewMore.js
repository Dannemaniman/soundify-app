import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import s from './ViewMore.module.css'
import backIcon from '../../assets/icons/back.png'
import PlayBtn from '../../components/songlist/PlayBtn'
import SongListOption from '../../components/songlist/SongListOptions'
import { getThumbnailUrl, millisToMinutesAndSeconds } from '../../components/utils/utils'
import InfiniteScroll from 'react-infinite-scroll-component'


const ViewMore = () => {
	let navigate = useNavigate()

	const query = new URLSearchParams(useLocation().search)
	const type = query.get('query')
	const name = query.get('name')

	const [dataToRender, setDataToRender] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [nextUrl, setNextUrl] = useState('')
	const [getMore, setGetMore] = useState(true)

	useEffect(() => {
		const fetchSearch = async () => {
			setIsLoading(true)
			const query = `yt/${type}/${name}`

			let response = await fetch(
				query
			)

			let res = await response.json()
			setDataToRender(res.content)
			setNextUrl(res.next)
			if (res) setIsLoading(false)
		}
		fetchSearch()
	}, [type, name, nextUrl])

	const handleGoback = () => {
		navigate(-1)
	}

	const fetchNewData = async () => {
		if (dataToRender.length > 150) {
			return setGetMore(false)
		}
		let res2 = await fetch(
			`https://yt-music-api.herokuapp.com/api/yt/${type}/${name}?next=` +
			nextUrl
		)
		let response2 = await res2.json()
		setTimeout(() => {
			setDataToRender((prevData) => [...prevData, ...response2.content])
		}, 1500)
		return
	}


	function goTo(ele) {
		if (ele.type === 'album' || ele.type === 'single') {
			navigate(`/artist/${ele.artist}/album/${ele.browseId}`)
		} else if (ele.type === 'artist') {
			navigate(`/artist/${ele.browseId}`)
		}
	}

	return (
		<div className={s.container}>
			<div
				className={s.header}
				onClick={() => {
					handleGoback()
				}}
			>
				<img src={backIcon} alt='' />
				<h1>
					{type.charAt(0).toUpperCase()}
					{type.slice(1)} found:
				</h1>
			</div>
			{isLoading && <div className={isLoading ? 'loader' : ''}></div>}
			{/* <div id='scrollableDiv' style={{ height: '99vh', overflowY: 'scroll' }}> */}
			<InfiniteScroll
				dataLength={dataToRender.length}
				next={fetchNewData}
				hasMore={getMore}
				loader={
					<p style={{ textAlign: 'center', color: 'black' }}>
						<h4>Loading...</h4>
					</p>
				}
				endMessage={
					<p style={{ textAlign: 'center', color: 'black' }}>
						<h3>Yay! You have seen it all</h3>
					</p>
				}>
				{!isLoading &&
					dataToRender.map((ele, index) => {
						return (
							<div
								className={s.viewMoreItem}
								key={index}
								onClick={() => {
									goTo(ele)
								}}
							>
								<div className={s.mainContent}>
									<h1
										className={ele.type !== 'song' ? s.artistTitle : s.songTitle}
									>
										{ele.name.substring(0, 20)}{' '}
										{ele.name.length > 20 ? '...' : ''}
									</h1>

									{ele.type !== 'song' && (
										<img src={getThumbnailUrl(ele)} alt='artist or album' />
									)}
									{ele.type === 'song' && (
										<div className={s.interaction}>
											<PlayBtn
												songs={dataToRender}
												index={index}
												song={ele}
												thumbnails={ele.thumbnails}
											/>
											<SongListOption song={ele} />
										</div>
									)}
								</div>
								{typeof ele.artist === 'string' && <p>By: {ele.artist}</p>}
								{!ele.artist && <p>Go to artist page</p>}
								{ele.type === 'song' && (
									<p>
										{ele.artist?.name ? ele.artist?.name : ''} -{' '}
										{millisToMinutesAndSeconds(ele.duration)}
									</p>
								)}
							</div>
						)
					})}
			</InfiniteScroll>
		</div>
	)
}

export default ViewMore
