import dotenv from "dotenv";

dotenv.config();

interface UserResponse {
    id: number;
    username: string;
    email: string;
    role: "client" | "admin";
}

interface UserServiceResponse {
    message: string;
    user: UserResponse;
}

export default async function ValidateAdminUserMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const response = await fetch(process.env.USER_SERVICE + '/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        // Si la respuesta no es exitosa, retornar error inmediatamente
        if (!response.ok) {
            console.error(`Error de autenticación: ${response.status} ${response.statusText}`);
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Solo intentar parsear JSON si la respuesta fue exitosa
        const data = await response.json();
        
        // Verificar si los datos tienen la estructura esperada
        if (!data || !data.user || !data.user.role) {
            console.error('Respuesta del servicio de usuario con formato inválido:', data);
            return res.status(500).json({ message: 'Invalid user service response' });
        }
        console.log(data)
        // Asegurar que req.body exista antes de asignar userId
        if (!req.body) {
            req.body = {};
        }
        // Almacenar el ID del usuario en el objeto request para usarlo en los controladores
        req.body.userId = data.user.id;
        
        next();
    } catch (error) {
        console.error('Failed to validate user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}