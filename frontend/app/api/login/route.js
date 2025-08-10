// app/api/login/route.js

export async function POST(req) {
    const { username, password } = await req.json();
  
    const users = [
      {
        username: 'admin',
        password: '123456',
        name: 'Admin UTH',
        role: 'admin',
        avatar: '/images/admin-avatar.png',
      },
      {
        username: 'user',
        password: '123456',
        name: 'Nguyễn Văn A',
        role: 'user',
        avatar: '/images/meo.jpg',
      },
    ];
  
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
  
    if (user) {
      return Response.json({ success: true, ...user });
    } else {
      return Response.json(
        { success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng.' },
        { status: 401 }
      );
    }
  }
  