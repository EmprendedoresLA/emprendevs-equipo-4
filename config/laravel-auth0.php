<?php

return array(

    /*
    |--------------------------------------------------------------------------
    |   Your auth0 domain
    |--------------------------------------------------------------------------
    |   As set in the auth0 administration page
    |
    */

    'domain'        => 'delix.auth0.com',
    /*
    |--------------------------------------------------------------------------
    |   Your APP id
    |--------------------------------------------------------------------------
    |   As set in the auth0 administration page
    |
    */

    'client_id'     => 'uw0ezgRfCi522BYAgn1jQXBsrc0wi4yI',

    /*
    |--------------------------------------------------------------------------
    |   Your APP secret
    |--------------------------------------------------------------------------
    |   As set in the auth0 administration page
    |
    */
    'client_secret' => 'WaRXn1UHO2ef3Wv683D14oxm7E7XGpza2AqJAgBQq01pxMQIVAX0IBB3iE1_SGgu',


   /*
    |--------------------------------------------------------------------------
    |   The redirect URI
    |--------------------------------------------------------------------------
    |   Should be the same that the one configure in the route to handle the
    |   'Auth0\Login\Auth0Controller@callback'
    |
    */

    'redirect_uri'  => 'http://localhost:8000/auth0/callback'



);
