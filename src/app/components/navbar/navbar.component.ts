import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private userService: UsersService) {
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.userService.updateSearchTerm(inputElement.value.trim().toLowerCase());
  }
}
