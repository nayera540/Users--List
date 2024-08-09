import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  user!: User;

  constructor(private route: ActivatedRoute, private userService: UsersService) {
  }

  ngOnInit(): void {
      const userId = Number(this.route.snapshot.paramMap.get('id'));
      this.userService.getUserById(userId).subscribe((user) => this.user = user);
  }
}
