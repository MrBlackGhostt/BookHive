import Head from 'next/head'
import { Fragment } from 'react'

function LoginPage(props) {
	const router = useRouter()
	return (
		<Fragment>
			<Head>
				<title>Login</title>
				<meta name='description' content='Login section' />
			</Head>
		</Fragment>
	)
}

export default LoginPage
