import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initial-sort',
  templateUrl: './initial-sort.component.html',
  styleUrls: ['./initial-sort.component.css']
})
export class InitialSortComponent implements OnInit {

  statements = [
    {statement: 'statement 1'},
    {statement: 'statement 2'},
    {statement: 'statement 3'},
    {statement: 'statement 4'},
    {statement: 'statement 5'},
    {statement: 'statement 6'},
    {statement: 'statement 7'},
  ];

  disagree = [];
  neutral = [];
  agree = [];

  onDisagreeDrop(e: any) {
    this.disagree.push(e.dragData);
    this.removeStatement(e.dragData);
    this.removeNeutral(e.dragData);
    this.removeAgree(e.dragData);
  }

  onNeutralDrop(e: any) {
    this.neutral.push(e.dragData);
    this.removeStatement(e.dragData);
    this.removeDisagree(e.dragData);
    this.removeAgree(e.dragData);
  }

  onAgreeDrop(e: any) {
    this.agree.push(e.dragData);
    this.removeStatement(e.dragData);
    this.removeDisagree(e.dragData);
    this.removeNeutral(e.dragData);
  }

  removeStatement(e: any) {
      this.statements.forEach( (item, index) => {
        if (item.statement == e.statement) this.statements.splice(index, 1);
      });
  }

  removeDisagree(e: any) {
    this.disagree.forEach( (item, index) => {
      if (item.statement == e.statement) this.disagree.splice(index, 1);
    });
  }

  removeNeutral(e: any) {
    this.neutral.forEach( (item, index) => {
      if (item.statement == e.statement) this.neutral.splice(index, 1);
    });
  }

  removeAgree(e: any) {
    this.agree.forEach( (item, index) => {
      if (item.statement == e.statement) this.agree.splice(index, 1);
    });
  }

  constructor() { }

  ngOnInit() {
  }

}
