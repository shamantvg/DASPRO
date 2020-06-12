import { Component, OnInit } from '@angular/core';
import { FieldsService } from '../fields-service.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as $ from "jquery";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(private FieldsList: FieldsService, private router: Router, private routerActive: ActivatedRoute) { }

  error: string = null;
  jsonData: any = [];
  search_report_name : string = "";

  inventory: any = [
    { name: 'apples', quantity: 2 },
    { name: 'bananas', quantity: 0 },
    { name: 'cherries', quantity: 5 }
  ];

  adminLogin(form: NgForm) {


    this.error = null;


    let adminId = $("#adminId").val();
    if ((adminId !== "")) {
      var res = this.jsonData.find(e => e.email === adminId);

      if (res) {
        //console.log("Res---->" +JSON.stringify(res) );
        var res_rname = this.jsonData.find(e => e.email === adminId && e.report_name === this.search_report_name);
        if (res_rname) {
          //console.log("email & reportname");
          var res_approved = this.jsonData.find(e => e.email === adminId && e.req_approved === "1" && e.report_name === this.search_report_name);
          if (res_approved) {
            //console.log("all ok");
            var token = "mytoken";
            localStorage.setItem('token', token);
            this.router.navigateByUrl('/success');
          } else {
            this.removeMyTokenVal();
            this.showMessage("success", "Your access request is pending , We will send you an email notification.");
          }

        } else {
          this.removeMyTokenVal();
          //console.log("email ok ,but reportname not ok");
          this.showMessage("success", "Request Submitted,We will let you know once the access is provided.");
        }
      } else {
        // console.log("Email Id not exists---->" );
      //   this.jsonData.push({
      //     "email":"shamantvg@gmail.com",
      //     "report_name":"Open Sales Orders",
      //     "req_raised":"1",
      //     "req_approved":"0",
      //     "req_rised_date":"09-06-2020",
      //     "req_approved_date":""
      //  });
      //  console.log("myres--->"+JSON.stringify(this.jsonData));
      this.removeMyTokenVal();
        this.showMessage("success", "Request Submitted,We will let you know once the access is provided.");
      }
      //var res = this.inventory.find(e => e.name === 'apples'); 

      //console.log("Res---->" +this.jsonData);
      //this.router.navigateByUrl('/success');
      //console.log(form.value);

      //console.log(Assignform.value);

    }
    else {
      this.removeMyTokenVal();
      this.showMessage("error", "Invalid request.");
      //this.error = "Invalid request.";
    }
  }

  ngOnInit() {
    this.removeMyTokenVal();
    this.getMyJon();
    this.getSearchParam(); 
  }

  getMyJon(): any {
    this.FieldsList.getJSON().subscribe((result) => {
      //console.log("error--->getJSON()" + JSON.stringify(result) );
      this.jsonData = result;
      //console.log("return" + this.jsonData );
    }, err => {
      this.showMessage("error", "Something went wrong. Please try later");
      console.log("error--->getJSON() func");
    });
  }

  removeMyTokenVal() : any{
    localStorage.removeItem('token');
  }

  showMessage(iconVal, titleVal) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: iconVal,
      title: titleVal
    })

    this.refreshInput();
  }

  refreshInput() {
    this.removeMyTokenVal();
    $('#adminId').val('');
  }

  getSearchParam(): boolean {
    this.routerActive.paramMap
      .subscribe(params => {
        let searchVal = params.get('searchVal');
        //console.log("searchVal---->"+searchVal);
        this.search_report_name = searchVal;
      });
      return true;
  } 

}
