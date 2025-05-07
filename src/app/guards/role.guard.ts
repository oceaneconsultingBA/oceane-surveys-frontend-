import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, RouterEvent, ChildActivationStart, Router, MaybeAsync, GuardResult } from "@angular/router";
import { Observable, filter, tap, map } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class RoleGuard implements CanActivate {
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): MaybeAsync<GuardResult> {
        return sessionStorage.getItem('role') === 'admin'
    }
  }