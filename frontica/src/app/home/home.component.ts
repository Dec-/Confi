import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Conference } from './Conference';
import { CheckInDialogComponent } from '../check-in-dialog/check-in-dialog.component';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }]
})
export class HomeComponent implements OnInit {
  conferenceList: Observable<Conference>;
  constructor(
    public dialog: MatDialog,
    public httpClient: HttpClient,
    private sharedService: SharedService
  ) { }
  ngOnInit() {
    this.conferenceList = this.httpClient.get<Conference>('http://localhost:3000/api/conferences')
  }

  openDialog(conference: Conference): void {
    const dialogRef = this.dialog.open(CheckInDialogComponent, {
      width: '90%',
      data: conference
    });
  }
}
