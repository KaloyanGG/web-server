import { Elysia } from "elysia";

export type ElysiaConstructorReturnType =  Elysia;

export interface IRegistrator {
    registerRoutes(app: ElysiaConstructorReturnType): void;
}