import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators'

import { Conference } from '../home/Conference';
import { User } from '../home/User';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './check-in-dialog.component.html',
  styleUrls: ['./check-in-dialog.component.css']
})

export class CheckInDialogComponent {
  user = new User();
  constructor(
    public dialogRef: MatDialogRef<CheckInDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Conference, 
    private httpClient: HttpClient,
    @Inject(SharedService) private sharedService: SharedService
  ) { }

  userCheckIn = (user: User) => this.httpClient.post("http://localhost:3000/api/conferences/" + this.data.id + "/book", user)
    .pipe(catchError(error => {
      this.sharedService.openSnackBar("Došlo je do pogreške, probaj kasnije.", "Zatvori")
      this.dialogRef.close()
      console.error(error)
      return error
    }))
    .subscribe(result => { 
      this.sharedService.openSnackBar("Vaš kod za prijavu u konferenciju je: " + result["code"], "Zatvori") 
      this.dialogRef.close()
    })
}