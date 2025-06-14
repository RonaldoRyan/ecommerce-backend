import { RequestHandler, Response, Request } from 'express';
import * as authService from '../services/auth.service';

interface AuthenticatedRequest extends Request {
  user?: { id: number; role: string };
}

export const register: RequestHandler = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    await authService.registerUser(name, email, password, role);
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error en el registro' });
  }
};

export const login: RequestHandler = async (req, res): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await authService.findUserByEmail(email);

    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    const isMatch = await authService.comparePasswords(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Contraseña incorrecta' });
      return;
    }

    const token = authService.generateToken(user.id, user.role);

    // Excluye la contraseña antes de enviar el usuario al frontend
    const { password: _, ...userWithoutPassword } = user;

    res.json({ token, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ error: 'Error en el login' });
  }
};

export const getMe = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.user!;
    const user = await authService.getUserById(id);

    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

export const logout = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const userId = req.user!.id;

    if (!token) {
      res.status(400).json({ error: 'Token requerido para logout' });
      return;
    }

    await authService.logout(userId, token);
    res.json({ message: 'Logout exitoso' });
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar logout' });
  }
};
