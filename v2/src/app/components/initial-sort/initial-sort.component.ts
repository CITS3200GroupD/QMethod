import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initial-sort',
  templateUrl: './initial-sort.component.html',
  styleUrls: ['./initial-sort.component.css']
})
export class InitialSortComponent implements OnInit {

  statements = [
    {id: 1, statement: 'statement 1'},
    {id: 2, statement: 'statement 2'},
    {id: 3, statement: 'statement 3'}
  ];

  disagree = [];
  neutral = [];
  agree = [];


  onDisagreeDrop(e: any) {
    this.disagree.push(e.dragData);
  }

  onNeutralDrop(e: any) {
    this.neutral.push(e.dragData);
  }

  onAgreeDrop(e: any) {
    this.agree.push(e.dragData);
  }

  // not done: statement does not dissapear after dropping
  /*removeItem(e: any) {
    if (this.statements.indexOf(e.id) > -1) {
      var index = this.statements.indexOf(e.id);
      this.statements.splice(index, 1);
      console.log("statement " + index);
    }

      var index = this.disagree.indexOf(e.statement);
      this.disagree.splice(index, 1);
      console.log("disagree " + e.id);
      console.log(index);
  }*/

  constructor() { }

  ngOnInit() {
  }

}
