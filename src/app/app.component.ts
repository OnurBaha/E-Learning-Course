import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

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
}
