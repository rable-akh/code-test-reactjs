import moment from 'moment'

export function checkPermit(action, status, id) {
    let userData = localStorage.getItem("userdata");
    userData = JSON.parse(userData);
    if(userData?.role==='admin') {
        return false;
    } else if(userData?.role==='staff') {
        if(action==='edit' && (status==='pending' || status==='review') && id===userData?._id){
            return true;
        }
        return false;
    } else if(userData?.role==='supervisor') {
        if(action==='status' && (status==='pending' || status==='review')){
            return true;
        }
        return false;
    } else if(userData?.role==='leader') {
        if(action==='status' && (status==='pending' || status==='review' || status==='approved' || status==='passed')){
            return true;
        }
        return false;
    } else {
        return false;
    } 
}

export function ucfirst(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function dateFormat(date, format="") {
    let fText = 'MMMM Do YYYY, h:mm:ss a';
    if(format==="full"){
        fText = 'MMMM Do YYYY, h:mm:ss a';
    } else if(format==="date"){
        fText = 'MMMM Do YYYY';
    } else if(format==="fhour"){
        fText = 'h:mm:ss a';
    } else if(format==="hour"){
        fText = 'h:mm';
    } else {
        fText = format;
    }
    return moment(date).format(fText);
}