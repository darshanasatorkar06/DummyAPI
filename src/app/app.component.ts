import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from './api.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Dummy_Api';

  userData=[]
  
  displayedColumns: string[] = ['title', 'firstName', 'lastName', 'picture' ,'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private service:ApiService,public dialog: MatDialog) { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit():void{
    this.getAll();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openDialog() {
    this.dialog.open(DialogComponent, {
     width:"30%",
    })
    .afterClosed().subscribe(val=>{
      if(val === 'submit'){
        this.getAll()
      }
    })
  }


 getAll(){
  this.service.getUser().subscribe((result)=>{
    // console.log(result)
    if(!result){
      return;
    }
this.dataSource = new MatTableDataSource(result.data);
this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
 }

 onEdit(row:any){
  this.dialog.open(DialogComponent,{
    width:'30%',
    data:row
  })
  .afterClosed().subscribe(val=>{
    if(val==='updated'){
      this.getAll()
    }
  })

 }

onDelete(id:number){
  this.service.deleteUser(id)
  .subscribe({
    next:(res)=>{
      alert("Data deleted successfully")
      this.getAll()
    },
    error:()=>{
      alert("Error while deleting the data")
    }
  })
}


list:any=[]

addTask(item:any)
{
  this.list.push({id:this.list.length,name:item})
console.log('New Task',this.list)
}

remove(i:any){
 this.list.splice(i,1)
console.log("deleted",i)
}
}



