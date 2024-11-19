import { isPlatformBrowser } from '@angular/common';
import {
  inject,
  Inject,
  Injectable,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieController } from '../../utilis/cookie-controller.class';
import { LANGUAGE } from '../../models/language/language.const';
import { COOKIES_KEYS } from '../../models/cookie/cookie-keys.const';
import { ProjectLanguage } from '../../models/language/language.type';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  // Inject
  private _translateService: TranslateService = inject(TranslateService);

  private _activeLanguage: WritableSignal<ProjectLanguage> = signal(
    this._translateService?.currentLang as ProjectLanguage
  );

  public get getActiveLanguage(): WritableSignal<ProjectLanguage> {
    return this._activeLanguage;
  }

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this._translateService.setDefaultLang(LANGUAGE.english);
      const savedLanguage =
        CookieController.getCookie(COOKIES_KEYS.lang) || LANGUAGE.arabic;
      this._translateService.setDefaultLang(savedLanguage);
      this.setCurrentLanguage(savedLanguage as ProjectLanguage);
    }
  }

 public setCurrentLanguage(selectedLanguage: ProjectLanguage): void {
    this._translateService.use(selectedLanguage);
    document.documentElement.dir =
      selectedLanguage === LANGUAGE.english ? 'ltr' : 'rtl';

    document.documentElement.lang =
      selectedLanguage === LANGUAGE.english
        ? LANGUAGE.english
        : LANGUAGE.arabic;
    CookieController.setCookie(COOKIES_KEYS.lang, selectedLanguage);
    this._activeLanguage.set(selectedLanguage);
  }
}
