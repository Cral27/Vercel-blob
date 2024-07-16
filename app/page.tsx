'use client';
 
import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import { useState, useRef } from 'react';
 
export default function AvatarUploadPage() {
	const inputFileRef = useRef<HTMLInputElement>(null);
	const [blob, setBlob] = useState<PutBlobResult | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	// const handleFileChange = () => {
	// 	if(inputFileRef.current?.files){
	// 		const file = inputFileRef.current.files[0]
	// 		const reader = new FileReader()
	// 		reader.onloadend = () => {
	// 			setPreviewUrl(reader.result as string)
	// 		}
	// 		reader.readAsDataURL(file)
	// 	}
	// }

	const handleFileChange = () => {
		console.log('File input changed');
		if (inputFileRef.current?.files) {
		  const file = inputFileRef.current.files[0];
		  console.log('Selected file:', file);
		  const reader = new FileReader();
		  reader.onloadend = () => {
			console.log('FileReader result:', reader.result);
			setPreviewUrl(reader.result as string);
		  };
		  reader.readAsDataURL(file);
		}
	  };

	return (
		<>
			<h1>Upload Your Avatar</h1>
		
			<form
				onSubmit={async (event) => {
				event.preventDefault();
		
				if (!inputFileRef.current?.files) {
					throw new Error('No file selected');
				}
		
				const file = inputFileRef.current.files[0];
		
				const newBlob = await upload(file.name, file, {
					access: 'public',
					handleUploadUrl: '/api/avatar/upload',
				});
		
				setBlob(newBlob);
				}}
			>
				<input name="file" ref={inputFileRef} type="file" onChange={handleFileChange} required />
				<button type="submit" className='bg-slate-400 p-2'>Upload</button>
			</form>
			{previewUrl && (
				<div>
					<img src={previewUrl} alt="Image Preview" className='w-40 h-40'/>
					
				</div>
			)}
			{blob && (
				<div>
				Blob url: <a href={blob.url}>{blob.url}</a>
				</div>
			)}
			<h1>Should have updated in vercel App</h1>
		</>
	);
}