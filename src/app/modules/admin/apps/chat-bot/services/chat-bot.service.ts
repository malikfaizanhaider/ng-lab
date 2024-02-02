import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "main";

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public sendMessage(message: string) {
    return this.http.post<any>(`${this.apiUrl}/chat`, { message });
  }
}
