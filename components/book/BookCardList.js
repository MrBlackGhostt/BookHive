import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import HeadphoneIcon from '../../assets/HeadphoneIcon'

function BookCardList({ title, image, author }) {
	return (
		<Fragment>
			<div className='flex items-center justify-center min-h-screen bg-slate-100'>
				<div className='flex flex-col p-6 m-3 space-y-10 bg-white rounded-2xl shadow-2xl md:flex-row md:space-y-0 md:space-x-10 md:m-0 md:p-16'></div>

				<div>
					<Image
						src={'http://127.0.0.1:5000' + image.path}
						alt={title}
						height={144}
						width={100}
						className='object-fit rounded-xl md:rounded-r-none transform hover:scale-105 hover:rounded-xl duration-200'
					/>

					<div className='flex flex-col space-y-6'>
						<div className='flex flex-col mb-4 space-y-3 text-left'>
							<div className='max-w-sm text-2xl font-medium'>{title}</div>
							<div className='flex flex-col mb-4 space-y-3 text-center md:text-left'>
								<p className='text-sm font-light text-gray-800'>{author}</p>
							</div>

							<div className='flex flex-row space-y-4 md:space-y-0 md:space-x-4 md:flex-row'>
								<button className='flex items-center justify-center py-3 px-5 space-x-3 border-2 border-gray-300 rounded-lg shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150'>
									<HeadphoneIcon className='h-8 w-8' />
									<span>Listen</span>
								</button>

								<button className='flex items-center justify-center py-3 px-5 space-x-3 border-2 border-gray-300 rounded-lg shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150'>
									<RemoveIcon className='h-8 w-8' />
									<span>Remove</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default BookCardList
