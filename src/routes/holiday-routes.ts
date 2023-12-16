import { ElysiaConstructorReturnType, IRegistrator } from "./regisrator.inteface";

export class HolidayRoutesRegistrator implements IRegistrator{
    public registerRoutes(app: ElysiaConstructorReturnType) {
        
        app.group("/holidays", app => {
            return app
                .get("/",(ctx)=>{
                
            })
                .get("/:id",(ctx)=>{
                
            })
                .post("/",(ctx)=>{
                
            })
                .put("/:id",(ctx)=>{
                
            })
                .delete("/:id",(ctx)=>{
                
            })
        });

    }
}