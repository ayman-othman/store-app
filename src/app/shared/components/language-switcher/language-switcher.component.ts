import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { LanguageService } from '../../../core/services/language/language.service';
import { LANGUAGE } from '../../../core/models/language/language.const';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { ProjectLanguage } from '../../../core/models/language/language.type';
import { ICONS } from '../../../core/models/icons/icon.const';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'language-switcher',
  standalone: true,
  imports: [MatMenuModule, CommonModule, TranslateModule ,SvgIconComponent,MatButtonModule,MatIconModule],

  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
})
export class LanguageSwitcherComponent {
  // Inject
  private _languageService = inject(LanguageService);
  public translateService = inject(TranslateService);
  // Public
  public LANGUAGE = LANGUAGE;
  public ICONS = ICONS;

  
  public setCurrentLanguage(selectedLanguage: ProjectLanguage): void {
    location.reload();
    this._languageService.setCurrentLanguage(selectedLanguage);
  }
}
