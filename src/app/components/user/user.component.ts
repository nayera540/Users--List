import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../user';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, NgxSkeletonLoaderModule ,MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'username',
    'email',
    'phone',
    'website',
  ];
  dataSource = new MatTableDataSource<User>([]);
  clickedRows = new Set<User>();
  isLoading!: boolean;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }
  constructor(
    private userService: UsersService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
      this.dataSource.data = this.users;
      this.isLoading = false;
    });

    this.userService.searchTerm$.subscribe((term) => {
      this.applyFilter(term);
      console.log(term);
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: User, filter: string) => {
      return (
        data.name.toLowerCase().includes(filter) ||
        data.username.toLowerCase().includes(filter)
      );
    };

    this.dataSource.filter = filterValue;
  }

  onUserClick(row: User): void{
    this.router.navigate(['/user', row.id]);
  }
}
