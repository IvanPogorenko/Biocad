import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {APP_PATHS} from './app.paths';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(
    private _router: Router
  ) {}

  public navigateToDashboard() {
    this._router.navigate([APP_PATHS.Dashboard])
  }

  public navigateToTask(id: string | number) {
    this._router.navigate([APP_PATHS.Task, id])
  }

  public navigateToError() {
    this._router.navigate([APP_PATHS.Error])
  }
}
