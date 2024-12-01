import { createContext, Script } from 'vm';

function executeScript(script: string, contextObject: Record<string, any> = {}): any {
    console.log(script);
    try {
        const context = createContext(contextObject);
        const result = new Script(script).runInContext(context);
        return result;
    } catch (error: any) {
        return { error: error.message };
    }
}

function LOG(variable: any) {
    const script = `console.log(\`${JSON.stringify(variable, null, 4)}\`)`;
    return executeScript(script, { console });
}

function IF(condition: string) {
    const script = `Boolean(${condition})`;
    return executeScript(script, { a: 1 });
}

const EXEC = executeScript;

export { LOG, IF, EXEC };
