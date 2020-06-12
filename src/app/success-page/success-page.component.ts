import { Component, OnInit } from '@angular/core';
import { FieldsService } from '../fields-service.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.css']
})
export class SuccessPageComponent implements OnInit {

  constructor(private FieldsList: FieldsService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn();
  }

  isLoggedIn(): boolean {
    const userDetails = localStorage.getItem('token');
    if (userDetails) {
        return true;
    } else {
      this.router.navigateByUrl('/verify');
      return false;
    }
  }

}
