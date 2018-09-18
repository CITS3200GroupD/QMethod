/***
 * global window wrapper
 * https://dzone.com/articles/angular-2-how-do-i-get-a-reference-to-the-window-o
 *  */

import { Injectable } from '@angular/core';

function _window() : any {
   // return the global native browser window object
   return window;
}
@Injectable()
export class WindowWrap {
   get nativeWindow() : any {
      return _window();
   }
}
