import { TLiteralBoolean } from "@sinclair/typebox";
import logger from "./logger";

type JSONValue = string | number | boolean | null | object | [];

//Not typesafe:
export default class JSONFileEditor {

    // static async readJSONCollection(collection: string, destination: string = Bun.env.DATABASE_FILE_NAME || 'database.json'): Promise<any> {
    //     try {
    //         const data = await Bun.file(destination).json() as any;

    //         if(!data[collection]) throw new Error(`Collection "${collection}" does not exist in database.json`);
    //         if(!data[collection].length) throw new Error(`Collection "${collection}" is empty`);

    //         return data[collection];
    //     } catch (e) {
    //         console.error(`Failed to load or save JSON file: ${e}`);
    //     }
    // }

    static async addToJSONCollection(collection: string, changes: any, destination: string = Bun.env.DATABASE_FILE_NAME || 'database.json', addId: boolean): Promise<void> {
        try {
            const data = await Bun.file('database.json').json() as any;

            if(!data[collection]) throw new Error(`Collection "${collection}" does not exist in database.json`);
            if(!data[collection].length) throw new Error(`Collection "${collection}" is empty`);

            if(addId) {
                const biggestIdUpUntilNow = data[collection].reduce((acc: number, item: any) => {
                    if(item.id > acc) return item.id;
                    return acc;
                }
                , 0);
                changes.id = biggestIdUpUntilNow + 1;
            }
            data[collection] = [...data[collection], changes];

            await Bun.write(destination, JSON.stringify(data, null, 2));
        } catch (e) {
            console.error(`Failed to load or save JSON file: ${e}`);
        }
    }

    static async deleteFromJSONCollectionBy(key: string, collection: string, value: JSONValue, destination: string = Bun.env.DATABASE_FILE_NAME || 'database.json'): Promise<void> {
        try {
            const data = await Bun.file('database.json').json() as any;

            if(!data[collection]) throw new Error(`Collection "${collection}" does not exist in database.json`);
            if(!data[collection].length) throw new Error(`Collection "${collection}" is empty`);
            if(!data[collection][0][key]) throw new Error(`Key "${key}" does not exist in collection "${collection}"`);
            if(!data[collection].some((item: any) => item[key] == value)) throw new Error(`Value "${value}" does not exist in collection "${collection}"`);

            data[collection] = data[collection].filter((item: any) => item[key] != value);

            await Bun.write(destination, JSON.stringify(data, null, 2));
        } catch (e: any) {
            logger.error(e.message);
        }
    }
}


