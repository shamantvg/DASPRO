import { Component, OnInit } from '@angular/core';
import { FieldsService } from '../fields-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
// import * as $ from "jquery";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private FieldsList: FieldsService,private router: Router) { }

  homesearchbasic_tag = null;
  homesearchadvance_tag = null;
  jsonData: any = [];
  Search_res : any = [];

  Holder = "Search and select report metadata";
  keyword = 'name';
  minquerynum = 1;
  notFoundText = "Your search not matching with any reports";
  initialValue = {};
  data = [
    {
      id: 1,
      name: 'Spares Sales Order Booking'
    },
    {
      id: 2,
      name: 'Spares Sales Order Shipments'
    }
    ,
    {
      id: 3,
      name: 'Spares Sales Order Delivery'
    }
    ,
    {
      id: 4,
      name: 'Spares Sales Order Invoice'
    }
    ,
    {
      id: 5,
      name: 'Finance COPA'
    }
    ,
    {
      id: 6,
      name: 'Open Sales Orders'
    }
    ,
    {
      id: 7,
      name: 'Open Service Cases'
    }
    ,
    {
      id: 8,
      name: 'Contract Entitlement'
    },
    {
      id: 9,
      name: 'Contract Bookings'
    },
    {
      id: 10,
      name: 'Purchase Requisition'
    },
    {
      id: 11,
      name: 'Purchase Order Header'
    },
    {
      id: 12,
      name: 'Purchase order Line'
    },
    {
      id: 13,
      name: 'Purchase Order Goods Received'
    },
    {
      id: 14,
      name: 'Sales Quotations'
    },
    {
      id: 15,
      name: 'Sales Opportunities'
    },
    {
      id: 16,
      name: 'Labour Hour Details'
    },
    {
      id: 17,
      name: 'FSS Data'
    }
  ];

  selectEvent(item) {
    // do something with selected item
    //console.log("selectEvent" + item.name);
    this.initialValue = item;
    this.homesearchbasic_tag = null;
    this.homesearchadvance_tag = true;
    var res = this.jsonData.find(e => e.name === item.name);
    //console.log("res--->" + JSON.stringify(res));
    this.Search_res  = Array.of(res);
    
    // $(".autocomplete-container .suggestions-container ul").css("overflow-y", "hidden");
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    //console.log("onChangeSearch");
  }

  onFocused(e) {
    // do something when input is focused
    //console.log("onFocused");
  }

  gotoVerify(name){
    //alert("ok---->"+name);
    this.router.navigateByUrl('/verify/'+name);
  }

  ngOnInit() {
    this.homesearchbasic_tag = true;
    this.removeMyTokenVal();
    this.getSearchDesc();
  }

  removeMyTokenVal(): any {
    localStorage.removeItem('token');
  }

  getSearchDesc(): any {
    this.FieldsList.getSearchDescAPI().subscribe((result) => {
      //console.log("error--->getJSON()" + JSON.stringify(result) );
      this.jsonData = result;
      //console.log("return" + this.jsonData );
    }, err => {
      this.showMessage("error", "Something went wrong. Please try later");
      console.log("error--->getSearchDesc() func");
    });
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

  }

}
