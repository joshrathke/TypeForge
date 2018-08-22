import { Locale } from '@TypeForge/localization';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { get } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  // Initialize the Locale Behavior Subject with US English (en-us) as the default language.
  private Locale: BehaviorSubject<Locale> = new BehaviorSubject<Locale>('en-us');

  private LocalizationText = {
    'en-us': {
      'loginComponent.title': 'Login',
      'loginButton.label': 'Login'
    }
  };

  public resolveLocalizedText = (textNamespace: string): string => {
    return get(this.LocalizationText, [this.getLocale(), textNamespace], '-- undefined --');
  }

  /**
   * Gets the current value of the Locale Behavior Subject
   * @returns {Locale} Current Locale in use.
   */
  public getLocale = (): Locale => this.Locale.getValue();

  /**
   * Updates the Behavior Subject with the provided Locale.
   * @param {Locale} locale The updated Locale to set the Behavior Subject to.
   */
  public setLocale = (locale: Locale) => this.Locale.next(locale);

  /**
   * Returns an Observable representation of the Locale Behavior Subject
   * @returns {Observable} Observable of Locale Behavior Subject
   */
  public observeLocale = (): Observable<Locale> => this.Locale.asObservable();
}
