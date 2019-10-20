import { Injectable } from '@angular/core';
import { Router , ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import { RootContext } from '@angular/core/src/render3/interfaces/view';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     if (localStorage.getItem('token')) {
       this.router.navigate(['/']);
       return false;
     } else {
       return true;
     }
  }
}
