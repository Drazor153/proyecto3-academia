export default function Loading() {
	return (
		<img
			src='/images/loading.png'
			alt='loading-logo'
			width={200}
			height={200}
			style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
			}}
		/>
	);
}
