import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-edit-grid',
  templateUrl: './edit-grid.component.html',
  styleUrls: ['./edit-grid.component.css']
})
export class EditGridComponent implements OnInit {
  
  Arr = Array;
  @Input() kurtosis: number;
  @Input() label_x: number;
  @Input() range_y: number;
  // @Input() kurtosis: Array;
  @Output() status = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {
  }

}
