import { NextResponse } from 'next/server';
import { BACKEND_API_URL } from '../../_lib/env';

/**
 * multipart/form-data pass-through: the browser's FormData (fields +
 * passportMainPhoto/passportRegistrationPhoto/facePhoto files) is
 * forwarded to the backend byte-for-byte. fetch() re-encodes the
 * boundary correctly when given a FormData body, so we never touch the
 * files ourselves.
 */
export async function POST(request: Request) {
  const formData = await request.formData();

  const backendResponse = await fetch(`${BACKEND_API_URL}/auth/register`, {
    method: 'POST',
    body: formData,
  });

  const data = await backendResponse.json().catch(() => null);
  return NextResponse.json(data, { status: backendResponse.status });
}
