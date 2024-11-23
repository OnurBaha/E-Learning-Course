import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { IApiResponse, User } from './model/master.model';
import { MasterService } from './services/master.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  userRegisterObj : User = new User();
  masterSrv = inject(MasterService)

  isLoginFormVisiable : boolean = true;
  toggleForm(val:boolean){
    this.isLoginFormVisiable = val;
  }

  openModal(){
    event?.preventDefault();
    const modal = document.getElementById('myModal');
    if(modal){
      modal.style.display = 'block';
    }
  } 

  closeModal(){
    const modal = document.getElementById('myModal');
    if(modal){
      modal.style.display = 'none';
    }
  }

  onRegister(){
    this.masterSrv.addNewUser(this.userRegisterObj).subscribe((res:IApiResponse)=>{
      if(res.result){
        alert("User Registered")
        this.closeModal();
      } else {
        alert(res.message)
      }
    })
  }
}
