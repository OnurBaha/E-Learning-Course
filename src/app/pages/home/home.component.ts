import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { IApiResponse, Icourse } from '../../model/master.model';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SlicePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  masterSrv = inject(MasterService)
  courseList = signal<Icourse[]>([])

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(){
    this.masterSrv.getAllCourse().subscribe((res:IApiResponse)=>{
      this.courseList.set(res.data)
    }, error=>{

    })
  }

}
