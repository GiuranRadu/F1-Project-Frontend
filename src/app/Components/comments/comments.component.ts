import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/Services/auth.service';
import { CircuitsService } from 'src/app/Services/circuits.service';
import { CommentsService } from 'src/app/Services/comments.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  commentForm: FormGroup;
  loggedUser: any;
  allDbCircuits: any = [];
  token: any;
  myComments: any = [];
  isTrashOpen: boolean = false; //! false = closed

  constructor(private cookies: CookieService, private AS: AuthService, private CS: CircuitsService, private commService: CommentsService, private datePipe: DatePipe, public dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      circuitId: new FormControl(''),
      info: new FormControl(''),
    });

    this.token = this.cookies.get("token");

    this.getLoggedUserDetails();

    this.CS.getAllCircuits(this.token).subscribe((result) => {
      this.allDbCircuits = result.data.circuits
    })

    this.refreshComments();
  }

  getLoggedUserDetails() {
    const userDataString = this.cookies.get('loggedUser');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.loggedUser = userData;
    } else {
      console.log('No users logged');
    }
  }

  addComment() {
    const creatorId = this.loggedUser._id;
    const commentToAdd = { ...this.commentForm.value, creatorName: this.loggedUser.name };
    this.commService.createComment(creatorId, commentToAdd, this.token).subscribe((data) => {
      console.log('Comment Added');
      //! AICI TREBUIE SPINNER
      this.showSpinner(1500);
      this.resetForm()
      this.refreshComments()
    }, (error) => {
      console.log(error);
    })
    console.log(commentToAdd);
  }

  refreshComments() {
    if (this.loggedUser.role === 'limited') {
      this.commService.getMyComments(this.loggedUser._id, this.token).subscribe((result) => {
        this.myComments = result['data']['comments'].sort((b, a) => a.createdAt.localeCompare(b.createdAt));
      });
    } else if (this.loggedUser.role === 'full') {
      this.commService.getAllCommentsIfAdmin(this.token).subscribe((result2) => {
        this.myComments = result2['data']['comments'].sort((b, a) => a.createdAt.localeCompare(b.createdAt));
      })
    }
  }

  resetForm() {
    this.commentForm.reset()
  }

  findCircuitName(circuitId: any): string | undefined {
    const foundCircuit = this.allDbCircuits.find((circuit: any) => circuitId === circuit._id);
    return foundCircuit ? foundCircuit.name : undefined;
  }

  test() {
    console.log(this.myComments);
  }

  @ViewChild('openTrashButton') openTrashButton: ElementRef

  openTrash() {
    if (this.isTrashOpen === false) {
      this.isTrashOpen = true;
      this.openTrashButton.nativeElement.innerHTML = "CLOSE TRASH"
    } else {
      this.isTrashOpen = false;
      this.openTrashButton.nativeElement.innerHTML = "OPEN TRASH"

    }
  }

  calculateRelativeTime(dateString: string): string {
    const commentDate = new Date(dateString);
    const now = new Date();

    const differenceInSeconds = Math.floor((now.getTime() - commentDate.getTime()) / 1000);

    if (differenceInSeconds < 60) {
      const seconds = Math.floor(differenceInSeconds);
      return `just now`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(differenceInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  }
 
  deleteComment(id: any) {
    if (this.isTrashOpen) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'Confirmation',
          message: `Delete this comment? `
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.commService.deleteComment(id, this.token).subscribe((response) => {
            console.log('Deleted Comment');
            this.showSpinner(1500);
            this.refreshComments();
          })
        } else {
          console.log("Not confirmed");
        }
      })
    }
  }

  isEditingComment: boolean = false;
  commentToEdit: any;
  editComment(comment: any) {
    this.isEditingComment = true;
    this.commentToEdit = comment;
    this.commentForm.patchValue(comment);
    this.commentForm.get('circuitId').disable();
    console.log(this.commentToEdit);
  }

  updateComment() {
    this.commService.editComment(this.commentToEdit._id, this.commentForm.value, this.token).subscribe((response) => {
      this.isEditingComment = false;
      this.refreshComments();
      this.showSpinner(1500);
      this.resetForm();
      this.commentForm.get('circuitId').enable();
      console.log('Comment updated');
    });
    console.log(this.commentForm.get('info').value);
  }


  showSpinner(time:any) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();   
    }, time)  
  }




}

