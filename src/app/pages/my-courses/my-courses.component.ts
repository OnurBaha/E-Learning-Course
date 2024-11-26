import { Component, inject, Inject, OnInit } from '@angular/core';
import { IApiResponse, Icourse, ICourseWithVideos, IEnrollmentCourse, User } from '../../model/master.model';
import { MasterService } from '../../services/master.service';
import { SlicePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [SlicePipe],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit {


  masterSrv = inject(MasterService)
  loggedUserData: User = new User();
  courseList: IEnrollmentCourse[] = [];
  router = inject(Router)


  ngOnInit(): void {
    this.getEnrollmentByUserId()
  }

  navigatingToCourse(id: number) {
    this.router.navigate(['coursedetail', id])
  }

  getEnrollmentByUserId() {
    this.masterSrv.getEnrolledCourseByUserId(this.loggedUserData.userId).subscribe((res: IApiResponse) => {
      this.courseList = res.data;
    })
  }

}
