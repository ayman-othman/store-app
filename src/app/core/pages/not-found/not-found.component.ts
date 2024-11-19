import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ICONS } from '@store-app/core/models/icons/icon.const';
import { AuthenticationService } from '@store-app/core/services/authentication/authentication.service';
import { Roles } from '../authentication/pages/login/models/types/role.type';
import { ROLES } from '../authentication/pages/login/models/const/login.const';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '@store-app/shared/components/svg-icon/svg-icon.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, SvgIconComponent, TranslateModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  // inject
  private _router = inject(Router);
  private _authenticationService: AuthenticationService = inject(
    AuthenticationService
  );

  // Public
  public ICONS = ICONS;

  public backToHome() {
    this._navigateBasedOnRole(this._authenticationService.getUserRole()!);
  }
  private _navigateBasedOnRole(role: Roles) {
    switch (role) {
      case ROLES.admin:
        this._router.navigateByUrl('/admin');
        break;
      case ROLES.user:
        this._router.navigateByUrl('/');
        break;
    }
  }
}