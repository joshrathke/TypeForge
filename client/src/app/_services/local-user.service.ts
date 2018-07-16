import { Injectable } from '@angular/core';

export interface LocalUserObject {
	username: string,
	userID: string,
	token: string
}

@Injectable()
export class LocalUserService {

	constructor() { }

	// Get Local User Object from Local Storage
	getLocalUserObject(): LocalUserObject {
		return JSON.parse(localStorage.getItem('TypeForgeCurrentUser') || null);
	}

	// Set Local User Object using the given value.
	setLocalUserObject(localUserObject: LocalUserObject) {
		localStorage.setItem('TypeForgeCurrentUser', JSON.stringify(localUserObject));
	}

	// Destroy the Local User Object.
	destroyLocalUserObject() {
		localStorage.removeItem('TypeForceCurrentUser');
	}
}
