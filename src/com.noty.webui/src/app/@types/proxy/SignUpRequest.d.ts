/******************************************************************************
 *
 *   Copyright Adam Halassy, Budapest, HUN.
 *   This is an unpublished work. All rights reserved.
 *
 * ---------------------------------------------------------------------------
 *   This source is part of the Noty project
 * 
 *****************************************************************************/

declare interface SignUpRequest extends Credentials {
}

declare interface SignInRequest extends Credentials {
}

declare interface SignUpResponse {
    email: String;
    id: number;
}
