import { CanDeactivate } from '@angular/router';
import { Component } from '@angular/compiler/src/core';

export class ConfirmDeactivateGuard implements CanDeactivate<Component> {

  canDeactivate(target: Component) {
    // if(target.has_changes()) {
      // return window.confirm('Do you really want to cancel?');
      return true;
    // }
  }
}
