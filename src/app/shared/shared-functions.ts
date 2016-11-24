import { URLSearchParams } from '@angular/http';

export function urlEncode(obj: Object) {
	let urlSearchParams = new URLSearchParams();
	for (let key in obj) {
		obj[key] = obj[key] == null ? '' : obj[key];
		console.log(obj[key])
		urlSearchParams.append(key, obj[key]);
	}
	return urlSearchParams.toString();
}

export function bodauTiengViet(str: string): string {
	console.log(str)
	if(str){
		str = str.toLowerCase();
		str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
		str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
		str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
		str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
		str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
		str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
		str = str.replace(/đ/g, "d");
	}
	return str;
}