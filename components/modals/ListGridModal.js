import { useRouter } from 'next/router'
// import Link from 'next/link'
import BookCard from '../cards/BookCard'

export default function ListGridModal({ listTitle, books, authors, coverRef }) {
	const router = useRouter()

	return (
		<section className='p-1 md:p-2 xl:p-3'>
			{listTitle && (
				<div
					className={
						'flex justify-between px-1 xl:p-6 ' +
						(!router.pathname.includes('/authors/') ? 'py-12' : 'py-1 xl:py-2')
					}
					ref={coverRef}>
					<h3 className='text-xl xl:text-2xl font-semibold leading-relaxed text-center xl:text-left w-full'>
						{listTitle}
					</h3>
				</div>
			)}
			<div className='px-1 xl:p-2'>
				<div className='list-grid'>
					{books ? (
						books.length ? (
							books.map((book, i) => <BookCard book={book} key={i} />)
						) : (
							<h3 className='text-lg md:text-xl p-6 text-left'>No books found</h3>
						)
					) : (
						authors.map((author, i) => <AuthorCard author={author} key={i} />)
					)}
				</div>
			</div>
		</section>
	)
}
