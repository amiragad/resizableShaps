import { Component , HostListener, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit  {
  title = 'bar-code-Task';
  value: string;
  shape :{ shapeName : String ,x : number  ,y: number , px: number ,
     py: number , width: number , height: number , 
     draggingCorner: boolean, draggingWindow: boolean ,isfocase:boolean}
     resizer: Function
   shaps : any ;
  b: number;
  t: number;
  cuurentShapendex: any;
  
  constructor() { 
    this.shaps=[];
    this.CreateDesignArea();
    this.value="abc";
    this.b=1.2;
    this.t=1;
  }
  
  resetValus( startVlue:number ,shapeName){
    let x =startVlue*100;
    let y = startVlue*100;
    let px = 0;
    let py = 0;
    let width = 100;
    let height = 100; 
    let draggingCorner = false;
    let draggingWindow = false;
    let isfocase =false;
    this.shape={shapeName,x , y ,px, py ,width ,height ,draggingCorner,draggingWindow ,isfocase};
    this.shaps.push(this.shape);
  }
  ngOnInit() {
    
  }
  CreateDesignArea(){
    let x =0;
    let y = 0;
    let px = 0;
    let py = 0;
    let width = 1000;
    let height = 400; 
    let draggingCorner = false;
    let draggingWindow = false;
    let isfocase= false;
    let shapeName="DA";
    this.shape={shapeName,x , y ,px, py ,width ,height ,draggingCorner,draggingWindow , isfocase};
    this.shaps.push(this.shape);
  }
  addBarcode() {
    this.b +=0.2;
    this.resetValus(this.b ,"B" );
  }
  addText(){
    this.t +=0.1;
    this.resetValus( this.t ,"T" )
  }
  removeAll(){
   this.shaps=[];
   this.CreateDesignArea();
  }
 
  onWindowPress(event: MouseEvent  ,i ) {
    let j = this.shaps.findIndex(item => item.isfocase == true) ;
    this.shaps[i].isfocase=true;
    if(j>0){
      this.shaps[j].isfocase=false;
    }
    this.shaps[i].draggingWindow = true;
    this.shaps[i].px = event.clientX;
    this.shaps[i].py = event.clientY;
    this.cuurentShapendex=i;
   
    
  }

  onWindowDrag(event: MouseEvent ,i ) {   
     if (!this.shaps[i].draggingWindow) {
        return;
     }
    let offsetX = event.clientX - this.shaps[i].px;
    let offsetY = event.clientY - this.shaps[i].py;
    this.shaps[i].x += offsetX;
    this.shaps[i].y += offsetY;
    this.shaps[i].px = event.clientX;
    this.shaps[i].py = event.clientY;
  }

  topLeftResize(offsetX: number, offsetY: number  ,i ) {
      this.shaps[i].x += offsetX;
      this.shaps[i].y += offsetY;
      
      this.shaps[i].width -= offsetX;
      this.shaps[i].height -= offsetY;
  }

  topRightResize(offsetX: number, offsetY: number ,i ) {
    this.shaps[i].y += offsetY;
    this.shaps[i].width += offsetX;
    this.shaps[i].height -= offsetY;
 
  }

  bottomLeftResize(offsetX: number, offsetY: number ,i ) {
    this.shaps[i].x += offsetX;
    this.shaps[i].width -= offsetX;
    this.shaps[i].height += offsetY;
   
  }

  bottomRightResize(offsetX: number, offsetY: number ,i ) {
    this.shaps[i].width += offsetX;
    this.shaps[i].height += offsetY;

  }

  onCornerClick(event: MouseEvent ,i, resizer?: Function ) {
    this.shaps[i].draggingCorner = true;
    this.shaps[i].px = event.clientX;
    this.shaps[i].py = event.clientY;
    this.cuurentShapendex=i;
  this.resizer = resizer;
  event.preventDefault();
  event.stopPropagation();
  }


  onSave(){
    console.log("Design Area size" );
    console.log( "width =>" ,  this.shaps[0].width ,"height =>" , this.shaps[0].height);
    /**********************/
    if(this.shaps.length > 1){
    for (let x=1 ; x < this.shaps.length;x++ ){
    if(this.shaps[x].shapeName =="B"){
    console.log("Images size and location ");
    console.log("Size : " , "width =>" ,this.shaps[x].width,
     "height =>" , this.shaps[x].height );
     console.log("location: ","top :", this.shaps[x].x ,"left", this.shaps[x].y);
     /*******************/
    }
   
    else if(this.shaps[x].shapeName =="T"){
     console.log("texts text , size and location ");
    console.log("Size : " , "width =>" ,this.shaps[x].width,
     "height =>" , this.shaps[x].height );
     console.log("location: ","top :", this.shaps[x].x ,"left", this.shaps[x].y);
     console.log("text => " ,this.value)
    }
    
  }
}
else console.log("You Didn't use any Shap");
  }

  @HostListener('document:mousemove', ['$event'])
  OnMoveCorner(event: MouseEvent) {
   let i = this.shaps.findIndex(item => item.draggingCorner === true) ;
    if (i == -1 ) {
        return;
    }
   
    let offsetX = event.clientX - this.shaps[this.cuurentShapendex].px;
    let offsetY = event.clientY - this.shaps[this.cuurentShapendex].py;
    this.resizer(offsetX, offsetY, this.cuurentShapendex);
    this.shaps[this.cuurentShapendex].px = event.clientX;
    this.shaps[this.cuurentShapendex].py = event.clientY;

  }
  @HostListener('document:mouseup', ['$event'])
  onCornerRelease(event: MouseEvent) {
    this.shaps.forEach(element => element.draggingWindow =false );
    this.shaps.forEach(element => element.draggingCorner = false);
    this.cuurentShapendex=null;
  }

}


  


