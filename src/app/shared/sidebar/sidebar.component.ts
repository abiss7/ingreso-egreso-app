import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { Subscription } from 'rxjs';

import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string;
  userSubs: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.userSubs = this.store.select('user')
      .pipe(
        filter(({user}) => user != null )
      )
      .subscribe(({ user }) => {
        
        this.nombre = user.nombre;
      });
  }

  ngOnDestroy() {

    this.userSubs.unsubscribe();
  }

  logout() {

    this.authService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      });
  }
}
