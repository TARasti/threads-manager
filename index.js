const { Worker } = require("worker_threads");


const createWorkerThread = () => {
    const worker = initWorkerThread();
    let onSuccessCallback = null;
    return {
        run: (func, data) => executeThread(worker, func, data, onSuccessCallback),
        onError: (func) => handleError(worker, func),
        onExit: (func) => handleExit(worker, func),
        terminate: (func) => handleTerminate(worker, func),
        onSuccess: (func) => {
            onSuccessCallback = func;
        }
    }
}

const initWorkerThread = () => {
    try {
        const workerCode = `
    try {
        const { parentPort } = require("worker_threads");
        parentPort.on('message', ({ funcString, data }) => {
            const job = eval('(' + funcString + ')');
            const result = job(data);
            parentPort.postMessage({success: true, data: result, error: false});
        });
    } catch (e) {
        parentPort.postMessage({success: false, data: null, error: e});
    }
    `;
        const worker = new Worker(workerCode, { eval: true });
        return worker;
    } catch (err) {
        throw new Error(err);
    }
}

const executeThread = (worker, func = () => { }, data = '', onSuccessCallback) => {
    try {
        const job = func.toString();
        worker.postMessage({ funcString: job, data: data });
        worker.on('message', (result) => {
            console.log(`Thread completed execution: ${func.name}`);
            if (result.success) {
                if (onSuccessCallback) {
                    onSuccessCallback(result);
                }
            } else {
                console.error('Worker execution failed:', result.error);
            }
        });
    } catch (err) {
        throw new Error(err);
    }
}

const handleError = (worker, func = () => { }) => {
    try {
        worker.on('error', (error) => {
            console.error('Thread failed to execute:', error);
            func && func();
            return error;
        });
    } catch (err) {
        throw new Error(err);
    }
}

const handleExit = (worker, func = () => { }) => {
    try {
        worker.on('exit', (code) => {
            if (code !== 0) {
                console.error(`Worker stopped with exit code ${code}`);
            } else {
                console.log('Worker stopped normally');
            }
            func && func();
            return code;
        });
    } catch (err) {
        throw new Error(err);
    }
}

const handleTerminate = (worker, func = () => { }) => {
    try {
        worker.terminate()
            .then((status) => {
                console.log('Worker terminated:', status);
            })
            .catch((err) => {
                console.error('Error terminating worker:', err);
            });
        func && func();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createWorkerThread
}