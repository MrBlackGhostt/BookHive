import { useState, useEffect, useRef, useContext } from 'react'
// import Image from 'next/image'

import SnackbarContext from '../../store/snackbarContext'
import { likeBookReview } from '../../API/books'
import StarIcon from '../../assets/icons/StarIcon'
import LikeIcon from '../../assets/icons/LikeIcon'
import EllipsisIcon from '../../assets/icons/EllipsisIcon'
import ChevronUpIcon from '../../assets/icons/ChevronUpIcon'
import ChevronDownIcon from '../../assets/icons/ChevronDownIcon'
// import AccountIcon from '../../assets/icons/AccountIcon'

function ReviewCard(props) {
	const snackbarCtx = useContext(SnackbarContext)
	const { review, user, editReviewHandler } = props
	const [readMore, setReadMore] = useState(false)
	const [descLines, setDescLines] = useState(0)
	const [userId, setUserId] = useState('')
	const [likedReview, setLikedReview] = useState(false)
	const [totalLikes, setTotalLikes] = useState(0)
	const [updatingLikes, setUpdatingLikes] = useState(false)

	const reviewRef = useRef(null)

	const readMoreDescHandler = () => {
		const descEl = reviewRef.current
		if (descEl) {
			descEl.style.display = 'inline'
			setDescLines(descEl.getClientRects().length)
			descEl.style.display = '-webkit-box'
		}
	}

	useEffect(() => {
		if (typeof window !== 'undefined' && reviewRef) {
			readMoreDescHandler()
			window.addEventListener('orientationchange', readMoreDescHandler, false) // descLines incorrect value
		}
	}, [reviewRef?.current])

	useEffect(() => {
		if (user) {
			setUserId(user._id)
			setLikedReview(review.likes?.some((userId) => userId === user._id))
			setTotalLikes(review.likes?.length)
		}
	}, [user])

	const likeReviewHandler = async (reviewId) => {
		if (!user) {
			snackbarCtx.addMessage({ title: 'Please login to like reviews' })
			return
		} else if (updatingLikes) return

		setUpdatingLikes(true)

		if (likedReview) {
			setLikedReview(false)
			setTotalLikes(totalLikes - 1)
		} else {
			setLikedReview(true)
			setTotalLikes(totalLikes + 1)
		}

		const data = await likeBookReview(reviewId)
		console.log('review:-\n', data)
		if (!data.review) {
			if (likedReview) {
				setLikedReview(false)
				setTotalLikes(totalLikes - 1)
			} else {
				setLikedReview(true)
				setTotalLikes(totalLikes + 1)
			}
			snackbarCtx.addMessage({ title: review })
		} else snackbarCtx.addMessage({ title: 'Thank you for your feedback' })
		setUpdatingLikes(false)
	}

	return (
		<div className='flex flex-col relative rounded-lg bg-gray-900 my-4 xl:my-8'>
			<div className='flex items-start justify-start gap-2'>
				<div className='flex items-center justify-start text-md md:text-lg text-xl w-fit px-2 py-1 font-medium bg-[#192132] rounded-lg'>
					<div className='mr-1 xl:mr-2'>
						<StarIcon dimensions='h-6 w-6' />
					</div>
					{review.rating}
				</div>
				<div className='flex items-center flex-wrap font-semibold text-lg leading-5 truncate py-2 mx-2'>
					{review.title}
				</div>
			</div>
			<div className='flex flex-col justify-center h-full p-2 text-white'>
				<p
					ref={reviewRef}
					className={
						'text-md text-gray-200 font-medium sm:leading-snug leading-normal ' +
						(!readMore ? 'line-clamp-3' : '')
					}>
					{review.description}
				</p>
				<button
					onClick={(e) => {
						setReadMore(!readMore)
						e.preventDefault()
					}}
					className={
						'cursor-pointer text-sm xl:text-sm font-semibold text-[#8C6AFF] underline decoration-1 decoration-gray-300 underline-offset-4 ' +
						(descLines <= 4 ? 'hidden' : '')
					}>
					{readMore ? (
						<div className='flex'>
							Read less <ChevronUpIcon dimensions='h-5 w-5' />
						</div>
					) : (
						<div className='flex'>
							Read more{' '}
							<div className='py-[.1rem]'>
								<ChevronDownIcon dimensions='h-5 w-5' />
							</div>
						</div>
					)}
				</button>
				<div className='flex justify-between items-center'>
					<div className='flex justify-start items-start py-3 rounded-lg divide-x divide-gray-600 gap-4'>
						<div className='font-medium'>{review.user.name.split(' ')[0]}</div>
						<div className='px-4'>{review.createdAt.split('T')[0]}</div>
					</div>
					{userId === review.user._id ? (
						<button
							className='font-medium text-sm border-[.2px] px-2 py-1 h-fit rounded-md bg-[#151d3a] border-purple-500'
							onClick={() => editReviewHandler(review)}>
							Edit
						</button>
					) : (
						<div className='flex gap-4 xl:gap-6'>
							<div className='flex gap-1 xl:gap-2'>
								<button onClick={() => likeReviewHandler(review._id)}>
									<LikeIcon color={likedReview ? '#8C6AFF' : '#999999'} />
								</button>
								<p className='font-medium'>{totalLikes}</p>
							</div>
							<div className='cursor-pointer'>
								<EllipsisIcon dimensions='h-6 w-6' />
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default ReviewCard

/* {user?.image ? (
					<Image
						src={process.env.USERS_URL + user?.image}
						alt={title}
						height={80}
						width={80}
						className='object-contain rounded-lg w-32 h-32 p-1'
					/>
				) : (
					<AccountIcon dimensions='h-10 w-10' />
)} */
