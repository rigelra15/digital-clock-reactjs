import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

const Navbar = () => {
	return (
		<div className="bg-white w-screen flex flex-row justify-between items-center px-8">
			<div className="bg-[#007EA7] text-white px-4 py-2">
				<p className="text-center font-jersey text-3xl">just clock</p>
				<hr />
				<p className="text-center font-jost text-xl">reliable every second</p>
			</div>
			<ul className="flex flex-row gap-8 justify-between items-center text-[30px] font-jersey">
				<li>
					<a
						href="/"
						className={`${
							window.location.pathname === '/'
								? 'text-[#007EA7]'
								: 'text-[#9A9A9A]'
						}`}
					>
						Home
					</a>
				</li>
				<li>
					<a
						href="/alarm"
						className={`${
							window.location.pathname === '/alarm'
								? 'text-[#007EA7]'
								: 'text-[#9A9A9A]'
						}`}
					>
						Alarm
					</a>
				</li>
				<li>
					<a
						href="/countdown"
						className={`${
							window.location.pathname === '/countdown'
								? 'text-[#007EA7]'
								: 'text-[#9A9A9A]'
						}`}
					>
						Countdown
					</a>
				</li>
				<li>
					<a
						href="/world-clock"
						className={`${
							window.location.pathname === '/world-clock'
								? 'text-[#007EA7]'
								: 'text-[#9A9A9A]'
						}`}
					>
						World Clock
					</a>
				</li>
				<li>
					<FaUserCircle size={32} />
				</li>
			</ul>
		</div>
	)
}

export default Navbar
