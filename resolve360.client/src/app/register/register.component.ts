import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) { }

  onSubmit() {
    this.http.post('http://localhost:5000/api/user/register', this.user)
      .subscribe(response => {
        console.log('User registered successfully', response);
      }, error => {
        console.error('Error registering user', error);
      });
  }
}
