import React, { useEffect, useState } from 'react'
import { FaExpandAlt } from 'react-icons/fa'

const API_KEY = 'f6abc1e217536661a5a54f743ad0937e'

const Clock = () => {
	const [location, setLocation] = useState('Unknown')
	const [time, setTime] = useState(new Date())
	const [formattedTime, setFormattedTime] = useState('')
	const [formattedDate, setFormattedDate] = useState('')

	useEffect(() => {
		const fetchLocation = async (lat, lon) => {
			try {
				const response = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
				)
				const data = await response.json()
				const city = data.name
				const country = data.sys.country
				setLocation(`${city}, ${country}`)
			} catch (error) {
				console.error('Error fetching location:', error)
				setLocation('Unknown')
			}
		}

		const getLocation = () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const { latitude, longitude } = position.coords
						fetchLocation(latitude, longitude)
					},
					(error) => {
						console.error('Error getting location:', error)
						setLocation('Unknown')
					}
				)
			} else {
				console.error('Geolocation is not supported by this browser.')
				setLocation('Unknown')
			}
		}

		const formatTime = (date) => {
			return new Intl.DateTimeFormat('en-US', {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: false,
			}).format(date)
		}

		const formatDate = (date) => {
			return new Intl.DateTimeFormat('en-US', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			}).format(date)
		}

		const interval = setInterval(() => {
			const currentTime = new Date()
			setTime(currentTime)
			setFormattedTime(formatTime(currentTime))
			setFormattedDate(formatDate(currentTime))
		}, 1000)

		getLocation()

		return () => clearInterval(interval)
	}, [])

	return (
		<div className="w-screen h-1/2 flex justify-center items-center mt-10">
			<div className="flex flex-col px-20 w-fit">
				<div className="flex justify-between w-full">
					<h1 className="flex justify-start text-2xl">
						The time in <span className="underline mx-1"> {location} </span> is
						now
					</h1>
					<button className="p-2 rounded-lg bg-[#80CED7] text-white hover:bg-[#007EA7]">
						<FaExpandAlt size={20} />
					</button>
				</div>
				<p className="flex justify-center text-[250px] font-bold h-fit w-fit">
					{formattedTime}
				</p>
				<p className="flex justify-end text-2xl">{formattedDate}</p>
			</div>
		</div>
	)
}

export default Clock
