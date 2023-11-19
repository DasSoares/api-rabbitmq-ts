import expressWinston from 'express-winston';
import { transports, format } from 'winston';


const myFormatLogger = format.printf(({ level, meta, timestamp, message }) => {
    const statusCode = meta.res.statusCode;
    const agent = meta.req.headers['user-agent'];
    const sLevel = level.toUpperCase().padEnd(7);

    return `[${timestamp}] ${statusCode} ${sLevel}: ${message} - "${agent}"`;
})

/**
 * 
 * Printa no console as requisições, e grava no arquivo localizado na pasta logs 
 */
export const Logger = () => expressWinston.logger({
    statusLevels: true,
    transports: [
        new transports.Console(),
        new transports.File({
            level: 'warn',
            dirname: 'src/logs',
            filename: 'logsErrors.log'
        }),
        new transports.File({
            level: 'info',
            dirname: 'src/logs',
            filename: 'logsSuccess.log'
        }),
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        myFormatLogger
        // format.metadata(),
        // format.prettyPrint(),
    )
});
