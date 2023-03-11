import { useState, useEffect, useContext, useRef, Fragment } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import useWindowDimensions from '../hooks/useWindowDimensions'
import { getBestsellers, getLatestBooks, getTopAudiobooks } from '../api/books'
import { getTopAuthors } from '../api/authors'
import UserContext from '../store/userContext'
import PageHeader from '../components/layouts/PageHeader'
import ScrollToTop from '../components/ScrollToTop'
import ListSliderModal from '../components/modals/ListSliderModal'
import BookCard from '../components/cards/BookCard'
import AuthorCard from '../components/cards/AuthorCard'
import Logo from '../components/ui/Logo'
import LoginButton from '../components/ui/LoginButton'
import AccountIcon from '../assets/icons/AccountIcon'

// import HamburgerIcon from '../assets/icons/HamburgerIcon'
// import SpinnerContext from '../store/spinnerContext'

function HomePage(props) {
	const { user } = useContext(UserContext)
	const [activeUser, setActiveUser] = useState(null)
	const windowWidth = useWindowDimensions()

	useEffect(() => {
		setActiveUser(user?.data)
		// if (!activeUser?.data) getUserProfile()
	}, [user])

	const pageRef = useRef(null)

	return (
		<Fragment>
			<Head>
				<title>Bookhive</title>
				<meta
					name='description'
					content='Bookhive is an online platform for accessing thousands of free audiobooks, ePubs, PDFs, magazines and podcasts.'
				/>
			</Head>
			<div className='page-gradient pb-16 xl:pb-12' ref={pageRef}>
				<ScrollToTop pageRef={pageRef} />
				{windowWidth < 1280 && (
					<div className='block'>
						<PageHeader
							pageTitle={<Logo size={32} />}
							rightContainer={
								activeUser?.name ? (
									<Link href={'/user/account'}>
										{activeUser?.image ? (
											<img
												className='rounded-full w-7 h-7'
												src={activeUser.image}
												alt='user image'
											/>
										) : (
											<AccountIcon dimensions='h-7 w-7' />
										)}
									</Link>
								) : (
									<div className='transform scale-90'>
										<LoginButton />
									</div>
								)
							}
						/>
					</div>
				)}
				<div className='py-1 xl:py-4'>
					<ListSliderModal
						listTitle='Popular books'
						listLink='/books/category/bestsellers'>
						{props.bestsellers?.map((book) => (
							<BookCard book={book} />
						))}
					</ListSliderModal>
					<ListSliderModal
						listTitle='Featured Audiobooks'
						listLink='/books/category/audiobooks'>
						{props.audiobooks?.map((book) => (
							<BookCard book={book} />
						))}
					</ListSliderModal>
					<ListSliderModal listTitle='Latest arrivals' listLink='/books/category/latest'>
						{props.latestBooks?.map((book) => (
							<BookCard book={book} />
						))}
					</ListSliderModal>
					<ListSliderModal listTitle='Popular authors' listLink='/authors'>
						{props.authors?.map((author) => (
							<AuthorCard author={author} />
						))}
					</ListSliderModal>
				</div>
			</div>
		</Fragment>
	)
}

export async function getStaticProps() {
	const bestsellers = await getBestsellers(15)
	const audiobooks = await getTopAudiobooks(15)
	const latestBooks = await getLatestBooks(15)
	const authors = await getTopAuthors(15)

	if (!bestsellers.data)
		return {
			notFound: true,
		}

	return {
		props: {
			bestsellers: bestsellers.data,
			audiobooks: audiobooks.data,
			latestBooks: latestBooks.data,
			authors: authors.data,
		},
		revalidate: 600,
	}
}

export default HomePage
