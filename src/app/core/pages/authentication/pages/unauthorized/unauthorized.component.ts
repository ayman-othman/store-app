import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ICONS } from '@store-app/core/models/icons/icon.const';
import { SvgIconComponent } from '@store-app/shared/components/svg-icon/svg-icon.component';
import { ROLES } from '../login/models/const/login.const';
import { Roles } from '../login/models/types/role.type';
import { AuthenticationService } from '@store-app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, SvgIconComponent, TranslateModule],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss',
})
export class UnauthorizedComponent {
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
