import { API_URL } from "@/constants/config";
import { Task } from "@/constants/types";

export const todoService = {
    async getTodos(token: string): Promise<Task[]> {
        const response = await fetch(`${API_URL}/todos`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Error al obtener las tareas");
        }

        const json = await response.json();
        return json.data || [];
    },

    async createTodo(
    token: string,
    title: string,
    imageUri: string,
    location: { latitude: number; longitude: number }
): Promise<Task> {

    const body = {
        title: title,
        completed: false,
        location: {
            latitude: location.latitude,
            longitude: location.longitude,
        },
        photoUri: imageUri, // cambio de nombre
    };

    console.log("Payload enviado:", body);

    const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response:", errorText);
        throw new Error(`Error al crear la tarea: ${errorText}`);
    }

    const json = await response.json();
    return json.data || json;
},


    async updateTodo(token: string, id: string, updates: Partial<Task>): Promise<Task> {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            throw new Error("Error al actualizar la tarea");
        }

        const json = await response.json();
        return json.data || json;
    },

    async deleteTodo(token: string, id: string): Promise<void> {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Error al eliminar la tarea");
        }
    },
};