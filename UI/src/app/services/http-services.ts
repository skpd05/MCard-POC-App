import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    url = 'http://localhost:8080/';
    mock_file_Path = './assets/mock.json';
    constructor(private http: HttpClient) {       
    }
    getMockJSON(){
        return this.http.get(this.mock_file_Path);        
    }
    get(path){
        return this.http.get(this.url + path);
    }
    post(path){
        return this.http.post(this.url + path, {});
    }
    put(path){
        return this.http.put(this.url + path, {});
    }
    delete(path){
        return this.http.delete(this.url + path,{});
    }
}