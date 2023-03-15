// import { useState, useEffect } from 'react'
import Link from 'next/link'
import useWindowWidth from '../../hooks/useWindowWidth'
import BookCard from '../cards/BookCard'
import AuthorCard from '../cards/AuthorCard'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { settings } from '../../utils/constants/sliderSettings'

export default function ListSliderModal({ listTitle, listLink, books, authors }) {
	const windowWidth = useWindowWidth()

	const silderContent = books ? (
		books.length ? (
			books.map((book, i) => <BookCard book={book} key={i} />)
		) : (
			<h3 className='text-lg md:text-xl p-6 text-left'>No books found</h3>
		)
	) : (
		authors?.map((author, i) => <AuthorCard author={author} key={i} />)
	)

	return (
		<section className='mb-8 xl:mb-6 xl:py-3 px-2 bg-transparent'>
			<div className='mx-auto md:px-2'>
				<div className='flex xl:justify-center'>
					<div className='flex justify-between my-3 w-full xl:w-[86.5%] xl:my-2'>
						<h3 className='text-lg xl:text-2xl mx-1 xl:mx-0 font-semibold text-center'>
							{listTitle}
						</h3>
						{listLink ? (
							<Link href={listLink} scroll={true}>
								<button className='more-box-btn mx-2 xl:mx-0'>More</button>
							</Link>
						) : (
							<></>
						)}
					</div>
				</div>
				{windowWidth < 1280 ? (
					<div className='overflow-hidden overflow-x-scroll hide-scrollbar'>
						<div className='flex items-start justify-start gap-2 sm:gap-3 w-full h-full'>
							{silderContent}
						</div>
					</div>
				) : (
					<div className='h-auto group lg:px-8 xl:px-12'>
						<Slider {...settings}>{silderContent}</Slider>
					</div>
				)}
			</div>
		</section>
	)
}
