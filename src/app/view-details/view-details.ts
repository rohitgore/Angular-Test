import { Component, OnInit } from '@angular/core';
import { HttpCalls } from '../http-calls';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-details',
  imports: [CommonModule],
  templateUrl: './view-details.html',
  styleUrl: './view-details.css'
})
export class ViewDetails implements OnInit {
  rowData: any;

  constructor(private api: HttpCalls, private router: Router) {}

  backToHome() {
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    // Retrieve the row data passed from the Home component
    this.rowData = this.api.viewDetails;
    console.log('Row Data:', this.rowData);
  }

}
