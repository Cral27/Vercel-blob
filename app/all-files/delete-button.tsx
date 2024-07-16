'use client'

import { useRouter } from "next/navigation";

type Props = {
	url: string;
}

export default function DeleteFunction({ url }: Props){
	const router = useRouter()
	return(
		<>
			<button onClick={async () => {
				//delete api
				await fetch(`/api/avatar/upload`, {
					method: 'DELETE',
					body: JSON.stringify({
						url,
					}),
				});
				router.refresh()
			}}>
				Deletus
			</button>
		</>
	)
}