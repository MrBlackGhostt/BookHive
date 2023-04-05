function DialogBox({ setSubmitHandler, setDialogHandler }) {
	return (
		<div className='absolute top-0 left-0 flex items-center justify-center w-screen xl:w-[85.5vw] h-screen z-10 bg-white bg-opacity-75 p-2 xl:p-4'>
			<div className='flex flex-col gap-4 xl:gap-5 w-full md:w-1/2 xl:w-2/5 p-4 md:p-6 rounded-md bg-[#192132]'>
				<h3 className='text-lg xl:text-xl font-bold text-center'>Thanks for reviewing!</h3>
				<p className='font-medium text-gray-200 leading-relaxed'>
					If approved, your review should be posted soon (typically within few minutes)
				</p>
				<div className='flex items-center justify-center w-full'>
					<button
						onClick={() => {
							setDialogHandler(false)
							setSubmitHandler(true)
						}}
						className='btn-confirm'>
						<span className='font-semibold'>OK</span>
					</button>
				</div>
			</div>
		</div>
	)
}

export default DialogBox