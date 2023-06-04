import { rest } from "msw";
import { TodoProps } from "../components/Todo";
import { createRandomId, getTodayDate } from "../lib/Utils";

const data = { todos: [] as TodoProps[] };

export const handlers = [
  rest.get("/todos", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        result: data.todos,
      })
    );
  }),
  rest.post("/todo", async (req, res, ctx) => {
    const body = await req.text();
    const params = Object.fromEntries(new URLSearchParams(body));
    const id = createRandomId();
    const date = getTodayDate();

    const newTodo = {
      id,
      content: params.content,
      references: [],
      createdAt: date,
      updatedAt: "",
      completedAt: "",
    };
    data.todos.push(newTodo);

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        result: newTodo,
      })
    );
  }),
  rest.put("/todo/:id", async (req, res, ctx) => {
    const body = await req.text();
    const params = Object.fromEntries(new URLSearchParams(body));
    const index = data.todos.findIndex((todo) => todo.id === req.params.id);

    if (index > -1) {
      const date = getTodayDate();

      if (params.content) {
        data.todos[index].content = params.content;
        data.todos[index].updatedAt = date;
      }
      if (params.completedAt) {
        data.todos[index].completedAt = params.completedAt;
      }

      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          result: data.todos,
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        success: false,
      })
    );
  }),
  rest.delete("/todo/:id", async (req, res, ctx) => {
    data.todos = data.todos.filter((todo) => todo.id !== String(req.params.id));

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        result: data.todos,
      })
    );
  }),
];
