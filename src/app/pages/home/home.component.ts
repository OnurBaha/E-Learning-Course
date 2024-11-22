import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { IApiResponse, Icourse, Icoursevideos, Video } from '../../model/master.model';
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

  getCourseVideos(courseId:number){
    this.masterSrv.getCourseVideosbyCourseId(courseId).subscribe((res:IApiResponse)=>{
      this.courseVideos  = res.data
    }, error=>{
      
    })
  }

}
