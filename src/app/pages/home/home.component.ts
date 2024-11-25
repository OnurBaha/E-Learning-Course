import { Component, ElementRef, inject, OnInit, signal, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { IApiResponse, Icourse, Icoursevideos, IEnrollment, User, Video } from '../../model/master.model';
import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';  // Import the necessary function

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SlicePipe, NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  masterSrv = inject(MasterService)
  courseList = signal<Icourse[]>([])
  courseVideos: Video[] = []
  errorMessage: string = '';
  loggedUserData: User = new User()

  @ViewChild('courseModal') modal: ElementRef | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  openModal(courseId: number) {
    event?.preventDefault();
    if (this.modal) {
      this.modal.nativeElement.style.display = 'block'
      this.getCourseVideos(courseId)
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.nativeElement.style.display = 'none'
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {  // Check if the platform is browser
      const localData = localStorage.getItem('learningUser');
      if (localData != null) {
        const parsedData = JSON.parse(localData);
        this.loggedUserData = parsedData;
      }
    }
    this.loadCourses();
  }

  loadCourses() {
    this.masterSrv.getAllCourse().subscribe((res: IApiResponse) => {
      this.courseList.set(res.data)
    }, error => {

    })
  }

  onEnroll(courseId: number) {
    if (this.loggedUserData.userId == 0) {
      alert("Please Login First To Enroll")
    } else {
      const enrolObj: IEnrollment = {
        courseId: courseId,
        enrollDate: new Date(),
        enrollmentId: 0,
        userId: this.loggedUserData.userId,
        isCompleted: false
      };
      this.masterSrv.onEnrollment(enrolObj).subscribe((res: IApiResponse) => {
        if (res.result) {
          alert("Enrollment Success");
        } else {
          alert(res.message);
        }
      });
    }
  }


  getCourseVideos(courseId: number) {
    this.masterSrv.getCourseVideosbyCourseId(courseId).subscribe((res: IApiResponse) => {
      if (res.data && res.data.length > 0) {
        this.courseVideos = res.data;
      } else {
        this.errorMessage = 'No videos found for this course.';
        this.courseVideos = [];
      }
    }, error => {
      this.errorMessage = 'Failed to load videos.';
      this.courseVideos = [];
      console.error(error);
    });
  }
}
