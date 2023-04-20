import { pool } from "../database.js";

export const getTasks = async (req, res) => {
    try {
        const [tasks] = await pool.query("SELECT * FROM tasks")
        res.json({
            ok:true,
            tasks
        })
    } catch (error) {
        res.json({
            ok:false,
            message:error.message
        })
    }
};
export const getTask = async(req, res) => {
    try {
        const id = req.params.id
        const [tasks] = await pool.query("SELECT * FROM tasks WHERE id = ?",[id])
        if (tasks[0] == null){
            throw new Error("El id que buscas no existe")
        }
        res.json({
            ok:true,
            tasks
        })
    } catch (error) {
        res.json({
            ok:false,
            message:error.message
        })
    }
};

export const deleteTask = async(req, res) => {
    try {
        const id = req.params.id
        const task = await pool.query("DELETE FROM tasks WHERE id = ?",[id])
        if (!task){
            throw new Error("El usuario que deseas eliminar no existe")
        }
        res.json({
            ok:true,
            task
        })
    } catch (error) {
        res.json({
            ok:false,
            message:error.message
        })
    }
};

export const saveTask = async(req, res) => {
    try {
        const {title, description} = req.body
        const task = await pool.query("INSERT INTO tasks(title, description) VALUES (?,?)",[title,description])
        if (!task){
            throw new Error("El usuario no pudo ser creado")
        }
        res.json({
            ok:true,
            message: "usuario creado con exito"
        })
    } catch (error) {
        res.json({
            ok:false,
            message:error.message
        })
    }
};

export const updateTask = async(req, res) => {
    try {
        const id = req.params.id
        const {title,description} = req.body
        const task = await pool.query("UPDATE tasks SET title = ?, description = ? WHERE id = ?",[title, description, id])
        if (!task){
            throw new Error("El usuario no pudo ser actualizado")
        }
        res.json({
            ok:true,
            task
        })
    } catch (error) {
        res.json({
            ok:false,
            message:error.message
        })
    } 

};

export const getCountTask = async(req, res) => {
    try {
        const [tasks] = await pool.query("SELECT COUNT(*) FROM tasks")
        const totalCountOfTasks = tasks[0]["COUNT(*)"]
        res.json({
            ok:true,
            tasks: totalCountOfTasks
        })
    } catch (error) {
        res.json({
            ok:false,
            message:error.message
        })
    }
};
