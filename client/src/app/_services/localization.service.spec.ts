import { TestBed, inject } from '@angular/core/testing';
import { LocalizationService } from './localization.service';

describe('LocalizationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalizationService]
    });
  });

  it('should be created', inject([LocalizationService], (service: LocalizationService) => {
    expect(service).toBeTruthy();
  }));

  it('should instantiate a Locale BehaviorSubject with the default value of en-us',
    inject([LocalizationService], (service: LocalizationService) => {
      expect(service.getLocale()).toEqual('en-us');
    })
  );

  describe('resolveLocalizedText', () => {
    it('should exist',
      inject([LocalizationService], (service: LocalizationService) => {
        expect(service.resolveLocalizedText).toBeTruthy();
      })
    );

    it( 'should return the localized text for the en-us version of the login button label',
      inject([LocalizationService], (service: LocalizationService) => {
        expect(service.resolveLocalizedText('loginButton.label')).toEqual('Login');
      })
    );

    it( 'should return -- undefined -- if the given textNamespace does not resolve',
      inject([LocalizationService], (service: LocalizationService) => {
        expect(service.resolveLocalizedText('namespace.that.does.not.exist')).toEqual('-- undefined --');
      })
    );
  });

  describe('getLocale', () => {

    it('should exist',
      inject([LocalizationService], (service: LocalizationService) => {
        expect(service.getLocale).toBeTruthy();
      })
    );

    it('should return the current value of the Locale BehaviorSubject',
      inject([LocalizationService], (service: LocalizationService) => {
        expect(service.getLocale()).toEqual('en-us');
      })
    );
  });

  describe('setLocale', () => {
    it('should exist',
      inject([LocalizationService], (service: LocalizationService) => {
        expect(service.setLocale).toBeTruthy();
      })
    );

    it('should set the value of the Locale BehaviorSubject',
      inject([LocalizationService], (service: LocalizationService) => {
        service.setLocale('es-mx');
        expect(service.getLocale()).toEqual('es-mx');
      })
    );
  });

  describe('observeLocale', () => {
    it('should exist',
      inject([LocalizationService], (service: LocalizationService) => {
        expect(service.observeLocale).toBeTruthy();
      })
    );

    it('should return an Observable',
      inject([LocalizationService], (service: LocalizationService) => {
        service.observeLocale().subscribe(locale => expect(locale).toEqual('en-us'));
      })
    );
  });
});
