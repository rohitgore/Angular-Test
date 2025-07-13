import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { HttpCalls } from '../http-calls';
import { HttpClientModule } from '@angular/common/http';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEye, faEdit, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { CellEditor } from 'primeng/table';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Button, HttpClientModule, TableModule, InputTextModule, FormsModule, ButtonModule, FontAwesomeModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  @ViewChild('dt') dt!: Table;
  isEditing = false;
  users = signal<any[]>([]);
  columns = signal<any[]>([]);
  private api = inject(HttpCalls);
  originalUserMap: Record<string, any> = {};
  constructor(private library: FaIconLibrary, private router: Router) {
  library.addIcons(faEye, faEdit, faCheck,faTimes);
}
  // Fetch data from the API
  fetchData() {
    this.api.getData().subscribe(
      (data) => {
        // this.data = data;
        this.users.set(data);
        const keys = Object.keys(data[0]).filter(key => key !== 'id');
        // this.columns = keys.map(key => ({ field: key, header: key.toUpperCase() }));
        const visibleKeys = keys.filter(key => key !== 'id');
    this.columns.set(
      visibleKeys.map(key => ({ field: key, header: key.toUpperCase() }))
    );
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  onView(row: any) {
    // Handle view logic here
    console.log('View:', row);
    this.api.viewDetails = row; // Store the row data for viewing details
    this.router.navigate(['/view']);
  }

  onEdit(row: any) {
    this.isEditing = true;
    this.originalUserMap[row.id] = { ...row };
    // Handle edit logic here
    
  }

  onApprove(row: any) {
    // Handle approve logic here
    this.isEditing = false;
    console.log('Approve:', row);
  }

  saveUser(editedUser: any, event?: Event) {
  const updatedList = this.users().map(user =>
    user.id === editedUser.id ? { ...editedUser } : user
  );
  this.users.set(updatedList);
}

onSave(user: any, event: Event) {
  const row = (event.currentTarget as HTMLElement)?.closest('tr');
  if (row) {
    this.saveUser(user);
    this.dt.saveRowEdit(user, row);
  } else {
    console.warn('Row element not found');
  }
}

onCancelEdit(row: any) {
  const restored = this.originalUserMap[row.id];
  if (restored) {
    const updated = this.users().map(u =>
      u.id === row.id ? { ...restored } : u
    );
    this.users.set(updated);
  } else {
    console.warn(`No original data found for id ${row.id}`);
  }
  this.dt.cancelRowEdit(row);
}



  ngOnInit(): void {
    this.fetchData();
  }


}
