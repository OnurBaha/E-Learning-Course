import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { IApiResponse, ICourseWithVideos, IEnrollmentCourse, User, Video } from '../../model/master.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {

  masterSrv = inject(MasterService)
  loggedUserData: User = new User();
  videoList: Video[] = [];
  router = inject(Router)

  activatedRoute = inject(ActivatedRoute)
  courseId:number=0

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const localData = localStorage.getItem('learningUser');
      if (localData != null) {
        const parsedData = JSON.parse(localData);
        this.loggedUserData = parsedData;
      }
      this.activatedRoute.params.subscribe((res:any)=>{
        this.courseId=res.id;
        this.getVideos();
      })
    }
  }

  getVideos() {
    this.masterSrv.getCourseVideosbyCourseId(this.courseId).subscribe((res: IApiResponse) => {
      this.videoList = res.data;
    })
  }
}
