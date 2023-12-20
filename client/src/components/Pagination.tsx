interface PaginationProps {
	totalItems: number;
	itemsPerPage: number;
}

function Pagination({ totalItems, itemsPerPage }: PaginationProps) {
	const pages = [];

	for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
		pages.push(i);
	}

	return (
		<div className='pagination'>
			{pages.map(page => (
				<button
					key={page}
					className='button '
				>
					{page}
				</button>
			))}
		</div>
	);
}

export default Pagination;
