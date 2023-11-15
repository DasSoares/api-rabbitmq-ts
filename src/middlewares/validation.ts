import { plainToInstance } from "class-transformer";
import { validate } from 'class-validator';
export * from 'class-validator'

export const validationPipe = async (schema: any, requestObject: object): Promise<Record<string, string[]>> => {
    const errorsResult: Record<string, string[]> = {};
    const transformedClass: any = plainToInstance(schema, requestObject);
    const errors = await validate(transformedClass);
    let constraints = new Array();

    if (errors.length > 0) {
        for (let er of errors) {
            for (let key in er.constraints) {
                if (Object.prototype.hasOwnProperty.call(er.constraints, key)) {
                    constraints.push(er.constraints[key].toString());
                    errorsResult['messages'] = constraints;
                }
            }
        }
    }

    return errorsResult;
}
