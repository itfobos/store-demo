import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface GithubRepo {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class GithubReposService {

  constructor(private readonly httpClient: HttpClient) {
  }

  listReposFor(username: string): Observable<GithubRepo[]> {
    return this.httpClient.get(
      `https://api.github.com/users/${username}/repos`,
      {headers: {Accept: 'application/vnd.github.inertia-preview+json'}}
    ) as Observable<GithubRepo[]>;
  }
}
