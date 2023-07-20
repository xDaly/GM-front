import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterModule } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  
if (localStorage.getItem('token')) {
  return true
} else {
  router.navigateByUrl('/signin')
  return false
}

};
