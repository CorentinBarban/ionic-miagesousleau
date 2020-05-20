import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Cookie} from 'ng2-cookies';
import {Observable} from 'rxjs';
import {map, filter, switchMap} from 'rxjs/operators';
import {MenuController} from "@ionic/angular";


@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(
        private router: Router,
        private http: HttpClient,
        private menu: MenuController) {
    }

    obtainAccessToken(loginData) {
        // tslint:disable-next-line:max-line-length
        const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8').set('Authorization', 'Basic ' + btoa('mslPassword:secret')),
            // tslint:disable-next-line:max-line-length
            dataParams = 'client_id=mslPassword&client_secret=secret&password=' + loginData.password + '&username=' + loginData.username + '&grant_type=password' + '&scope=read%20write';
        this.http.post('http://localhost:9001/oauth/token', dataParams, {headers: myheader})
            .pipe(map((res: any) => {
                    this.saveToken(res);
                    console.log(res);
                },
                err => alert('Invalid Credentials')
            )).subscribe();
    }


    saveToken(token) {
        const expireDate = new Date().getTime() + (1000 * token.expires_in);
        Cookie.set('access_token', token.access_token, expireDate);
        console.log('Obtained Access token');
        this.menu.enable(true);
        this.router.navigate(['/inscription-cours']);
    }

    // getResource(resourceUrl): Observable<Foo> {
    //     const headers = new Headers({
    //         'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    //         'Authorization': 'Bearer ' + Cookie.get('access_token')
    //     });
    //     const options = new RequestOptions({headers});
    //     return this.http.get(resourceUrl, options)
    //         .map((res: Response) => res.json())
    //         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    // }

    checkCredentials() {
        if (!Cookie.check('access_token')) {
            this.router.navigate(['/login-page']);
            this.menu.enable(false);

        }
    }

    logout() {
        Cookie.delete('access_token');
        this.router.navigate(['/login-page']);
    }
}
