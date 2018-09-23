import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  private TEMP_response: [ "20", "Australian", "Male", "English", "Chinese" ];

  constructor( private route: ActivatedRoute,
    private router: Router,
    private userservice: UserService
    ) { }

  addUser(registration_info) {
    this.route.params.subscribe(params => {
      this.userservice.addUser(params['id'], registration_info)
    });
  }

  ngOnInit() {
  }

}
