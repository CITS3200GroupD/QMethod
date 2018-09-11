import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {

  id: String;

  constructor(private route: ActivatedRoute,
    private router: Router) { 
      this.route.params.subscribe(params => {
        this.id = params['id']
      });
    }

  ngOnInit() {
  }

}
