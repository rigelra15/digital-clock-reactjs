import React, { useEffect, useState } from 'react'

import Navbar from './components/Navbar'
import './App.css'

import { FaExpandAlt } from 'react-icons/fa'

const API_KEY = 'f6abc1e217536661a5a54f743ad0937e'

const App = () => {
	const [location, setLocation] = useState('Unknown')
	const [time, setTime] = useState(new Date())
	const [formattedTime, setFormattedTime] = useState('00:00:00')
	const [formattedDate, setFormattedDate] = useState('')

	const [fullscreenClock, setFullscreenClock] = useState(false)

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
		<div
			className={`${
				fullscreenClock ? 'bg-[#007EA7]' : 'bg-white'
			} h-screen transition-all duration-500 ease-in-out`}
		>
			<div
				className={`transition-transform duration-500 ease-in-out ${
					fullscreenClock ? '-translate-y-full' : 'translate-y-0'
				}`}
			>
				<Navbar />
			</div>
			<div className="w-screen flex justify-center items-center mt-10">
				<div className="flex flex-col px-20 w-full justify-center">
					<div className="flex justify-between w-full">
						<h1
							className={`flex justify-start text-2xl font-jost ${
								fullscreenClock ? 'opacity-0' : 'opacity-100'
							} transition-all duration-500 ease-in-out`}
						>
							The time in <span className="underline mx-2"> {location} </span>{' '}
							is now
						</h1>
						<button
							className={`z-50 p-2 rounded-lg bg-[#80CED7] text-white hover:bg-[#003247] transition-all duration-500 ease-in-out ${
								fullscreenClock ? 'fixed top-8 right-8' : ''
							}`}
							onClick={() => setFullscreenClock(!fullscreenClock)}
						>
							<FaExpandAlt size={28} />
						</button>
					</div>
					<p
						className={`flex justify-center items-center text-[350px] font-bold font-inter h-fit w-full transition-all duration-500 ease-in-out
    ${fullscreenClock ? 'absolute inset-0 text-white' : 'relative text-black'}
    ${fullscreenClock ? 'flex justify-center items-center h-screen' : 'mt-10'}`}
					>
						{formattedTime}
					</p>

					<p
						className={`flex justify-end text-2xl font-jost ${
							fullscreenClock ? 'opacity-0' : 'opacity-100'
						} transition-all duration-500 ease-in-out`}
					>
						{formattedDate}
					</p>
				</div>
			</div>
		</div>
	)
}

export default App
