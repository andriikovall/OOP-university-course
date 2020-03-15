import fs from 'fs';


export default class {
    static readFile(path: string): Promise<string> {
        return new Promise((resolve: Function, reject: Function) => {
            fs.readFile(path, (err, data: Buffer) => {
                if (err)
                    reject(err)
                else 
                    resolve(data.toString());
            })
        }); 
    }

    static writeFile(path: string, data: string): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            fs.writeFile(path, data, (err) => {
                if (err)
                    reject(err);
                else 
                    resolve(null);
            })
        })
    }
}