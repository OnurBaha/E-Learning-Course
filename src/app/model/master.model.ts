export interface IApiResponse {
    message: string,
    result: boolean,
    data: any
}

export class Video {
    videoId: number
    videoUrl: string
    videoTitle: string
    videoDescription: string
    videoThumbnail: string
    totalDuration: string

    constructor() {
        this.videoId = 0;
        this.videoUrl = "";
        this.videoTitle = "";
        this.videoDescription = "";
        this.videoThumbnail = "";
        this.totalDuration = "";
    }
}


export interface Icourse {
    courseId: number,
    courseName: string,
    createdDate: string,
    totalHours: string,
    totalVideos: number,
    courseDescription: string,
    thumbnailUrl: string
}

export interface ICourseWithVideos {
    courseId: number,
    courseName: string,
    createdDate: string,
    totalHours: string,
    totalVideos: number,
    courseDescription: string,
    lmsCourseVideos: {
        courseVideoId: number,
        courseId: number,
        videoId: number
    }
}

export interface Icoursevideos {
    courseVideoId: number,
    courseName: string,
    courseId: number,
    videoTitle: string,
    videoId: number,
    videoUrl: string
}

export class Login{
    userName: string
    password:string 
    constructor(){
        this.userName ='';
        this.password='';
    }
}

export class User{
    userId:number
    userName:string
    emailId:string
    fullName:string
    role: string
    createdDate:Date
    password:string
    projectName:string
    refreshToken:string
    refreshTokenExpiryTime:string

    constructor(){
        this.createdDate =new Date();
        this.emailId = '';
        this.fullName = '';
        this.password = '';
        this.projectName = '';
        this.refreshToken= '';
        this.refreshTokenExpiryTime='';
        this.role='';
        this.userId = 0;
        this.userName='';
    }
}

export class IEnrollment{
    enrollmentId:number
    userId:number
    courseId:number
    enrollDate:Date
    isCompleted:boolean
    constructor(){
        this.enrollmentId =0;
        this.courseId=0;
        this.enrollDate=new Date();
        this.isCompleted=false;
        this.userId = 0;
    }
}