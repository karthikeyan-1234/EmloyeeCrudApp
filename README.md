# EmloyeeCrudApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.6.

# Demonstrates how to implement RBAC (OIDC) using KeyCloak in Angular 18, with the following functionalities:

* Login redirect to KeyCloak login page

* LogOut

* RBAC Authorization

# The preRequisites are:

* Angular: 18

* KeyCloak: 26.1.4 (npm install keycloak-angular@16  keycloak-js@26)

Docker Image for KeyCloak: quay.io/keycloak/keycloak:latest

For angular 18 - Keycloak use the below. Refer Versions table of https://www.npmjs.com/package/keycloak-angular#installation


npm install keycloak-angular@16  keycloak-js@26


Make sure to install both keycloak-angular and keycloak-js

# Reference GitHUB Repo
https://github.com/dnyaneshwargiri/keycloak-angular-integration/tree/main/frontend/dny-netflix

# Common Issues And Resolution

To resolve the error Refused to frame 'http://localhost:8080/' because an ancestor violates the following Content Security Policy directive: "frame-ancestors 'self'"

Steps to Fix - CSP (Content Security Policy) error
==================================================
Login to Keycloak Admin Console

Go to http://localhost:8080
Login as admin.
Navigate to Realm Settings

Select your realm (e.g., myrealm).
Click on Realm Settings.
Modify Content Security Policy Headers

Go to the Security Defenses tab.

Under Headers, find the Content Security Policy setting.

Update frame-ancestors to allow your Angular application’s origin.

For example, if your Angular app is running on http://localhost:4200, set:

frame-ancestors 'self' http://localhost:4200;

Save the changes.

Restart Keycloak If Keycloak was running before applying the changes, restart it to apply the new settings.



