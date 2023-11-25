/******************************************************************************
 *
 *   Copyright Adam Halassy, Budapest, HUN.
 *   This is an unpublished work. All rights reserved.
 *
 * ---------------------------------------------------------------------------
 *   This source is part of the Noty project
 * 
 *****************************************************************************/

import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { catchError, firstValueFrom, throwError } from 'rxjs';

export class ProxyBase {

    private baseUrl: string = "/api";

    public constructor(
        private http: HttpClient
    ) {

    }

    private getFilenameFromResponse(response: any): string {
        const contentDispositionHeader = response.headers.get('Content-Disposition');
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(contentDispositionHeader);
        let filename = '';
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
        return filename;
    }

    protected getEndpointUrl(endpoint: string): string {
        return `${this.baseUrl}/${endpoint}`;
    }

    protected downloadAsync(endpoint: string, args: { [key: string]: string }): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const params = new HttpParams({ fromObject: args });
                const url = this.getEndpointUrl(endpoint);

                const result = await firstValueFrom(this.http.get(url, { params, responseType: 'blob', observe: 'response' }));
                const filename = this.getFilenameFromResponse(result);

                const blob = result.body;
                if (!blob) {
                    console.error('Download failed: Response body is null.'); // TODO
                    reject();
                    return;
                }

                const downloadUrl = URL.createObjectURL(blob || null);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = filename;
                link.click();
                URL.revokeObjectURL(downloadUrl);
            
                resolve();
            } catch (error) {
                console.error('Download failed', error); // TODO
                reject(error);
            }
        });
    }

    protected async getAsync<R>(
        endpoint: string,
        args: { [key: string]: string }
    ): Promise<R> {
        const params = new HttpParams({ fromObject: args });
        const url = this.getEndpointUrl(endpoint);

        const result = await firstValueFrom(this.http.get(url, { params }));

        return <R>result;
    }

    protected async putAsync<R>(
        endpoint: string,
        body: any,
        args: { [key: string]: string }
    ): Promise<PutResult<R>> {
        const params = new HttpParams({ fromObject: args });
        const url = this.getEndpointUrl(endpoint);

        const result = await firstValueFrom(this.http.put(url, body, { params, observe: 'response' }).pipe(
            catchError(error => this.handleError(error))
        ));

        return <PutResult<R>> {
            location: result.headers.get('Location'),
            data: result.body
        }; 
    }

    protected async postAsync<R>(
        endpoint: string,
        body: any,
        args: { [key: string]: string }
    ): Promise<R> {
        const params = new HttpParams({ fromObject: args });
        const url = this.getEndpointUrl(endpoint);

        const result = await firstValueFrom(this.http.put(url, body, { params, observe: 'response' }).pipe(
            catchError(error => this.handleError(error))
        ));

        return <R>result.body; 
    }

    private handleError(
        error: HttpErrorResponse
    ) {
        if (error.status === 0) {
            console.error('An error occurred:', error.error);
        } else {
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error);
        }

        return throwError(() => new Error(`${error.message}`));
    }
}