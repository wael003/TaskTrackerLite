import axios from "axios";
const serverUrl = 'http://localhost:4000';

export const api = axios.create({
    baseURL : `${serverUrl}/api`,
    headers : {
        "Content-Type": "application/json"
    }
})

export const dateFormater = date=>{
    return new Intl.DateTimeFormat('en',{year : 'numeric' , month : 'short' , day : '2-digit', hour: 'numeric' ,minute:'numeric'}).format(new Date(date))
}