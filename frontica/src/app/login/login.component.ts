import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LoginData } from './LoginData';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginData = new LoginData()
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService
    ) { }

  ngOnInit() {
  }
  logIn = (loginData: LoginData) => this.httpClient.post("http://localhost:3000/api/login", loginData)
      .pipe(catchError( error => {
          this.sharedService.openSnackBar("Došlo je do pogreške, probaj kasnije.", "Zatvori")
          console.error(error)
          return of(error)
        })
      )
      .subscribe(result => {this.sharedService.openSnackBar("Vaš JWT je: " + result["jwt"], "Zatvori")
    })
}
