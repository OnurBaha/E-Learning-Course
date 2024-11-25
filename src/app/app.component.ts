import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IApiResponse, Login, User } from './model/master.model';
import { MasterService } from './services/master.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  userRegisterObj: User = new User();
  loginObj: Login = new Login();
  masterSrv = inject(MasterService);
  loggedUserData: User = new User();
  
  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const localData = localStorage.getItem('learningUser');
      if (localData != null) {
        const parsedData = JSON.parse(localData);
        this.loggedUserData = parsedData;
      }
    }
  }

  isLoginFormVisiable: boolean = true;
  toggleForm(val: boolean) {
    this.isLoginFormVisiable = val;
  }

  openModal() {
    event?.preventDefault();
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  onRegister() {
    this.masterSrv.addNewUser(this.userRegisterObj).subscribe((res: IApiResponse) => {
      if (res.result) {
        alert("User Registered");
        this.closeModal();
      } else {
        alert(res.message);
      }
    });
  }

  onLogin() {
    this.masterSrv.onLogin(this.loginObj).subscribe((res: IApiResponse) => {
      if (res.result) {
        alert("User Logged Success");
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('learningUser', JSON.stringify(res.data));
        }
        this.loggedUserData = res.data;
        this.closeModal();
      } else {
        alert(res.message);
      }
    });
  }

  onlogoff() {
    this.loggedUserData = new User();
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('learningUser');
    }
  }
}
