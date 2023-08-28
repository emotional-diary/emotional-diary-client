import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const req = await request.json();
    const accessToken = request.cookies.get('accessToken');

    if (!accessToken) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        {
          status: 401,
          headers: {
            'Set-Cookie': `accessToken=;Max-Age=0;HttpOnly;Secure;Path=/`,
          },
        }
      );
    }

    const res = await axios.get(
      `${process.env.SERVER_HOST}/v1/users/diary/${req.diaryID}`,
      {
        headers: {
          authorization: `Bearer ${accessToken.value}`,
        },
      }
    );

    console.log('res', res.data);

    return NextResponse.json(res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    } else {
      console.error(`${__dirname} error`, error);

      return NextResponse.json(error, {
        status: 500,
      });
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const accessToken = request.cookies.get('accessToken');

    console.log('req', req);
    console.log('accessToken', accessToken);

    if (!accessToken) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        {
          status: 401,
          headers: {
            'Set-Cookie': `accessToken=;Max-Age=0;HttpOnly;Secure;Path=/`,
          },
        }
      );
    }

    const res = await axios.post(
      `${process.env.SERVER_HOST}/v1/users/diary`,
      {
        ...req,
      },
      {
        headers: {
          authorization: `Bearer ${accessToken.value}`,
        },
      }
    );
    console.log('res', res.data);

    return NextResponse.json(res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    } else {
      console.error(`${__dirname} error`, error);

      return NextResponse.json(error, {
        status: 500,
      });
    }
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const req = await request.json();
    const accessToken = request.cookies.get('accessToken');

    console.log('req', req);

    if (!accessToken) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        {
          status: 401,
          headers: {
            'Set-Cookie': `accessToken=;Max-Age=0;HttpOnly;Secure;Path=/`,
          },
        }
      );
    }

    if (!req.diaryID) {
      return NextResponse.json(
        { message: 'diaryID is required' },
        {
          status: 400,
        }
      );
    }

    const res = await axios.patch(
      `${process.env.SERVER_HOST}/v1/users/diary/${req.diaryID}`,
      { ...req },
      {
        headers: {
          authorization: `Bearer ${accessToken.value}`,
        },
      }
    );
    console.log('res', res.data);

    return NextResponse.json(res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    } else {
      console.error(`${__dirname} error`, error);

      return NextResponse.json(error, {
        status: 500,
      });
    }
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const req = await request.json();
    const accessToken = request.cookies.get('accessToken');

    console.log('req', req);

    if (!accessToken) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        {
          status: 401,
          headers: {
            'Set-Cookie': `accessToken=;Max-Age=0;HttpOnly;Secure;Path=/`,
          },
        }
      );
    }

    if (!req.diaryID) {
      return NextResponse.json(
        { message: 'diaryID is required' },
        {
          status: 400,
        }
      );
    }

    const res = await axios.delete(
      `${process.env.SERVER_HOST}/v1/users/diary/${req.diaryID}`,
      {
        headers: {
          authorization: `Bearer ${accessToken.value}`,
        },
      }
    );
    const { data } = res.data;

    console.log('res', res.data);

    return NextResponse.json(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    } else {
      console.error(`${__dirname} error`, error);

      return NextResponse.json(error, {
        status: 500,
      });
    }
  }
}
