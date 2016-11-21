import { URLSearchParams } from '@angular/http';

export function urlEncode(obj: Object){
	let urlSearchParams = new URLSearchParams();
	for (let key in obj) {
		urlSearchParams.append(key, obj[key]);
	}
	return urlSearchParams.toString();
}