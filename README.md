## Threads Manager

The threads-manager module is designed to simplify the management of worker threads in a Node.js environment. It provides a structured way to create, execute, and handle worker threads that perform asynchronous tasks.

* [Installation](#installation)
* [Key Features](#key-features)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)

### Installation

To install the library, use npm:

```
npm install threads-manager
```


### Key Features:

1.  **Dynamic Worker Creation**: Allows for the initialization of worker threads with user-defined functions that can be executed asynchronously.
2.  **Execution Handling**: Facilitates sending tasks to worker threads and receiving results, including success and error handling.
3.  **Callbacks for Success and Error**: Provides methods to set up callbacks that execute on successful completion of a task or when an error occurs, allowing for easy integration into larger applications.
4.  **Graceful Termination**: Includes functionality to gracefully terminate worker threads when they are no longer needed, helping to manage system resources effectively.
This module is particularly useful for tasks that require intensive computation or long-running processes, ensuring that the main application remains responsive while offloading heavy work to worker threads.


### Usage
##### Example
```
const { createWorkerThread } = require('threads-manager');

const workerThread = createWorkerThread();

// Define a function to be executed by the worker
const exampleFunction = (input) => {
    // Simulate some processing
    return `Processed: ${input}`;
};

// Set up the success callback
workerThread.onSuccess((successData) => {
    console.log('Worker succeeded with data:', successData);
});

// Run the worker thread with the function and data
workerThread.run(exampleFunction, 'Some input data');

// Handle errors and exit as needed
workerThread.onError(() => console.log('Error occurred in worker.'));
workerThread.onExit(() => console.log('Worker has exited.'));


```

## Contributing

We welcome contributions to the library! To contribute:

1. Fork the [repository](https://github.com/TARasti/threads-manager).
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Create a new Pull Request.

Please ensure your code adheres to our coding standards and includes appropriate tests.

## License

This library is licensed under the MIT License.
