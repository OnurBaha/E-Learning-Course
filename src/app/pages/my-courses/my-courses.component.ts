import { Component, inject, Inject, OnInit } from '@angular/core';
import { IApiResponse, Icourse, IEnrollmentCourse, User } from '../../model/master.model';
import { MasterService } from '../../services/master.service';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [SlicePipe],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit{


  masterSrv = inject(MasterService)
  loggedUserData: User = new User();
  courseList:IEnrollmentCourse[] =[]; 
  
  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const localData = localStorage.getItem('learningUser');
      if (localData != null) {
        const parsedData = JSON.parse(localData);
        this.loggedUserData = parsedData;
      }
    }
  }

  ngOnInit(): void {
    this.getEnrollmentByUserId()
  }

  getEnrollmentByUserId(){
    this.masterSrv.getEnrolledCourseByUserId(this.loggedUserData.userId).subscribe((res:IApiResponse)=>{
      this.courseList = res.data;
    })
  }
}
