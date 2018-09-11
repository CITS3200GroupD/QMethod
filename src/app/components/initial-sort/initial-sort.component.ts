import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initial-sort',
  templateUrl: './initial-sort-new.component.html',
  // templateUrl: './initial-sort.component.html',
  styleUrls: ['./initial-sort-new.component.css']
  // styleUrls: ['./initial-sort.component.css']
})
export class InitialSortComponent implements OnInit {

  statements = [
    {statement: 'I can see myself fostering understanding between Australia and yyy'},
    {statement: 'I can see myself enjoying recreational activities with yyy people'},
    {statement: 'I can see myself speaking yyy better than many other Australians'},
    {statement: 'I can see myself studying in yyy'},
    {statement: 'I can see myself taking the WACE exam in yyy'},
    {statement: 'I can see myself as a more knowledgeable person'},
    {statement: 'I can see myself able to better understand people from any other culture'},
  ];

  disagree = [];
  neutral = [];
  agree = [];

  onDisagreeDrop(e: any) {
    console.log(e);
    this.removeDisagree(e.dragData);   // Fix for bug
    this.disagree.push(e.dragData);
    this.removeStatement(e.dragData);
    this.removeNeutral(e.dragData);
    this.removeAgree(e.dragData);
  }

  onNeutralDrop(e: any) {
    this.removeNeutral(e.dragData);   // Fix for bug
    this.neutral.push(e.dragData);
    this.removeStatement(e.dragData);
    this.removeDisagree(e.dragData);
    this.removeAgree(e.dragData);
  }

  onAgreeDrop(e: any) {
    this.removeAgree(e.dragData);   // Fix for bug
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
