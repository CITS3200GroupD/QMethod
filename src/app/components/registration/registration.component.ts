import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  TEMP_response = [ '20', 'Australian', 'Male', 'English', 'Chinese' ];
  survey_id: string;

  constructor( private route: ActivatedRoute,
    private router: Router,
    private userservice: UserService
    ) {
      this.route.params.subscribe( params => {
        this.survey_id = params['id'];
      });
    }

  addUser(registration_info) {
    this.route.params.subscribe(params => {
      this.userservice.addUser(params['id'], registration_info);
      console.log(params['id']);
      console.log(registration_info);
      console.log('user data sent');
    });
  }

  ngOnInit() {
  }

}
