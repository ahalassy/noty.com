/******************************************************************************
 *
 *   Copyright Adam Halassy, Budapest, HUN.
 *   This is an unpublished work. All rights reserved.
 *
 * ---------------------------------------------------------------------------
 *   This source is part of the Noty project
 * 
 *****************************************************************************/

export function objectToForm(obj: any) {
    const form = new FormData();
    for (const property in obj) {
        form.append(property, obj[property]);
    }

    return form;
}