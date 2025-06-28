import { cookies } from 'next/headers';

/**
 * Retrieves the authentication token from the cookies.
 * This function must be called from a Server Component or a Server Action.
 * @returns The token string or undefined if not found.
 */
export function getAuthToken(): string | undefined {
    return cookies().get('token')?.value;
}
