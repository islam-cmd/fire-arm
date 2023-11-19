import {Buffer } from 'buffer';

export async function getImageLabel(base64_string) {

	let img = Buffer.from(base64_string.base64 , 'base64');

	const raw = JSON.stringify(img);

	let myHeaders =   {
    'EndpointName':  'jumpstart-ftc-image-classification' ,
    'ContentType':  'application/x-image' ,
    'Content-Type': 'application/json' ,
    'Connection':  'keep-alive' ,
    'Accept':  '*/*' 
	}

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};

	return fetch('the link to the machine learning model for image calssification ', requestOptions)
		.then(response => response.text())
		.then(result => { return result})
		.catch(error => console.log('error', error));
}
