import { Router } from "express";
import {
  getCountTask,
  deleteTask,
  getTask,
  getTasks,
  saveTask,
  updateTask,
} from "../controllers/task.controllers.js";

const router = Router();
/**
 * @swagger
 * /tasks/counter:
 *  get:
 *    summary: Get all tasks
 */
router.get("/counter", getCountTask);

/**
 * @swagger
 * /tasks:
 *  get:
 *    summary: Get all tasks
 */
router.get("/", getTasks);

/**
 * @swagger
 * /tasks:
 *  get:
 *    summary: Get task by id
 */
router.get("/:id", getTask);

/**
 * @swagger
 * /tasks:
 *  put:
 *    summary: Update task by id
 */
router.put("/:id", updateTask);

/**
 * @swagger
 * /tasks:
 *  delete:
 *    summary: Delete a task by id
 */
router.delete("/:id", deleteTask);

/**
 * @swagger
 * /tasks:
 *  post:
 *    summary: Create a new task
 */
router.post("/", saveTask);

export default router;
