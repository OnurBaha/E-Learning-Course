import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { IApiResponse, Icourse, Icoursevideos, Video } from '../../model/master.model';
import { NgFor, NgIf, SlicePipe } from '@angular/common';

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
  courseVideos : Video[] = []
  errorMessage: string = '';

  @ViewChild('courseModal') modal:ElementRef|undefined;

  openModal(courseId:number){
    event?.preventDefault();
    if(this.modal){
      this.modal.nativeElement.style.display = 'block'
      this.getCourseVideos(courseId)
    }
  }
  closeModal(){
    if(this.modal){
      this.modal.nativeElement.style.display = 'none'
    }
  }

  ngOnInit(): void {
    this.loadCourses();
  }


  loadCourses(){
    this.masterSrv.getAllCourse().subscribe((res:IApiResponse)=>{
      this.courseList.set(res.data)
    }, error=>{

    })
  }

  getCourseVideos(courseId: number) {
    this.masterSrv.getCourseVideosbyCourseId(courseId).subscribe((res: IApiResponse) => {
      if (res.data && res.data.length > 0) {
        this.courseVideos = res.data;
      } else {
        this.errorMessage = 'No videos found for this course.';
        this.courseVideos = [];  // Boş bir diziyle resetliyoruz
      }
    }, error => {
      this.errorMessage = 'Failed to load videos.';
      this.courseVideos = [];  // Hata durumunda da boş bir dizi
      console.error(error);
    });
  }
  
  

}
