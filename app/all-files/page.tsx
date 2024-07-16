import {list} from '@vercel/blob'
import DeleteFunction from './delete-button'

export default async function AllFilesPage(){
	const {blobs} = await list()
	console.log({ blobs })

	return(
		<main>
			<div>
				{blobs.map((blob) => (
					<div key={blob.url}>
						{blob.pathname} - <DeleteFunction url={blob.url} />
						<img src={blob.url} alt="" />
					</div>
				))}
			</div>
			<h1>banana</h1>
		</main>
	)
}
